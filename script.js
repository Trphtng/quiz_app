const questions = [
    {
        numb: 1,
        question: "HTML là viết tắt của từ gì?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        numb: 2,
        question: "CSS là viết tắt của từ gì?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "Ngôn ngữ nào được dùng để tạo sự tương tác cho trang web?",
        answer: "JavaScript",
        options: [
            "HTML",
            "CSS",
            "Python",
            "JavaScript"
        ]
    },
    {
        numb: 4,
        question: "Cú pháp CSS nào sau đây là đúng?",
        answer: "body {color: black;}",
        options: [
            "body:color=black;",
            "{body:color=black;}",
            "body {color: black;}",
            "{body;color:black;}"
        ]
    },
    {
        numb: 5,
        question: "Thẻ HTML nào dùng để tạo thẻ link?",
        answer: "<a>",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<nav>"
        ]
    }
];

const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const optionList = document.querySelector(".option-list");
const timeText = document.querySelector(".timer .time-text");
const timeCount = document.querySelector(".timer .timer-sec");

const nextBtn = document.querySelector("footer .next-btn");
const bottomQuesCounter = document.querySelector("footer .total-questions");

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let timeValue = 15;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    quizBox.classList.remove("hide");
    resultBox.classList.remove("active");
    timeValue = 15;
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    startTimer(timeValue);
    nextBtn.classList.remove("show");
}

quitQuiz.onclick = () => {
    window.location.reload();
}

nextBtn.onclick = () => {
    if(questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        clearInterval(counter);
        startTimer(timeValue);
        nextBtn.classList.remove("show");
    } else {
        clearInterval(counter);
        showResult();
    }
}

function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>`
                  + `<div class="option"><span>${questions[index].options[1]}</span></div>`
                  + `<div class="option"><span>${questions[index].options[2]}</span></div>`
                  + `<div class="option"><span>${questions[index].options[3]}</span></div>`;
    questionText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll(".option");
    for(let i=0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent.trim();
    let correctAns = questions[questionCount].answer;
    const allOptions = optionList.children.length;

    if(userAns === correctAns) {
        userScore += 1;
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");
        for(let i=0; i < allOptions; i++) {
            if(optionList.children[i].textContent.trim() === correctAns) {
                optionList.children[i].classList.add("correct");
            }
        }
    }

    for(let i=0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.add("active");
    const scoreText = resultBox.querySelector(".score-text");
    let scoreTag = `<span>Bạn đúng <p>${userScore}</p> trên <p>${questions.length}</p> câu!</span>`;
    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            
            const allOptions = optionList.children.length;
            let correctAns = questions[questionCount].answer;
            for(let i=0; i < allOptions; i++) {
                if(optionList.children[i].textContent.trim() === correctAns) {
                    optionList.children[i].classList.add("correct");
                }
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function questionCounter(index) {
    let totalQueCountTag = `<span>Câu <p>${index}</p> / <p>${questions.length}</p></span>`;
    bottomQuesCounter.innerHTML = totalQueCountTag;
}

// Login/Logout Functionality
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const appContainer = document.getElementById('appContainer');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserSpan = document.getElementById('currentUser');

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('quizAppUser');
    if (loggedInUser) {
        loginModal.classList.add('hide');
        appContainer.style.display = 'flex';
        currentUserSpan.textContent = `Xin chào, ${loggedInUser}!`;
        startQuiz();
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Simple validation - you can add more complex authentication
    if (username && password.length >= 3) {
        localStorage.setItem('quizAppUser', username);
        loginModal.classList.add('hide');
        appContainer.style.display = 'flex';
        currentUserSpan.textContent = `Xin chào, ${username}!`;
        loginForm.reset();
        startQuiz();
    } else {
        alert('Tên người dùng phải có và mật khẩu tối thiểu 3 ký tự!');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('quizAppUser');
    quizBox.classList.remove('hide');
    resultBox.classList.remove('active');
    loginModal.classList.remove('hide');
    appContainer.style.display = 'none';
    timeValue = 15;
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    nextBtn.classList.remove('show');
    clearInterval(counter);
});

function startQuiz() {
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
}
