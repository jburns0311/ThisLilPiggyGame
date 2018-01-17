/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

/*Total Score for Player*/
initGame();


/*Event Handler (use mdn event reference) a function that is called by the event listener. An anonymous function would just exist as function a nd then put in the inputs*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

        //1randow number generation
       var dice = Math.floor(Math.random() * 6) + 1;

        //2Display the result
        //Here we are selecting the dice class
        var diceDOM = document.querySelector('.dice');

        //We are making the image display, using the number generated value as part of the png file name
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        else {
            nextPlayer();
        }
    }
});

//So we are designing a event handler for the button hold when we click it to add to the global score
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add Current SCORE to GLOBAL SCORE
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if Player Won the Game
        if (scores[activePlayer] >= 100)
            {
                document.querySelector('#name-' + activePlayer).textContent = 'winner!';
                document.querySelector('.dice').style.display = 'none';
                //toggle the winner text for the game 
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                //Here we are removing the toggle once the game has been won
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            }
        else {
        //Switch Turns
        nextPlayer();
        }
    }
});

function nextPlayer(){
    
        //next player logic if a one is rolled and set score to 0
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        //Setting the current score to 0 if a one is rolled
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        //Removes or add the active player based on existing notation
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    
    gamePlaying = true;
    
        /*Here is how we change the display styling to none
        We are using this to start the game with no dice displayed
        */
        document.querySelector('.dice').style.display = 'none';

        /*Here is how we can get elements by id's but it only works for id's but is quick.
        Here we are seeting the main scores and current all to 0*/
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');

        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('winner');
        


};



/*what do we need for the dice, how to generate randoms*/
//dice = Math.floor(Math.random() * 6) + 1;

/*logging the result to the console*/

/*how we can choose the object we want the result to be printed to
Here we are just choosing the text content, but we can also change the style
*/
//document.querySelector('#score-0').textContent = dice;
