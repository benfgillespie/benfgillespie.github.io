/**
 * Created by Ben on 30/12/14.
 */

var playing = 0;
var score=0;
var attempts=0;
var rightAnswer = "";
var availableWords = [];
var dictionary = {};
var targetscore = 0;
var gametime = 0;
var centerWord;
var word2;
var word3;
var word4;
var word5;

var gameHTML = "<table width=\"100%\" height=\"100%\" > <tr height=\"30%\"> <td id=\"word2\" class=\"td-button\"></td> <td id=\"word3\" class=\"td-button\"></td> </tr> <tr height=\"30%\"> <td id=\"word1\" colspan=\"2\" class=\"td-button centerWord\">Hello</td> </tr> <tr height=\"30%\"> <td id=\"word4\" class=\"td-button\"></td> <td id=\"word5\" class=\"td-button\"></td> </tr> <tr height=\"10%\"> <td id=\"score\" colspan=\"2\" class=\"td-button score\"></td> </tr> </table>";

function playGame(category) {
    document.body.innerHTML = gameHTML;

    centerWord = $("#word1");
    word2 = $("#word2");
    word3 = $("#word3");
    word4 = $("#word4");
    word5 = $("#word5");

    centerWord.text('GO');
    centerWord.click(word1click);

    if (category == "greetings") {
        addWordPair("Hello","Hola");
        addWordPair("Thanks","Gracias");
        addWordPair("Goodbye","Adiós");
        addWordPair("Slow","Lento");
        addWordPair("I believe","Creo");
    }
    if (category == "school") {
        addWordPair("School", "Esquela");
        addWordPair("Teacher", "Profesor");
        addWordPair("Book", "Libro");
        addWordPair("English", "Inglés");
        addWordPair("Science", "Ciencia");
    }

}

function addWordPair(english,spanish) {
    availableWords.push(english);
    dictionary[english] = spanish;
}

function enableButtons() {
    // setup the event handlers for word clicks
    word2.click(function () {
        answerClick($(this))
    });
    word3.click(function () {
        answerClick($(this))
    });
    word4.click(function () {
        answerClick($(this))
    });
    word5.click(function () {
        answerClick($(this))
    });

    // reset backgrounds
    word2.css('background-color', 'white');
    word3.css('background-color', 'white');
    word4.css('background-color', 'white');
    word5.css('background-color', 'white');
}

function startGame() {
    playing=1;
    targetscore = 10;
    updateScore();
    startTime = new Date().getTime();
    intervalId = setInterval(function() {getDate()});
    startNewRound();
}

function startNewRound() {

    if (score == targetscore) {
        endGame();
        return;
    }

    enableButtons();

    var numberOfWordsAvailable = availableWords.length;
    var randomNumber = Math.floor(Math.random()*numberOfWordsAvailable);
    var englishWord = availableWords[randomNumber];
    rightAnswer = dictionary[englishWord];

    var shuffledEnglishWords = shuffle(availableWords);
    var answers = [];
    answers[0] = rightAnswer;

    var x = 0;
    var i = 1;
    while (answers.length < 4) {
        var wrongAnswer = shuffledEnglishWords[x];
        if (wrongAnswer != englishWord) {
            answers[i]=dictionary[wrongAnswer];
            i++;
        }
        x++;
    }
    answers = shuffle(answers);

    $("#word1").text(englishWord);
    word2.text(answers[0]);
    word3.text(answers[1]);
    word4.text(answers[2]);
    word5.text(answers[3]);
}

function word1click() {
    if (playing==0) {
        startGame();
    }
}

function answerClick(wordElement) {
    attempts++;
    if (wordElement.text() == rightAnswer) {
        correctAnswer(wordElement);
    }
    else {
        wrongAnswer(wordElement);
    }
    updateScore();
}

function correctAnswer(wordElement) {
    wordElement.css('background-color', 'limegreen');
    score+=1;
    disableButtons();
    setTimeout(startNewRound, 200);
}

function wrongAnswer(wordElement) {
    wordElement.css('background-color', 'red');
    disableButtons();
    setTimeout(startNewRound, 2000);
}

function disableButtons() {
    word2.off('click');
    word3.off('click');
    word4.off('click');
    word5.off('click');
}

function updateScore() {
    $("#score").text(score+"/"+attempts+"  "+gametime.toFixed(3));
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function endGame() {
    enableButtons();
    disableButtons();
    clearInterval(intervalId);
}

var intervalId = 0;
function getDate(){
    gametime = new Date().getTime() - startTime;
    gametime = gametime/1000;

    updateScore();
    //timeoutId = setTimeout(function(){getDate()}, 25);
}
