// Questions array that will be used to hold question objects
let questionsArr = [];

// Generate question object with right and wrong answers stored in object
const questionObjGenerator = (question, rightAnswer, wrongAnswer1, wrongAnswer2, WrongAnswer3) => {
    const q =  {
        question: question,
        rightAnswer: rightAnswer,
        wrongAnswer1: wrongAnswer1,
        wrongAnswer2: wrongAnswer2,
        WrongAnswer3: WrongAnswer3
    };

    questionsArr.push(q);
};

// Create object for each question
questionObjGenerator("Commonly used data typed DO Not include:", "alerts", "strings", "booleans", "numbers");

// questionObjGenerator("The condition in an if / else statement is enclosed with _____.", "paranthesis", "quotes", "curly brackets", "square brackets");

//  questionObjGenerator("Arrays in Javascript can be used to store _____.", "all of the above", "numbers and strings", "other arrays", "booleans");

// questionObjGenerator("String values must be enclosed withing _____ when being assigned to variables", "quotes", "commas", "curly brackets", "paranthesis");

// Function to render question page on screen
const renderQuestion = (question) => {
    // Get main DOM element
    const mainEl = document.querySelector("main");
    
    // Create html elements for question content
    let questionContainer = document.createElement("div");
    let answerContainer = document.createElement("div");
    let questionTitleEl = document.createElement("h2");
    let answerListEl = document.createElement("ol");
    let firstAnswerEl = document.createElement("li");
    let secondAnswerEl = document.createElement("li");
    let thirdAnswerEl = document.createElement("li")
    let fourthAnswerEl = document.createElement("li")

    // Question put into h2 element
    questionTitleEl.innerText = question.question;

    // Answers put into li element
    firstAnswerEl.innerText = question.rightAnswer;
    secondAnswerEl.innerText = question.wrongAnswer1;
    thirdAnswerEl.innerText = question.wrongAnswer2;
    fourthAnswerEl.innerHTML = question.WrongAnswer3;

    // Clears child elements from main
    mainEl.innerHTML = "";

    // Append question div to main element
    mainEl.append(questionContainer);

    // Append question to question div
    questionContainer.append(questionTitleEl);

    // Append answer container to main element
    mainEl.append(answerContainer);

    // Append list to answer container
    answerContainer.append(answerListEl);

    // Append answers (li) to ol element
    answerListEl.append(firstAnswerEl, secondAnswerEl, thirdAnswerEl, fourthAnswerEl);

}

for (let i = 0; i < questionsArr.length; i++) {
    renderQuestion(questionsArr[i]);
}