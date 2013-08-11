document.addEventListener('DOMContentLoaded', function() {


    //Animation Listeners

    var pfx = ["webkit", "moz", "MS", "o", ""];
    function PrefixedEvent(element, type, callback) {
        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) type = type.toLowerCase();
            element.addEventListener(pfx[p]+type, callback, false);
        }
    }

    PrefixedEvent(document, "AnimationStart", animStart() );
    PrefixedEvent(document, "AnimationIteration", animIter() );
    PrefixedEvent(document, "AnimationEnd", animEnd() );

    function animStart(){
        // console.log('Animation Started')
    }

    function animIter(){
        // console.log('Animation Iteration')
    }

    function animEnd(){
        // console.log(this.event)
    }

    function hideEnd(){
        PrefixedEvent(document, "AnimationEnd", function(event){
            if(event.animationName === "hide"){
                event.target.classList.remove('shown', 'hiding');
                hideBuffer = false
            }
        } );
    }

    function removePair(){
        PrefixedEvent(document, "AnimationEnd", function(event){
            if(event.animationName === "remove-card"){
                event.target.classList.add('gone');
                firstCard = null;
                secondCard = null;
            }
        } );
    }

    //Public Game variables
    var cards = document.getElementsByClassName('card');
    var cardsContent = document.getElementsByClassName('card-content');
    var nbCards = cards.length;
    var nbArray = Array();
    var introPlaying = true;
    var firstCard;
    var secondCard;
    var hideBuffer;

    // Suffling and adding content to cards
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

    shuffleArray(nbArray)
    assignElement();

    //Let's decide what happens when the user starts clicking around

    document.addEventListener('click', function(event){
        // If intro is playing, cancel it to start playing
        if(introPlaying){
            var intro = document.getElementsByClassName('intro');
            intro[0].classList.remove('intro');
            introPlaying = false;
        }
        var target = event.target;

        // if two cards are already shown, hide them
        if(firstCard && secondCard){
            firstCard.classList.add('hiding');
            secondCard.classList.add('hiding');
            hideBuffer = true;
            hideEnd();
            firstCard = null;
            secondCard = null;
        }

        if( target.classList.contains('card') && !hideBuffer){
            if(!firstCard){
                firstCard = target;
                firstCard.classList.add('shown');
            }else if(!secondCard && target !== firstCard){
                secondCard = target;
                secondCard.classList.add('shown');

                if(firstCard.firstChild.innerHTML === secondCard.firstChild.innerHTML){
                    console.log('yes');
                    firstCard.classList.add('offgame');
                    secondCard.classList.add('offgame');
                    removePair();
                }
            }

        }

    });
}, false);