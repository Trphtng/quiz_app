## Quick Start Guide

### Option 1: Automatic Start (Windows)
1. Double-click `start-dev.bat`
2. Wait for both servers to start
3. Backend will be at `http://localhost:8000`
4. Frontend will open automatically at `http://localhost:3000`

### Option 2: Automatic Start (macOS/Linux)
1. Run `chmod +x start-dev.sh`
2. Run `./start-dev.sh`
3. Backend will be at `http://localhost:8000`
4. Frontend will open automatically at `http://localhost:3000`

### Option 3: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## How to Use the App

1. **Open the app** - Go to `http://localhost:3000`
2. **Click "Bắt Đầu"** (Start) to begin the quiz
3. **Select answers** - Click on any option button to select your answer
4. **Navigate** - Use arrow buttons or click on the numbered indicators at the bottom to move between questions
5. **Submit** - Click "Nộp Bài" (Submit) button to submit your answers
6. **View Results** - See your score and review each answer
7. **Restart** - Click "Làm Lại" (Try Again) to restart the quiz

## Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed
- Check if port 8000 is available
- Try: `pip install -r requirements.txt` first

### Frontend won't start
- Make sure Node.js and npm are installed
- Delete `node_modules` folder and run `npm install` again
- Check if port 3000 is available

### CORS errors
- Backend and Frontend ports must match
- Check that FastAPI CORS middleware is enabled
- Verify proxy in `frontend/package.json`

### API calls fail
- Make sure backend is running on `http://localhost:8000`
- Check browser console for errors (F12)
- Verify `questions.json` exists in backend folder

## Customization

### Add More Questions
Edit `backend/questions.json` and add new question objects:
```json
{
  "id": 11,
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer": "Option A"
}
```

### Change Styling
- Modify CSS files in `frontend/src/` and `frontend/src/components/`
- Update colors, fonts, and layouts as needed

### Change number of questions
Currently shows 10 questions. To change:
1. Add/remove questions from `backend/questions.json`
2. No code changes needed - frontend adapts automatically

## Project Structure

```
quiz/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── questions.json       # Quiz questions data
│   ├── requirements.txt     # Python dependencies
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML entry point
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Global styles
│   │   ├── index.js        # React DOM render
│   │   ├── index.css       # Global CSS
│   │   └── components/
│   │       ├── Quiz.js     # Quiz questions display
│   │       ├── Quiz.css
│   │       ├── Results.js  # Results display
│   │       └── Results.css
│   ├── package.json         # Node dependencies
│   ├── .env                # Environment variables
│   ├── .gitignore
│   └── .env
├── start-dev.bat            # Windows startup script
├── start-dev.sh             # Unix startup script
└── README.md                # Project documentation
```

## Features Implemented

✅ **Backend (FastAPI)**
- GET /questions - Fetch all questions
- POST /submit - Submit answers and get score
- CORS enabled for frontend communication
- Automatic scoring calculation

✅ **Frontend (React)**
- Beautiful, responsive UI with gradients
- Quiz display with 5-10 questions
- Interactive answer selection
- Progress bar showing quiz completion
- Question indicator dots for navigation
- Results page with detailed score breakdown
- Correct/incorrect answer display for each question
- "Try Again" functionality to restart quiz
- Mobile-friendly design

## Technologies Used

- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **Frontend**: React 18, CSS3 (no build tools needed beyond create-react-app)
- **Communication**: JSON, CORS-enabled REST API
- **File Format**: JSON for question data storage
