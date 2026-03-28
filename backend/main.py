from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from typing import List

app = FastAPI(title="Quiz API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load questions from JSON file
with open("questions.json", "r", encoding="utf-8") as f:
    QUESTIONS = json.load(f)


class Answer(BaseModel):
    question_id: int
    selected_answer: str


class SubmitRequest(BaseModel):
    answers: List[Answer]


class QuestionResponse(BaseModel):
    id: int
    question: str
    options: List[str]


class ResultDetail(BaseModel):
    question_id: int
    question: str
    selected_answer: str
    correct_answer: str
    is_correct: bool


class SubmitResponse(BaseModel):
    total_questions: int
    correct_answers: int
    score: float
    results: List[ResultDetail]


@app.get("/questions", response_model=List[QuestionResponse])
def get_questions():
    """Get all questions without revealing correct answers"""
    return [
        QuestionResponse(
            id=q["id"],
            question=q["question"],
            options=q["options"]
        )
        for q in QUESTIONS
    ]


@app.post("/submit", response_model=SubmitResponse)
def submit_answers(request: SubmitRequest):
    """Submit answers and get scoring results"""
    results = []
    correct_count = 0
    
    # Create a mapping of question_id to questions for easy lookup
    questions_map = {q["id"]: q for q in QUESTIONS}
    
    for answer in request.answers:
        question = questions_map.get(answer.question_id)
        if question:
            is_correct = answer.selected_answer == question["correct_answer"]
            if is_correct:
                correct_count += 1
            
            results.append(
                ResultDetail(
                    question_id=answer.question_id,
                    question=question["question"],
                    selected_answer=answer.selected_answer,
                    correct_answer=question["correct_answer"],
                    is_correct=is_correct
                )
            )
    
    total_questions = len(request.answers)
    score = (correct_count / total_questions * 100) if total_questions > 0 else 0
    
    return SubmitResponse(
        total_questions=total_questions,
        correct_answers=correct_count,
        score=score,
        results=results
    )


@app.get("/")
def root():
    """Health check endpoint"""
    return {"message": "Quiz API is running"}
