// Questions array that will be used to hold question objects
let questionsArr = [];

// Question counter to move through questions array
let questionCounter = 0;

//object created to keep track of game data to be passed to end game function
const gameData = {
    initials: "",
    correctAnswers: 0,
    score: 0,
};

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

// Renders main display
const renderMainPage = () => {
    mainEl = document.querySelector("main");

    // Clear child contents of main element in DOM
    mainEl.innerText = "";

    // Create child elements of main page 
    mainTitle = document.createElement ("h1");
    instructions = document.createElement("p");
    startButton = document.createElement("button");

    // Add content to child elements of main element
    mainTitle.innerText = "Coding Quiz Challenge";
    instructions.innerText = "Try to answer the following code-related questions withing the time limit. Keep in Mind that incorrect answers will penalize your score/time by ten seconds!";
    startButton.innerText = "Start Quiz";
    startButton.className = "start-quiz-button";
    startButton.type = "button";

    mainEl.append(mainTitle, instructions, startButton);
}

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

    // Set class for answers
    firstAnswerEl.className = "answer";
    secondAnswerEl.className = "answer";
    thirdAnswerEl.className = "answer";
    fourthAnswerEl.className = "answer";

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

    questionCounter ++;

};

const renderEndQuiz = (gameData) => {

    event.preventDefault();
    
    // Select main element in DOM
    const mainEl = document.querySelector("main");

    // Clear all child objects in the main element
    mainEl.innerText = "";

    // Create main elements for end quiz page
    let endTitle = document.createElement("h2");
    let displayScore = document.createElement("h3");
    let scoreForm = document.createElement("form");

    // Add content to elements created above
    endTitle.innerText = "All Done!";
    displayScore.innerText = "Your final score is 22"
    
    scoreForm.innerHTML = "<label for='name'>Enter Initials:</label> <input type='text' name='initials' /> <button class='submit-score' type='button' >Submit</button>";

    // Append elements created above to main element in DOM
    mainEl.append(endTitle, displayScore, scoreForm);

}

const renderHighScores = () => {

    // select main element from DOM
    const mainEl = document.querySelector("main");

    // Clear child contents of main element
    mainEl.innerText = "";

    //High score title element
    const highScoreTitle = document.createElement("h2");

    //High score list
    const highScoreList = document.createElement("ol");

    // TODO: dynamically retrieve list from local storage. for now using test list
    const firstPlace = document.createElement("li");
    const secondPlace = document.createElement("li");

    // Div to hold go back and clear high score buttons
    const buttonDiv = document.createElement("div");
    const backButton = document.createElement("button")
    const clearScores = document.createElement("button");


    // Add content to elements created above
    highScoreTitle.innerText = "High Scores";
    firstPlace.innerText = "JK";
    secondPlace.innerText = "KM";

    backButton.className = "high-score-button";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.innerText = "Back"

    clearScores.className = "high-score-button";
    clearScores.id = "clear-high-scores";
    clearScores.type = "button";
    clearScores.innerText = "Clear High Scores"

    mainEl.append(highScoreTitle, highScoreList);
    mainEl.append(buttonDiv);
    buttonDiv.append(backButton, clearScores);
    highScoreList.append(firstPlace, secondPlace);

}

// Handles click events in the main element
const clickHandlerMainEl = (event) => {

    // Check the target of the click event and load next question
    if (event.target.matches(".start-quiz-button") || event.target.matches(".answer") && questionCounter < questionsArr.length) {
        renderQuestion(questionsArr[questionCounter])
    }
    // If end of question array reached, call endgame function when click event happens
    else if (event.target.matches(".start-quiz-button") || event.target.matches("li") && questionCounter >= questionsArr.length) {
        endQuiz(gameData);
    }
    // Submit score to local storage and renders high score
    else if (event.target.matches(".submit-score")) {
        // TODO
        renderHighScores();
    }
    // Takes user back to main page to restart quiz
    else if (event.target.matches("#back-button")) {
        questionCounter = 0;
        
        renderMainPage();
    }
    // Clears high scores from local storage
    else if (event.target.matches("#clear-high-scores")) {
        //TODO: clear high scores from local storage
    }

}

const clickHandlerHeaderEl =(event) => {
    if (event.target.matches(".view-high-scores")) {
        renderHighScores()
    }
}

// Function to start the quiz
const startQuiz = () => {

    // Create object for each question
    questionObjGenerator("Commonly used data typed DO Not include:", "alerts", "strings", "booleans", "numbers");

    questionObjGenerator("The condition in an if / else statement is enclosed with _____.", "paranthesis", "quotes", "curly brackets", "square brackets");

    questionObjGenerator("Arrays in Javascript can be used to store _____.", "all of the above", "numbers and strings", "other arrays", "booleans");

    questionObjGenerator("String values must be enclosed withing _____ when being assigned to variables", "quotes", "commas", "curly brackets", "paranthesis");

    // Select main element in DOM
    const mainEl = document.querySelector("main");

    // Select header element in DOM
    const headerEl = document.querySelector("header");

    // Add event listener to main elementto listen for button clicks
    mainEl.addEventListener("click", clickHandlerMainEl)

    // Add event listener for clicks in header element in DOM
    headerEl.addEventListener("click", clickHandlerHeaderEl);
};

const endQuiz = (gameData) => {
    renderEndQuiz(gameData);
};

startQuiz();