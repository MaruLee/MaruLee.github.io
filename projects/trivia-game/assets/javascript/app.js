
var intervalId;
var timeRemaining = 30;
var timeOut;
var gameState = {
    currentQuestion: -1,
    rightCount: 0,
    wrongCount: 0,
    unansweredCount: 0,
};

var questionSet = [
    {Q: "“You are already dead (Omae wa Mou Shindeiru).”", A: "A3", EX: "Kenshirou states this to an overconfident opponent who thinks they have won the fight.", A1: "Naruto", A2: "Dragon Ball Z", A3: "Fist of the North Star", A4: "Hajime no Ippo", GIF: "https://myanimelist.cdn-dena.com/s/common/uploaded_files/1458019530-0f3dad729447c9a57f9d45b711638148.gif"},
    {Q: "“May all your bacon burn.”", A: "A3", EX: "Calcifer states this as Howl cooks eggs and bacon on him, wounding his pride as a fire demon.", A1: "Totoro", A2: "Spirited Away", A3: "Howl's Moving Castle", A4: "Kimi no Na Wa", GIF:"https://myanimelist.cdn-dena.com/s/common/uploaded_files/1457926059-04f4b457b99c4f129fd6d0163ab7a17c.gif"},
    {Q: "“Bang.”", A: "A3", EX: "Spike Spiegel's line for the series finale to close to the show.", A1: "Baccano!", A2: "Joker Game", A3: "Cowboy Bebop", A4: "Trigun", GIF: "https://myanimelist.cdn-dena.com/s/common/uploaded_files/1458015267-5b32b7af55f5811f6174852480c8c7aa.gif"},
    {Q: "“Stand up and walk. Keep moving forward. You’ve got two good legs so get up and use them. You’re strong enough to make your own path.”", A: "A3", EX: "Edward Elric stated this to Rose after shattering her faith in the Church of Leto.", A1: "My Hero Acadmeia", A2: "Attack on Titan", A3: "Full Metal Alchemist", A4: "Code Geass", GIF: "https://image.myanimelist.net/ui/BQM6jEZ-UJLgGUuvrNkYUFHcNu7xhok-K4KSraCxQC-PtAcsxNYx9kXVqSLj_6GXZQAJDjiKSHqZR3YtE8ltCg"},
    {Q: "“You’ve just activated my trap card.”", A: "A3", EX: "Yugi Moto uses this catchphrase, usually signifying the tables have turned during a duel.", A1: "Vanguard", A2: "Duel Masters", A3: "Yu gi Oh", A4: "Pokemon", GIF: "https://media1.tenor.com/images/fb776106e34814dd62ce24a7442ce7b6/tenor.gif?itemid=5159766"},
    {Q: "“I am here.”", A: "A3", EX: "This phrase is used by All Might to put people who are in danger at ease.", A1: "One Piece", A2: "Naruto", A3: "My Hero Academia", A4: "Tengen Toppa Gurren Lagann", GIF: "https://media1.tenor.com/images/fb27a3509ae5ae1a401f89838a0b0438/tenor.gif?itemid=10138731"},
    {Q: "“I’ll take a chip...and eat it!”", A: "A3", EX: "Light Yagami once said this as he outwits the police who are trying to capture him.", A1: "Food Wars", A2: "Himouto Umaru-chan", A3: "Death Note", A4: "Monster", GIF: "https://i.imgur.com/HUd6Al1.gif"},
    {Q: "“In the Name of the Moon, I shall punish you!”", A: "A3", EX: "Catchphrase used by Princess Serenity/Usagi's alter ego before she engages an enemy.", A1: "Puella Magi Madoka Magica", A2: "Full Moon wo Sagashite", A3: "Sailor Moon", A4: "Card captor Sakura", GIF: "https://media2.giphy.com/media/gTTI9wUmVj6Uw/giphy.webp?cid=3640f6095c6a7a8f6e5a6d563648367d"},
    {Q: "“Believe in ME! Believe in the Kamina who believes in you!”", A: "A1", EX: "An important line used by Kamina to impart self confidence to his friend, Simon", A1: "Tengen Toppa Gurren Lagann", A2: "Gundam", A3: "Code Geass", A4: "Naruto", GIF: "https://gifimage.net/wp-content/uploads/2018/11/gurren-lagann-believe-in-me-who-believes-in-you-gif-1.gif"},
    {Q: "“I am the Bone of my Sword.”", A: "A3", EX: "Archer's catchphrase when he activates his combat skills", A1: "Fate/stay night", A2: "Fate/Zero", A3: "Fate/stay night: Unlimited Blade Works", A4: "Fate/stay night: Heaven's Feel", GIF: "https://steamusercontent-a.akamaihd.net/ugc/108480551723970323/C5948761A9DF11DFA2B8B8D6EB7E3245C3E76D6A/"},
];


