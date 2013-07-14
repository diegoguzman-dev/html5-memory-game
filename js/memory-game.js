document.addEventListener('DOMContentLoaded', function() {

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

    function clearCards(card){
        // card.addEventListener("animationend", function(){
        //     this.classList.remove('shown', 'hiding');
        
        //     card = null;
        
        // });
        // card.addEventListener("webkitAnimationEnd", function(){
        //     this.classList.remove('shown', 'hiding');
        
        //     card = null;
        
        // });

        // secondCard.addEventListener("animationend", function(){
        //     this.classList.remove('shown', 'hiding');
            
        //     secondCard = null;
        // });
        // secondCard.addEventListener("webkitAnimationEnd", function(){
        //     this.classList.remove('shown', 'hiding');
            
        //     secondCard = null;
        // });
        firstCard.classList.remove('shown', 'hiding');
        secondCard.classList.remove('shown', 'hiding');
        firstCard = null;
        secondCard = null;
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
                    alert('yey!');

                    firstCard.classList.add('offgame');
                    secondCard.classList.add('offgame');

                    clearCards();
                    if( offgameCards.length === cards.length){
                        alert('Thanks for playing');
                    }
                }
            }else{
                
                firstCard.classList.add('hiding');
                secondCard.classList.add('hiding');

                clearCards(firstCard);
                clearCards(secondCard);

            }
        }else{
            if (firstCard && secondCard){
                
                firstCard.classList.add('hiding');
                secondCard.classList.add('hiding');

                clearCards(firstCard);
                clearCards(secondCard);
            }
        }
        console.log(firstCard);
        console.log(secondCard);
    };
    
    console.log(cards);
}, false);