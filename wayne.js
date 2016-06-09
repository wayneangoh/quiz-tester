/* global $ */

$(function () {
  function updateDisplay () {
    if (isGameOver()) {
      $('.question').text(winner());
    } else {
      $('.question').text(questions[currentQuestion()]);
      // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
      $('.imagecontainer').prepend('<img src=' + images[currentQuestion()] + ' />');
      $('.select').eq(0).text(choices[currentQuestion()][0]);
      $('.select').eq(1).text(choices[currentQuestion()][1]);
      $('.select').eq(2).text(choices[currentQuestion()][2]);
      $('.select').eq(3).text(choices[currentQuestion()][3]);
    }
    // update player scores regardless
    $('.player1score').text(player1Score);
    $('.player2score').text(player2Score);
  }

  // the jQuery ready function will add click listeners once the dom is loaded
  // $(function () {
  $('.select').click(function () {
      // if gameover then restart else log a player turn
    if (isGameOver()) {
      restart();
    } else {
        // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
      playTurn(Number($(this).attr('id')));
      // console.log(typeof $(this).attr('id'));
    }
    updateDisplay();
  });
    // update the display for the first time
  updateDisplay();
  // });
});

var questions = new Array();
questions[0] = 'Britney Spears: "Oops!...I did it again I played with your heart, ________________ Oh baby, baby"';
questions[1] = 'Daniel Powter: "You stand in the line just to hit a new low, ___________________"';
questions[2] = 'Christina Perri: "Time stands still, ___________________"';
questions[3] = 'Aladdin: "I can show you the world, _________________"';
questions[4] = 'John Legend: "You\'re my downfall, you\'re my _____"';
questions[5] = 'Coldplay: "Tell me your secrets, __________________"';
questions[6] = 'Taylor Swift: "We are never ever ever getting back together, ______________________ But we are never ever ever ever getting back"';
questions[7] = 'Michael Jackson: "Billie Jean is not my lover, _________________, but the kid is not my son."'

var choices = new Array();
choices[0] = ['I\'m lost in this game', 'got lost in the game', 'was lost in the game', 'got lost in your name'];
choices[1] = ['You sing a sad song just to turn it around', 'You work at a smile and you go for a ride', 'You\'re faking a smile with the coffee to go', 'You might not make it back and you know'];
choices[2] = ['beauty in all she is', 'every hour has come to this', 'don\'t be afraid', 'loved you for a thousand years'];
choices[3] = ['over, sideways and under', 'shining, shimmering, splendid', 'soaring, tumbling, freewheeling', 'endless, new and horizon'];
choices[4] = ['love', 'hope', 'muse', 'blues'];
choices[5] = ['Tell me you love me', 'And ask me your questions', 'Running in circles', 'Pulling your puzzles apart'];
choices[6] = ['You go talk to your friends, talk to my friends, talk to me', 'Don\'t go talk to your friends, not to my friends, not to me', 'You go talk to your friends, talk to my friends, don\'t talk to me', 'You go talk to my friends, talk to your friends, talk to me'];
choices[7] = ['She\'s just a girl who claims that I am number one', 'She\'s just a girl who claims that I am the one', 'She is a girl who says that I am the one', 'She\'s just a girl that claims that I am the one'];


var answers = new Array();
answers[0] = 1;
answers[1] = 1;
answers[2] = 0;
answers[3] = 1;
answers[4] = 2;
answers[5] = 1;
answers[6] = 0;
answers[7] = 1;


var images = new Array();
images[0] = 'britney-spears.png'; //done
images[1] = 'daniel-powter.jpg'; //done
images[2] = 'christina-perri.jpg'; //done
images[3] = 'aladdin.jpg'; //done
images[4] = 'john-legend.jpg'; //done
images[5] = 'coldplay.jpg'; //done
images[6] = 'taylor-swift.jpg'; //done
images[7] = 'michael-jackson.jpg'; //done

var currentPlayer = 1;
var currentQn = 0;
var player1Score = 0;
var player2Score = 0;

function restart () {
  currentPlayer = 1;
  currentQn = 0;
  player1Score = 0;
  player2Score = 0;
}

function isGameOver () {
  if (whoWon() === 0) {
    return false;
  } else {
    return true;
  }
}

function whoWon () {
  if (currentQn === numberOfQuestions()) {
    if (player1Score > player2Score) return 1;
    if (player2Score > player1Score) return 2;
    if (player1Score === player2Score) return 3;
  } else return 0;
}

// // return 0 at start of the game
// // to return 1 at the end of the game
// // to return 2 at the end of the game
//

function winner() {
  if (whoWon() === 1) return "Player 1 Wins!";
  if (whoWon() === 2) return "Player 2 Wins!";
  else return "It is a tie!";
}
  

function numberOfQuestions () {
  return questions.length;
}

function currentQuestion () {
  return currentQn;
}

function numberOfAnswers () {
  return choices.length;
}

function correctAnswer () {
  // pull out the index of the correct answer based on the current question
  return answers[currentQuestion()];
}

function playTurn (choice) {
  // ### playTurn(choice)
  // It should take a single integer, which specifies which choice the current player wants to make.
  // It should return a boolean true/false if the answer is correct.
// if isgameover is false, return false so can continue playing
// check current player turn's if answer is correct and return true , if wrong return false, then if true ++ to current player's score
// switch the player. go to next qns.
  if (isGameOver() === true) {
    return false;
  }
  var correct = false;

  if (choice === answers[currentQuestion()]) {
    // console.log(typeof answers[currentQuestion()]);
    correct = true;
    if (currentQuestion() % 2) {
      player2Score++;
      currentPlayer = 1;
    } else {
      player1Score++;
      currentPlayer = 2;
    }
    ++currentQn;
    console.log(player1Score);
    return true;
  }
  if (choice !== answers[currentQuestion()]) {
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    ++currentQn;
    return false;
  }
}

//  if (isGameOver() === true) {
//    return
//  } else if (choice === answers[currentQuestion()]) {
//    console.log("correct answer")
//    // console.log(choice, answers[currentQuestion()])
//    if (currentPlayer === 1) {
//      player1Score++
//      currentPlayer = 2
//      currentQn++
//      // console.log('player 1', player1Score)
//    } else {
//      player2Score++
//      currentPlayer = 1
//      currentQn++
//    }
//      // console.log('player 2', player2Score)
//    return true
//  }
//  if (choice !== answers[currentQuestion()]) {
//    console.log("wrong answer")
//    if (currentPlayer === 1) {
//      currentPlayer = 2
//      currentQn++
//    } else {
//      if (currentPlayer === 2) {
//        currentPlayer = 1
//        currentQn++
//      }
//    } return false
//  }
// }
