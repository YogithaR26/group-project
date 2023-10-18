

const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options'); // Change querySelector to select a single element
const _correctScore = document.getElementById('correctscore');
const _totalQuestion = document.getElementById('totalQuestion');
const _checkButton = document.getElementById('answer'); // Change _checkbton to _checkButton
const _playAgain = document.getElementById('play-again');
const _result = document.getElementById('result');
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category");
const difficulty = queryParams.get("difficulty");
const username = queryParams.get("username");
let correctAnswer = "";
let correctScore = askedCount = 0;
const totalQuestion = 10;
let currentQuestion = 0;

document.addEventListener('DOMContentLoaded', () => {
    getQuestion();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
    addEventListeners(); // Call the function to add event listeners
});

function addEventListeners() {
    _checkButton.addEventListener('click', checkAnswer);
    _playAgain.addEventListener('click', restartQuiz);
}

async function getQuestion() {
    const url =`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    _result.innerHTML = '';
    showQuestion(data.results[0]);
}

function showQuestion(data) {
    currentQuestion++;
    _checkButton.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let optionsList = [...incorrectAnswers];
    optionsList.splice(
        Math.floor(Math.random() * optionsList.length), // Use optionsList.length instead of incorrectAnswers.length
        0,
        correctAnswer
    );

    _question.innerHTML = `${data.question} <br><span class="category">${data.category}</span>`;
    _options.innerHTML = `
       ${optionsList.map((option, index) => `
          <li>${index + 1}. <span>${option}</span></li>
        `).join('')}
    `;
    selectOption();
    updateQustionNumber();
}
function updateQustionNumber(){
    const questionNoElement = document.querySelector('.questionno');
    questionNoElement.textContent = `Qno: ${currentQuestion}/${totalQuestion}`;
}
function selectOption() {
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if (_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function playAgain() {
    _checkButton.disabled = false;
    _result.innerHTML = ''; // Clear the result
    window.location.href = "demo.html";// Redirect to demo.html
}

// Answer checking
function checkAnswer() {
    _checkButton.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedOption = _options.querySelector('.selected span').textContent;
        if (selectedOption.trim() === decodeHTML(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p><i class="fas fa-check"></i> CORRECT ANSWER!</p>`;
        } else {
            _result.innerHTML = `<p><i class="fas fa-times"></i> WRONG ANSWER!</p><p><small><b>Correct Answer:</b> ${correctAnswer}</small></p>`;
        }
        checkCount();
    }else{
        _result.innerHTML = `<p><i class="fas fa-times"></i> Please select an option</p>`
        _checkButton.disabled = false;
    }
}



function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function checkCount(){
    askedCount++;
    setCount(); // Fix the typo here
    if(askedCount == totalQuestion){
        _result.innerHTML += `<p> You answered ${correctScore} out of ${totalQuestion} questions correctly</p>`;
        _playAgain.style.display = 'block';
        _checkButton.style.display = 'none';
    } else {
        setTimeout(() => {
            getQuestion();
        }, 400);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}
document.getElementById('back').addEventListener('click', function() {
    window.location.href = `demo.html`; // Change the URL to your demo.html location
});
function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgain.style.display = 'none';
    _checkButton.style.display = 'block';
    _checkButton.disabled = false;
    setCount();
    getQuestion();
}
