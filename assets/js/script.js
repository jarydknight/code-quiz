// Questions array that will be used to hold question objects
let questionsArr = [];

// Question counter to move through questions array
let questionCounter = 0;

//starting amount of time given to complete quiz
let time = 60;

//object created to keep track of game data to be passed to end game function
const gameData = {
    correctAnswers: 0,
    score: 0
};

let highScore = [];

if (!localStorage.getItem("highscore")) {
    highScore = [];
}
else {
    highScore = JSON.parse(localStorage.getItem("highscore"))
}

// Generate question object with right and wrong answers stored in object
const questionObjGenerator = (question, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) => {
    const q =  {
        question: question,
        rightAnswer: rightAnswer,
        wrongAnswer1: wrongAnswer1,
        wrongAnswer2: wrongAnswer2,
        wrongAnswer3: wrongAnswer3
    };

    questionsArr.push(q);
};

// Countdown timer
let timeInterval;
const countdown = () => {

    const timer = document.querySelector(".timer");

    if (time > 0) {
        timer.innerText = `Time: ${time}`;
        time --;
    }
    else {
        timer.innerText = `Time: ${time}`;
        clearInterval(timeInterval);
        // When timer reaches 0 game ends
        endQuiz(gameData);
    }
  
};

// Function to clear values stored in game data object
const clearGameData = () => {
    // Clears values from game data object at end of game so that when a new game is started the old stats are not tracked
    gameData.score = 0;
    gameData.correctAnswers = 0;
    gameData.time = 0;
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
    let answerListEl = document.createElement("ul");
    let rightAnswerEl = document.createElement("li");
    let wrongAnswer1El = document.createElement("li");
    let wrongAnswer2El = document.createElement("li")
    let wrongAnswer3El = document.createElement("li")

    // Question put into h2 element
    questionTitleEl.innerText = question.question;

    // Answers put into li element
    rightAnswerEl.innerText = question.rightAnswer;
    wrongAnswer1El.innerText = question.wrongAnswer1;
    wrongAnswer2El.innerText = question.wrongAnswer2;
    wrongAnswer3El.innerHTML = question.wrongAnswer3;

    // Set class for answer elements
    rightAnswerEl.className = "answer";
    wrongAnswer1El.className = "answer";
    wrongAnswer2El.className = "answer";
    wrongAnswer3El.className = "answer";

    // Set class for ol element
    answerListEl.className = "answer-list";
    
    // Sets data attribute for right and wrong answers 
    rightAnswerEl.setAttribute("data-answer", "correct");
    wrongAnswer1El.setAttribute("data-answer", "incorrect");
    wrongAnswer2El.setAttribute("data-answer", "incorrect");
    wrongAnswer3El.setAttribute("data-answer", "incorrect");

    // cite: Fischer-Yates Shuffle https://bost.ocks.org/mike/shuffle/
    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    // Arrays used to hold question elements. the second array is put into random order then used to render questions on screen
    let questionElArr = [rightAnswerEl, wrongAnswer1El, wrongAnswer2El, wrongAnswer3El];
    let randomOrderQuestionArr = shuffle(questionElArr)

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
    for (let i = 0; i < randomOrderQuestionArr.length; i++) {
        answerListEl.append(randomOrderQuestionArr[i])
    }

    questionCounter ++;

};

// Function to render end of quiz elements
const renderEndQuiz = (gameData) => {
    
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
    displayScore.innerText = `Your final score is ${gameData.score}`
    
    scoreForm.innerHTML = "<label for='name'>Enter Initials:</label> <input type='text' name='initials' /> <button class='submit-score' type='button' >Submit</button>";

    // Append elements created above to main element in DOM
    mainEl.append(endTitle, displayScore, scoreForm);

}

// Function to render high scores elements
const renderHighScores = () => {
    // Stops timer if high scores are viewed during game
    clearInterval(timeInterval);
    
    // Gets high scores from local storage. Needs to be done again incase high scores are cleared
    if (!localStorage.getItem("highscore")) {
        highScore = [];
    }
    else {
        highScore = JSON.parse(localStorage.getItem("highscore"))
    }

    // select main element from DOM
    const mainEl = document.querySelector("main");

    // Clear child contents of main element
    mainEl.innerText = "";

    //High score title element
    const highScoreTitle = document.createElement("h2");

    //High score list
    const highScoreList = document.createElement("ol");

    // Give class to high score ol element
    highScoreList.className = "high-score-list"

    // Div to hold go back and clear high score buttons
    const buttonDiv = document.createElement("div");
    const backButton = document.createElement("button")
    const clearScores = document.createElement("button");

    // Give button div class for styling
    buttonDiv.className = "high-score-button-div";


    // Add content to elements created above
    highScoreTitle.innerText = "High Scores";

    for (i = 0; i < highScore.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = `${highScore[i][0]} - ${highScore[i][1]}`;
        listItem.className = "high-score-list-element"
        highScoreList.append(listItem);
    }

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

}

