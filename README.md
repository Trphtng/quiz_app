# Quiz App - README

Một ứng dụng trắc nghiệm được xây dựng với FastAPI (Backend) và React (Frontend).

## Cấu trúc Dự Án

```
quiz/
├── backend/           # FastAPI Backend
│   ├── main.py       # Ứng dụng FastAPI chính
│   ├── questions.json # Dữ liệu câu hỏi
│   └── requirements.txt
└── frontend/         # React Frontend
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   │   ├── Quiz.js
    │   │   ├── Results.js
    │   │   └── CSS files
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Cài Đặt

### Backend

1. Vào thư mục backend:
   ```bash
   cd backend
   ```

2. Cài đặt dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Chạy server:
   ```bash
   uvicorn main:app --reload
   ```
   Server sẽ chạy tại `http://localhost:8000`

### Frontend

1. Vào thư mục frontend:
   ```bash
   cd frontend
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Chạy ứng dụng:
   ```bash
   npm start
   ```
   Ứng dụng sẽ tự động mở tại `http://localhost:3000`

## Tính Năng

- ✅ Hiển thị danh sách câu hỏi
- ✅ Cho người dùng chọn đáp án
- ✅ Nộp bài và tính điểm
- ✅ Hiển thị kết quả chi tiết
- ✅ Giao diện đẹp và responsive
- ✅ Thanh tiến độ trực quan
- ✅ Điều hướng dễ dàng giữa các câu hỏi

## API Endpoints

### GET /questions
Lấy danh sách tất cả các câu hỏi (không bao gồm đáp án đúng)

**Response:**
```json
[
  {
    "id": 1,
    "question": "React là thư viện của ngôn ngữ nào?",
    "options": ["Python", "JavaScript", "Java", "C#"]
  }
]
```

### POST /submit
Gửi đáp án và nhận kết quả chấm điểm

**Request:**
```json
{
  "answers": [
    { "question_id": 1, "selected_answer": "JavaScript" },
    { "question_id": 2, "selected_answer": "HTML" }
  ]
}
```

**Response:**
```json
{
  "total_questions": 2,
  "correct_answers": 2,
  "score": 100.0,
  "results": [
    {
      "question_id": 1,
      "question": "React là thư viện của ngôn ngữ nào?",
      "selected_answer": "JavaScript",
      "correct_answer": "JavaScript",
      "is_correct": true
    }
  ]
}
```

## Thêm Câu Hỏi

Để thêm câu hỏi mới, chỉnh sửa file `backend/questions.json` theo định dạng:

```json
{
  "id": 11,
  "question": "Câu hỏi của bạn ở đây?",
  "options": ["Tùy chọn 1", "Tùy chọn 2", "Tùy chọn 3", "Tùy chọn 4"],
  "correct_answer": "Tùy chọn đúng"
}
```

## Công Nghệ Sử Dụng

- **Backend**: FastAPI, Python, Uvicorn
- **Frontend**: React 18, CSS3
- **API Communication**: Fetch API
- **Styling**: Custom CSS with Gradients

## License

MIT License
