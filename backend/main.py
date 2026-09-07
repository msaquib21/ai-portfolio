from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import os
import time
import json
from pathlib import Path

# Resolve the directory this file lives in so relative paths always work
BASE_DIR = Path(__file__).resolve().parent
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware # <-- NEW IMPORT

load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")

# Check if the API key was successfully found; if not, stop the program and show an error
if not my_api_key:
    raise ValueError("API KEY NOT FOUND")

# Initialize the Groq client to open a connection to the AI servers using your secure key
client = Groq(api_key=my_api_key)

# Specify which AI model we want to use and set the default sender role to 'user'
model = "openai/gpt-oss-120b"
role = "user"

app = FastAPI()

# --- ADD THIS CORS BLOCK SO REACT CAN TALK TO FASTAPI ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all frontends to connect during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Blueprint for individual work history. We use '| None' so the app won't crash if data is missing
class Experience(BaseModel):
    company: str | None = None # as not necessary all resumes will have company,role,duration, desc,etc
    role: str | None = None
    duration: str | None = None
    #description: str | None = None
    description: list[str] | None = [] # <--- CHANGED FROM str TO list[str]
    skills_used: list[str] | None = []   # <-- Added | None

# Master blueprint for the candidate's resume, linking to the Experience blueprint above
class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    total_experience_years: float | None = None

    skills: list[str] | None = []             # <-- Added | None
    experiences: list[Experience] | None = [] # <-- Added | None
    education: list[str] | None = []          # <-- Added | None
    projects: list[str] | None = []           # <-- Added | None
    certifications: list[str] | None = []     # <-- Added | None

# Convert the Resume Python class into a JSON schema to guide the AI when reading resumes
resume_schema = Resume.model_json_schema()

class chatrequest(BaseModel):
    question : str

def ask_candidate(question:str, resume:Resume):
    system_prompt = f"""
    You are the official AI representative for Mohammad Saquib. You are currently speaking TO a recruiter or hiring manager.
    
    Below is the ONLY factual data you have about Mohammad:
    {resume.model_dump_json(indent=2)}
    
    RULES FOR CONVERSATION (STRICT ENFORCEMENT):
    1. NEVER INVENT FACTS: You are strictly forbidden from inventing companies, projects, skills, metrics, or degrees. If it is not in the JSON above, Mohammad did not do it.
    2. NARRATIVE, NOT COPY-PASTE: Do not just spit out bullet points. Speak naturally and enthusiastically. Frame his JSON data as a cohesive career story.
    3. SAFE ELABORATION: You are allowed to use your internal knowledge to explain *how* his listed skills work. For example, if discussing his RAG-powered search engine, you can explain the synergy between LangChain, ChromaDB, and Azure OpenAI to make his work sound as impactful as it actually is. 
    4. MISSING INFO: If the recruiter asks about a skill or experience not in the JSON, politely admit he does not have it, but pivot to a related strength he DOES have.
    5. FORMATTING: Keep responses concise. Use short paragraphs. 
    """
    response  = client.chat.completions.create(
        model = model,
        messages=[
            {
                "role":"system",
                "content":system_prompt
            },

            {
                "role":"user",
                "content": question
            }
        ]
    )
    return response.choices[0].message.content