// Function to alert users if they got answer right
const correctAnswerAlert = () => {
    const mainEl = document.querySelector("main");
    mainEl.innerText = "";
    mainEl.innerHTML = "<h2 data-grade='correct'>CORRECT!</h2>";
}

// Function to alert users if they got answer wrong
const incorrectAnswerAlert = () => {
    const mainEl = document.querySelector("main");
    mainEl.innerText = "";
    mainEl.innerHTML = "<h2 data-grade='incorrect'>INCORRECT!</h2>";
}


// Handles click events in the main element
const clickHandlerMainEl = (event) => {

    // Check the target of the click event, load next question, and start timer
    if (event.target.matches(".start-quiz-button") && questionCounter < questionsArr.length) {
        //give time a value again so that if the game is restarted the variable is reset
        time = 60
        renderQuestion(questionsArr[questionCounter]);
        timeInterval = setInterval(countdown, 1000);
    }
    // Check target of click is answer and load next question
    else if (event.target.matches(".answer") && questionCounter < questionsArr.length) {

        // Add point for correct answers to game data object. If not true subtract 10 seconds from timer
        if (event.target.getAttribute("data-answer") === "correct") {

            gameData.correctAnswers ++;

            // Render alert to show users if they got answer right
            correctAnswerAlert();
            setTimeout(function () {renderQuestion(questionsArr[questionCounter]);}, 2000);
        }
        else {

            time -= 10;
            // Render alert to show users if they got answer wrong
            incorrectAnswerAlert();
            setTimeout(function () {renderQuestion(questionsArr[questionCounter]);}, 2000);
        }
    }
    // If end of question array reached, call endgame function when click event happens
    else if (event.target.matches(".answer") && questionCounter >= questionsArr.length) {
        clearInterval(timeInterval);

        /// Add point for correct answers to game data object. If not true subtract 10 seconds from timer
        if (event.target.getAttribute("data-answer") === "correct") {
            gameData.correctAnswers ++;

            // Render alert to show users if they got answer right
            correctAnswerAlert();
            setTimeout(function () {endQuiz(gameData);}, 1000);
        }
        else {
            time -= 10;

            // Render alert to show users if they got answer wrong
            incorrectAnswerAlert();
            setTimeout(function () {endQuiz(gameData);}, 1000);
        }
    }

    // Render high score and submit high scores to local storage
    else if (event.target.matches(".submit-score")) {

        // add user score and initials to high score list
        const initials = document.querySelector("input[name='initials']").value;
    
        // Put high score elements in order of highest to lowest score
        if (highScore.length > 0) {
            for (let i = 0; i < highScore.length; i++) {
                if (gameData.score > highScore[i][1]) {
                    highScore.splice(i, 0, [initials, gameData.score])
                    break;
                }
                // Indicates that we iterated to the last item in the high score list and the user score should be added below this score
                else if (i === highScore.length - 1) {
                    highScore.push([initials, gameData.score]);
                    break;
                }
            }
        }
        else {
            highScore.push([initials, gameData.score])
        }

        localStorage.setItem("highscore", JSON.stringify(highScore));
        renderHighScores();

        // Clear game data after score is saved in local storage
        clearGameData();
    }
    // Takes user back to main page to restart quiz
    else if (event.target.matches("#back-button")) {
        questionCounter = 0;
        
        renderMainPage();
    }
    // Clears high scores from local storage
    else if (event.target.matches("#clear-high-scores")) {
        localStorage.clear();
        renderHighScores();
    }

}

const clickHandlerHeaderEl = (event) => {
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

    // Check if there is a high score data object in local storage and retrieve it if there is one
};

// Function called run run end game procedures
const endQuiz = (gameData) => {
    gameData.time = time;

    // Calculate score when quiz ends. If time runs out and no quesiton answered score will be -1. this ensure that score does not go below zero
    
    gameData.score = (gameData.correctAnswers * 7) + time;

    renderEndQuiz(gameData);
};

startQuiz();