
function handleGameWin() {
    alert('Congratulations! You\'ve won 3 times!');
    // Add any other win logic here if necessary
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
    
    
if (!localStorage.getItem('endTime')) {
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