# parsing resume
# Define the "Parser" function that converts messy resume text into our clean Resume blueprint
def parse_resume(resume_text):
    # Give the AI strict instructions on how to interpret various resume sections and map them to our schema
    system_prompt=f"""
    You are an expert resume parser.
    Extract information from the resume based on its meaning, not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    -Experience
    -Professional Experience
    -Work History
    -Employment
    -Internships
    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience, internships or projects.

    Return only valid JSON matching this schema: {resume_schema}

    Important Rules:
    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    
    # Inject the messy text of the current applicant's resume into the user prompt
    user_prompt = f"""
    Parse the following resume: {resume_text}
    """
    
    # Package both prompts into the standard API message format
    message_system={
        "role":"system",
        "content":system_prompt
    }
    message_user={
        "role":"user",
        "content":user_prompt
    }

    messages = [message_system,message_user]
    
    # Enforce JSON output mode so the response strictly follows our blueprint
    response_format = {
        "type": "json_object"
    }
    
    # Send the raw resume to the AI, convert the JSON output to a dict, and return it as a Resume object
    response = client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume

def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

@app.get("/")
def home():
    #resume_text=read_pdf(Path("Mohammad_Saquib_Resume.pdf"))
    #resume_parse = parse_resume(resume_text)
    #print(resume_parse.model_dump_json(indent=2))
    return {
        "message": "Home Page...."
    }

# --- NEW: A secret endpoint just for you to update your resume! ---
@app.get("/update-resume")
def update_resume_data():
    resume_text = read_pdf(BASE_DIR / "Mohammad_Saquib_Resume.pdf")
    parsed_data = parse_resume(resume_text)
    
    # Save the AI's extraction to a physical JSON file
    with open(BASE_DIR / "candidate_profile.json", "w") as f:
        f.write(parsed_data.model_dump_json(indent=2))
        
    return {"message": "Resume successfully parsed and saved to JSON!"}

"""@app.post("/chat")
def chat(request: chatrequest):
    resume_text=resume_text=read_pdf(Path("Mohammad_Saquib_Resume.pdf"))
    resume = parse_resume(resume_text)
    answer = ask_candidate(request.question,resume)
    return {
        "answer":answer
    }"""

# --- UPDATED: The chat endpoint now reads the JSON instantly ---
@app.post("/chat")
def chat(request: chatrequest):
    # Check if the JSON exists; if not, tell the user to run the updater
    if not os.path.exists(BASE_DIR / "candidate_profile.json"):
        return {"answer": "System Error: Please visit /update-resume first to generate the candidate profile."}
        
    # Read the JSON file instantly
    with open(BASE_DIR / "candidate_profile.json", "r") as f:
        resume_dict = json.load(f)
        
    resume = Resume(**resume_dict)
    answer = ask_candidate(request.question, resume)
    return {
        "answer": answer
    }


def ask_candidate_stream(question: str, resume: Resume):
    system_prompt = f"""
    You are the official AI representative for Mohammad Saquib. You are currently speaking TO a recruiter or hiring manager.
    
    Below is the ONLY factual data you have about Mohammad:
    {resume.model_dump_json(indent=2)}
    
    RULES FOR CONVERSATION (STRICT ENFORCEMENT):
    1. NEVER INVENT FACTS: You are strictly forbidden from inventing companies, projects, skills, metrics, or degrees. If it is not in the JSON above, Mohammad did not do it.
    2. NARRATIVE, NOT COPY-PASTE: Do not just spit out bullet points. Speak naturally and enthusiastically. Frame his JSON data as a cohesive career story.
    3. SAFE ELABORATION: You are allowed to use your internal knowledge to explain *how* his listed skills work. For example, if discussing his RAG-powered search engine, you can explain the synergy between LangChain, ChromaDB, and Azure OpenAI to make his work sound as impactful as it actually is. 
    4. MISSING INFO: If the recruiter asks about a skill or experience not in the JSON, politely admit he does not have it, but pivot to a related strength he DOES have.
    5. FORMATTING: Keep responses concise. Use short paragraphs. 
    """
    
    try:
        stream = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield f"data: {json.dumps({'token': chunk.choices[0].delta.content})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'token': f'Error generating response: {str(e)}'})}\n\n"
    
    yield "data: [DONE]\n\n"


@app.post("/chat/stream")
def chat_stream(request: chatrequest):
    try:
        profile_path = BASE_DIR / "candidate_profile.json"
        if not os.path.exists(profile_path):
            def missing_gen():
                yield f"data: {json.dumps({'token': 'System Error: candidate_profile.json not found on server.'})}\n\n"
                yield "data: [DONE]\n\n"
            return StreamingResponse(missing_gen(), media_type="text/event-stream")

        with open(profile_path, "r") as f:
            resume_dict = json.load(f)

        resume = Resume(**resume_dict)
        return StreamingResponse(
            ask_candidate_stream(request.question, resume),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
        )
    except Exception as e:
        def err_gen():
            yield f"data: {json.dumps({'token': f'Error: {str(e)}'})}\n\n"
            yield "data: [DONE]\n\n"
        return StreamingResponse(err_gen(), media_type="text/event-stream")