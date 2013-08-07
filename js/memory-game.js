document.addEventListener('DOMContentLoaded', function() {

    var promptMessage;

    document.addEventListener("webkitAnimationEnd", function(event){
            animation = event.animationName;
            if(animation === "content-hide"){
                
                
                if(firstCard && secondCard){
                    firstCard.classList.remove('shown', 'hiding','patch');
                    secondCard.classList.remove('shown', 'hiding','patch');
                    
                    firstCard = null;
                    secondCard = null;
                }
                
            }else if(animation === "message-1"){
                promptMessage.classList.remove('prompt-show');
            }
        });

    document.addEventListener("webkitAnimationStart", function(event){
            if(event.animationName === "content-hide"){
                
                
                if(firstCard && secondCard){
                    firstCard.classList.add('shown', 'hiding', 'patch');
                    secondCard.classList.add('shown', 'hiding', 'patch');
                    
                }
                
            }
        })

    var cards = document.getElementsByClassName('card');
    var cardsContent = document.getElementsByClassName('card-content');
    var nbCards = cards.length;
    var nbArray = Array();
    var firstCard;
    var secondCard;

    for (var i = 1; i <= (nbCards+1)/2; i++) {
        nbArray.push(i);
        nbArray.push(i);
    };

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function assignElement(){
        for (var i = 0; i < cards.length; i++) {
            cardsContent[i].innerHTML = nbArray[i];
        };  
    }

    function resumeGame(){
        firstCard = null;
        secondCard = null;
    }

    function showMessage(prompt, gameOver){
        promptMessage = document.getElementsByClassName(prompt);
        promptMessage = promptMessage[0];
        promptMessage.classList.add('prompt-show');

        firstCard.addEventListener("webkitAnimationEnd", function(){
            this.classList.add('gone');
        }, false);

        secondCard.addEventListener("webkitAnimationEnd", function(){
            this.classList.add('gone');
        }, false);
        if(gameOver){
            promptMessage = document.getElementsByClassName(gameOver);
            promptMessage = promptMessage[0];
            promptMessage.classList.remove('prompt-show');
        }
    }

    shuffleArray(nbArray)
    assignElement();

    document.onclick = function(event) {
        var el = event.target;
        var offgameCards = document.getElementsByClassName('offgame');
        
        if(el.classList.contains('card')){
            if(!firstCard){
                firstCard = el;
                firstCard.classList.add('shown');
            }else if (!secondCard && el !== firstCard){
                secondCard = el;
                secondCard.classList.add('shown');
                if(firstCard.firstChild.innerHTML === secondCard.firstChild.innerHTML){
                    // alert('yey!');
                    showMessage('match-found');

                    firstCard.classList.add('offgame');
                    secondCard.classList.add('offgame');

                    resumeGame();
                    if( offgameCards.length === cards.length){
                        // alert('Thanks for playing');
                        showMessage('game-over', 'match-found');
                    }
                }
            }else{
                
                firstCard.classList.add('hiding');
                secondCard.classList.add('hiding');

                // clearCards();
                

            }
        }else{
            if (firstCard && secondCard){
                
                firstCard.classList.add('hiding');
                secondCard.classList.add('hiding');

                // clearCards();
            
            }
        }
        // console.log(firstCard);
        // console.log(secondCard);
    };
    
    // console.log(cards);
    console.log(promptMessage);
}, false);