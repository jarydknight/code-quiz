// Questions array that will be used to hold question objects
let questionsArr = [];

// Question counter to move through questions array
let questionCounter = 0;

//starting amount of time given to complete quiz
let time = 60;

// Select header element in DOM
const headerEl = document.querySelector("header");

// Main element saved in variable to be targeted when rendering html content
const mainEl = document.querySelector("main");

// Timer element saved in variable to be targeted for rendering countdown timer
const timerEl = document.querySelector(".timer");

//object created to keep track of game data to be passed to end game function
const gameData = {
    correctAnswers: 0,
    score: 0
};

// Array that holds high scores. 
let highScore = [];

// Load high scores from local storage and update high score array if there is data saved in local storage
const getHighScores = () => {
    if (!localStorage.getItem("highscore")) {
        highScore = [];
    }
    else {
        highScore = JSON.parse(localStorage.getItem("highscore"));
    }
}

// Function to save highscores to local storage
const setHighScores = () => {
    localStorage.setItem("highscore", JSON.stringify(highScore));
}

const sortHighScores = () => {
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

    if (time > 0) {
        timerEl.innerText = `Time: ${time}`;
        time --;
    }
    else {
        timerEl.innerText = `Time: ${time}`;
        clearInterval(timeInterval);
        // When timer reaches 0 game ends
        endQuiz(gameData);
    }
  
};

// Function to alert users if they got answer right
const correctAnswerAlert = () => {
    mainEl.innerText = "";
    mainEl.innerHTML = "<h2 data-grade='correct'>CORRECT!</h2>";
}

// Function to alert users if they got answer wrong
const incorrectAnswerAlert = () => {
    mainEl.innerText = "";
    mainEl.innerHTML = "<h2 data-grade='incorrect'>INCORRECT!</h2>";
}

// Function to clear values stored in game data object
const clearGameData = () => {
    // Clears values from game data object at end of game so that when a new game is started the old stats are not tracked
    gameData.score = 0;
    gameData.correctAnswers = 0;
    gameData.time = 0;
};

// Renders main display
const renderMainPage = () => {
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
    wrongAnswer3El.innerText = question.wrongAnswer3;

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
    mainEl.append(questionContainer, answerContainer);

    // Append question to question div
    questionContainer.append(questionTitleEl);

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
    getHighScores();

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

    // Add class, id, tyoe and inner text to back button
    backButton.className = "high-score-button";
    backButton.id = "back-button";
    backButton.type = "button";
    backButton.innerText = "Back"

    // Add class, id, tyoe and inner text to clear scores button
    clearScores.className = "high-score-button";
    clearScores.id = "clear-high-scores";
    clearScores.type = "button";
    clearScores.innerText = "Clear High Scores"

    // Appends high scores from array to li elements to be rendered
    for (i = 0; i < highScore.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = `${highScore[i][0]} - ${highScore[i][1]}`;
        listItem.className = "high-score-list-element"
        highScoreList.append(listItem);
    }

    // Append elements created above to main element
    mainEl.append(highScoreTitle, highScoreList);
    mainEl.append(buttonDiv);
    buttonDiv.append(backButton, clearScores);

}

// Handles click events in the main element
const clickHandlerMainEl = (event) => {

    // Check the target of the click event, load next question, and start timer
    if (event.target.matches(".start-quiz-button") && questionCounter < questionsArr.length) {

        // Clear game data after score is saved in local storage so that new game starts with fresh stats
        clearGameData();

        //give time a value again so that if the game is restarted the variable is reset
        time = 60
        renderQuestion(questionsArr[questionCounter]);
        timeInterval = setInterval(countdown, 1000);
    }
    // Check target of click is answer and load next question
    else if (event.target.matches(".answer") && questionCounter < questionsArr.length) {

        // Add point for correct answers to game data object. If not true subtract 10 seconds from timer
        if (event.target.getAttribute("data-answer") === "correct") {

            // Add a point for correct answers
            gameData.correctAnswers ++;

            // Render alert to show users if they got answer right
            correctAnswerAlert();
            setTimeout(function () {renderQuestion(questionsArr[questionCounter]);}, 2000);
        }
        else {

            // subtract 10 seconds from time if it won't bring time below 0. if it will then set time to 0
            time = time - 10 >= 0 ? time -= 10 : 0;
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
            // subtract 10 seconds from time if it won't bring time below 0. if it will then set time to 0
            time = time - 10 >= 0 ? time -= 10 : 0;

            // Render alert to show users if they got answer wrong
            incorrectAnswerAlert();
            setTimeout(function () {endQuiz(gameData);}, 1000);
        }
    }

    // Render high score and submit high scores to local storage
    else if (event.target.matches(".submit-score")) {

        sortHighScores();

        setHighScores();

        renderHighScores();

    }
    // Takes user back to main page to restart quiz
    else if (event.target.matches("#back-button")) {
        questionCounter = 0;
        
        renderMainPage();
    }
    // Clears high scores from local storage
    else if (event.target.matches("#clear-high-scores")) {
        localStorage.removeItem("highscore");
        renderHighScores();
    }

}

const clickHandlerHeaderEl = (event) => {
    if (event.target.matches(".view-high-scores")) {
        renderHighScores();
    }
}

// Function to start the quiz
const startQuiz = () => {

    // Create object for each question
    questionObjGenerator("Commonly used data typed DO Not include:", "alerts", "strings", "booleans", "numbers");

    questionObjGenerator("The condition in an if / else statement is enclosed with _____.", "paranthesis", "quotes", "curly brackets", "square brackets");

    questionObjGenerator("Arrays in Javascript can be used to store _____.", "all of the above", "numbers and strings", "other arrays", "booleans");

    questionObjGenerator("String values must be enclosed withing _____ when being assigned to variables", "quotes", "commas", "curly brackets", "paranthesis");

    questionObjGenerator("A very useful tool used during development and debugging for printing content to the debugger is:", "console.log", "Javascript", "terminal/bash", "for loops");

    // Add event listener to main elementto listen for button clicks
    mainEl.addEventListener("click", clickHandlerMainEl)

    // Add event listener for clicks in header element in DOM
    headerEl.addEventListener("click", clickHandlerHeaderEl);

};

// Function called run run end game procedures
const endQuiz = (gameData) => {
    gameData.time = time;
    
    // Update timer once more when game ends 
    timerEl.innerText = `Time: ${time}`;

    // Calculate score when quiz ends. 
    gameData.score = (gameData.correctAnswers * 7) + time > 0 ? (gameData.correctAnswers * 7) + time : 0;

    renderEndQuiz(gameData);
};

startQuiz();