function displayQuestionSet() {
    gameState.currentQuestion++;

    if (gameState.currentQuestion >= questionSet.length) {

        clearInterval(intervalId);
        $('.time-remaining').remove();

        var $gameOver = $('<h3>');
        $gameOver.addClass('text');
        $('.content').append($gameOver);
        $('.text').text("Game Over");

        var $rightCount = $('<h3>');
        $rightCount.addClass('score');
        $rightCount.attr('id', 'right-count');
        $('.content').append($rightCount);
        $('#right-count').text("Correct Guesses: " + gameState.rightCount);

        var $wrongCount = $('<h3>');
        $wrongCount.addClass('score');
        $wrongCount.attr('id', 'wrong-count');
        $('.content').append($wrongCount);
        $('#wrong-count').text("Inorrect Guesses: " + gameState.wrongCount);

        var $unansweredCount = $('<h3>');
        $unansweredCount.addClass('score');
        $unansweredCount.attr('id', 'unanswered-count');
        $('.content').append($unansweredCount);
        $('#unanswered-count').text("Unanswered: " + gameState.unansweredCount);

        var $restart = $('<button>');
        $restart.addClass('restart-button');
        $('.content').append($restart);
        $('.restart-button').text("Restart Game");
        $('.restart-button').on('click', function() {
            location.reload();
        });
    }

    else {
        var $question = $('<h3>');
        $question.attr('id', 'question');
        $('.content').append($question);
        $('#question').text(questionSet[gameState.currentQuestion].Q);

        var $answerOption1 = $('<h3>');
        $answerOption1.addClass('answer-option');
        $answerOption1.attr('id', 'A1');
        $('.content').append($answerOption1);
        $('#A1').text(questionSet[gameState.currentQuestion].A1);

        var $answerOption2 = $('<h3>');
        $answerOption2.addClass('answer-option');
        $answerOption2.attr('id', 'A2');
        $('.content').append($answerOption2);
        $('#A2').text(questionSet[gameState.currentQuestion].A2);

        var $answerOption3 = $('<h3>');
        $answerOption3.addClass('answer-option');
        $answerOption3.attr('id', 'A3');
        $('.content').append($answerOption3);
        $('#A3').text(questionSet[gameState.currentQuestion].A3);

        var $answerOption4 = $('<h3>');
        $answerOption4.addClass('answer-option');
        $answerOption4.attr('id', 'A4');
        $('.content').append($answerOption4);
        $('#A4').text(questionSet[gameState.currentQuestion].A4);
    }
}

function startButton() {
    var $startButton = $('<input type=button value="start">');
    $startButton.addClass('start-button');
    $('.content').append($startButton);
}

function displayTimer() {
    var $timeRemaining = $('<h3>');
    $timeRemaining.addClass('time-remaining');
    $('.content').append($timeRemaining);
    $('.time-remaining').text("Time Remaining: " + 30);
}

function displayAnswer() {
    var $answer = $('<h3>');
    $answer.addClass('answer');
    $('.content').append($answer);
    $('.answer').text(questionSet[gameState.currentQuestion].EX);    
}

function unansweredText() {
    var $unanswered = $('<h3>');
    $unanswered.addClass('unanswered-text');
    $('.content').append($unanswered);
    $('.unanswered-text').text("Time's Up!");
}

function correctText() {
    var $correct = $('<h3>');
    $correct.addClass('correct-text');
    $('.content').append($correct);
    $('.correct-text').text("That's Right!");
}

function incorrectText() {
    var $incorrect = $('<h3>');
    $incorrect.addClass('incorrect-text');
    $('.content').append($incorrect);
    $('.incorrect-text').text("That's Wrong...");
}

function gif(){
    var $gif = $('<div>');
    $gif.addClass('gif');
    $('.content').append($gif);
    $('.gif').html("<img src='" + questionSet[gameState.currentQuestion].GIF + "' alt='answer gif'>");
}

function contentTimeout() {
    timeOut = setTimeout (function() {fiveSeconds();}, 5000);

    function fiveSeconds() {
        $('#question').remove();
        $('.answer').remove();
        $('.unanswered-text').remove();
        $('.incorrect-text').remove();
        $('.correct-text').remove();
        $('.time-remaining').remove();
        $('.gif').remove();
        timerCountdown();
        displayQuestionSet();
    }
}

function timerCountdown() {
    displayTimer();
    timeRemaining = 30;
    intervalId = setInterval(count, 1000);
    function count() {
        timeRemaining--;
        $('.time-remaining').text("Time Remaining: " + timeRemaining);

        if (timeRemaining == 0) {
            clearInterval(intervalId);

            $('.answer-option').remove();
            unansweredText();
            displayAnswer();
            gif();
            gameState.unansweredCount++;
            console.log(gameState.unansweredCount);

            contentTimeout();
        }
    }  
}


startButton();

$('.start-button').click (function() {
    $('.start-button').remove();   
    timerCountdown();
    displayQuestionSet();
});

$(document).on('click', '.answer-option', function() {
    
    var userGuess = $(this).attr('id');
    console.log(userGuess);

    if (userGuess == questionSet[gameState.currentQuestion].A) {
        clearInterval(intervalId);
        
        $('.answer-option').remove();
        correctText();
        displayAnswer();
        gif();
        gameState.rightCount++;
        console.log(gameState.rightCount);

        contentTimeout();
    }
    else {
        clearInterval(intervalId);

        $('.answer-option').remove();
        incorrectText();
        displayAnswer();
        gif();
        gameState.wrongCount++;
        console.log(gameState.wrongCount);

        contentTimeout();
    }
});