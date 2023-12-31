
function handleGameWin() {
    // Store the time of winning 3/3 games in localStorage
    localStorage.setItem('winTime', new Date().getTime().toString());

    //alert('Congratulations! You\'ve won 3 times!');
    triggerWinEffect();
    // Add any other win logic here if necessary
}

function triggerWinEffect() {
    // Display the message
    let winMessage = document.createElement('div');
    winMessage.innerHTML = "YOU'RE THE BEST!!!";
    winMessage.style.position = 'fixed';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.style.fontSize = '5rem'; // Increase font size
    winMessage.style.fontWeight = 'bold'; // Set font weight to bold
    winMessage.style.color = 'gold';
    winMessage.style.textShadow = '2px 2px 4px #000000, -2px -2px 4px #000000, 2px -2px 4px #000000, -2px 2px 4px #000000'; // Text outline
    winMessage.style.animation = 'flashing 1s infinite'; // Flashing effect
    winMessage.style.zIndex = 1000;
    winMessage.style.color = 'gold';
    document.body.appendChild(winMessage);
}

function isSameDay(timestamp1, timestamp2) {
    let date1 = new Date(timestamp1);
    let date2 = new Date(timestamp2);
    
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
}
document.addEventListener("DOMContentLoaded", function() {
    // Debug button logic
    
document.getElementById('debug-button').addEventListener('click', function() {
    gamesWon++;
    document.getElementById('games-won').innerText = gamesWon + "/3";
    if (gamesWon === 3) {
        handleGameWin();
    }
});


    if(typeof explodeParticles !== "undefined") { explodeParticles(); }
    let lives = 6;
    let gamesWon = 0;
    let firstCard = null;
    let secondCard = null;
    let cardsFlipped = 0;

    checkWaitTime();
    
    

let winTime = localStorage.getItem('winTime');
let currentTime = new Date().getTime();

if (winTime && isSameDay(currentTime, parseInt(winTime))) {
    document.getElementById('game-board').innerHTML = '<p class="text-black text-xl col-span-4">You have won 3/3 games today. Wait until tomorrow to play again!</p>';
} else if (!localStorage.getItem('endTime')) {
    populateGameBoard();
} else {

    let endTime = parseInt(localStorage.getItem('endTime'));
    let currentTime = new Date().getTime();
    if (currentTime - endTime < 60000) {
        document.getElementById('game-board').innerHTML = '<p class="text-black text-xl col-span-4">You naughty, naughty! You must wait 60 seconds like a good boy!</p>';
    } else {
        populateGameBoard();
    }
}


    function flipCard(event) {
        let card = event.target;
        if (!firstCard) {
            firstCard = card;
            card.innerText = card.dataset.emoji;
        } else if (!secondCard) {
            secondCard = card;
            card.innerText = card.dataset.emoji;
            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                cardsFlipped += 2;
                firstCard = null;
                secondCard = null;
                if (cardsFlipped === 16) {
                    gamesWon++;
                    document.getElementById('games-won').innerText = gamesWon + "/3";
                    if (gamesWon === 3) {
                        
    handleGameWin();

                    } else {
                        resetGame();
                        populateGameBoard();
                    }
                }                
            } else {
                lives--;
                document.getElementById('lives').innerText = lives;
                if (lives === 0) {
                    alert('Game Over! Wait for 60 seconds to play again.');
                    gamesWon = 0;
                    document.getElementById('games-won').innerText = gamesWon;
                    
                    let endTime = new Date().getTime();
                    localStorage.setItem('endTime', endTime);
                    
                    checkWaitTime();
                } else {
                    setTimeout(() => {
                        firstCard.innerText = '';
                        secondCard.innerText = '';
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        }
    }

    function resetGame() {
        lives = 6;
        cardsFlipped = 0;
        firstCard = null;
        secondCard = null;
        document.getElementById('lives').innerText = lives;
        document.getElementById('game-board').innerHTML = '';
    }

    function checkWaitTime() {
        let endTime = localStorage.getItem('endTime');
        if (endTime) {
            let currentTime = new Date().getTime();
            let difference = currentTime - endTime;

            if (difference < 60000) {
                // Disable all card clicks
                let cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.removeEventListener('click', flipCard);
                });

                setTimeout(() => {
                    resetGame();
                    populateGameBoard();

                    let newCards = document.querySelectorAll('.card');
                    newCards.forEach(card => {
                        card.addEventListener('click', flipCard);
                    });

                    localStorage.removeItem('endTime');  // Clear the stored end time
                }, 60000 - difference);
            } else {
                localStorage.removeItem('endTime');  // If more than 60 seconds have passed, clear the stored time
            }
        }
    }

    function populateGameBoard() {
        fetch('emojis.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(emoji => {
                let card = document.createElement('div');
                card.classList.add('card', 'bg-gray-400', 'h-24', 'w-24', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'rounded');
                card.style.boxShadow = "0 40px 75px rgba(0, 0, 0, 1.5), 0 15px 30px rgba(0, 0, 0, 1)";
                card.style.zIndex = "10";
                card.style.fontSize = "2rem";
                card.dataset.emoji = emoji;
                card.addEventListener('click', flipCard);
                document.getElementById('game-board').appendChild(card);
            });
        });
    }
    
});