$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'WHO DIED IN ENDGAME? LIKE REALLY DIED?',
        q2: 'Captain America’s shield is made of?',
        q3: 'True or false: Stan Lee has had cameos in all Marvel Cinematic Universe movies to date.',
        q4: 'What is the name of Tony Stark’s personal butler?',
        q5: 'What is the name of Tony Stark’s personal secretary?',
        q6: 'Who is the director of S.H.I.E.L.D. and the developer of the Avengers’ Initiative?',
        q7: 'In “Captain America: Civil War”, who rules Wakanda?'
    },

    options: {
        q1: ['Black-Widow', 'Iron-Man', 'Thanos', 'Loki'],
        q2: ['vibranium', 'adamantium', 'kryptonite', 'chrome'],
        q3: ['True', 'False'],
        q4: ['Jeeves', 'Jarvis', 'Alfred', 'Jennings'],
        q5: ['Peggy Carter', 'Pepper Potts', 'Phil Coulson', 'Sam Wilson'],
        q6: ['Nick Fury', 'Tony Stark', 'Captain America', 'Thor'],
        q7: ['Hydra', 'Steve Rodgers', 'Black Panther', 'Winter Soldier']
    },

    answers: {
        q1: 'Iron-Man',
        q2: 'vibranium',
        q3: 'True',
        q4: 'Javris',
        q5: 'Pepper Potts',
        q6: 'Nick Fury',
        q7: 'Black Panther'
    },

    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();

    },
    nextQuestion: function () {

        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },
    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            $('#game').hide();

            $('#start').show();
        }

    },
    guessChecker: function () {

        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },
    guessResult: function () {

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}