import { ValidationError } from "webpack";

type Cards = {
    name: string,
    img: string
}

let cardArray: Cards[] = [
    {name: "Clockwork", img: "/assets/images/A Clockwork Orange.jpeg"},
    {name: "Clockwork", img: "/assets/images/A Clockwork Orange.jpeg"},
    {name: "Alice", img: "/assets/images/Alice in Wonderland.jpeg"},
    {name: "Alice", img: "/assets/images/Alice in Wonderland.jpeg"},
    {name: "Hobbit", img: "/assets/images/Hobbit.jpeg"},
    {name: "Hobbit", img: "/assets/images/Hobbit.jpeg"},
    {name: "1984", img: "/assets/images/Orwell-1984.jpeg"},
    {name: "1984", img: "/assets/images/Orwell-1984.jpeg"},
    {name: "Gatsby", img: "/assets/images/The Great Gatsby.jpeg"},
    {name: "Gatsby", img: "/assets/images/The Great Gatsby.jpeg"},
    {name: "Hound", img: "/assets/images/The Hound of the Baskervilles.jpeg"},
    {name: "Hound", img: "/assets/images/The Hound of the Baskervilles.jpeg"},
];

let moves: number = 0;
const startContainer: HTMLDivElement = document.querySelector(".start-container");
const startButton: HTMLButtonElement = document.querySelector(".start-btn");
const memoryGame: HTMLDivElement = document.querySelector(".memory-game");
const winnerContainer: HTMLDivElement = document.querySelector(".winner-container");
let winnerDisplay: HTMLSpanElement = document.querySelector(".winner-display");
const resetButton: HTMLButtonElement = document.querySelector(".reset-btn");


// function to set up the game board
const initializeGame = () => {

    // remove start container from view and display game board container
    startContainer.style.display = "none";
    memoryGame.style.display = "flex";
    memoryGame.style.backgroundColor = "#b17ca6";

    // arranging card array in random order
    cardArray.sort(() => Math.random() - 0.5);
        
    // initializing the game board
    // creating card elements and appending them to game board
    cardArray.forEach((obj) => {
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div");
        card.classList.add("card");
        front.classList.add("card-front");
        back.classList.add("card-back");

        front.src = obj.img;
        card.setAttribute("name", obj.name);
            
        memoryGame.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
       
        // Add event listener to card to listen for a click:
        // on a click, card turns by 180 degrees
        // Also on a click handleCardClick function is being called
        
        card.addEventListener("click", (e) => {
            card.classList.toggle("card-turn");
            handleCardClick(e);
        });
    });
};


// Press 'Start Game' button to start the game
startButton.addEventListener("click", initializeGame);


// Function to compare two cards

// What to do with any??? :( :( :(
// Why only shouting at me here??
const handleCardClick= (e: any) => {
    
    // "event target" property returns the element where the event occured
    let currentCard = e.target;
    currentCard.classList.add("turned");
    // define another variable to choose all elements / cards where the event occured
    let turnedCards = document.querySelectorAll(".turned");

    // compare every two turned cards by their given attribute - name
    if(turnedCards.length === 2) {
        if(turnedCards[0].getAttribute("name") === turnedCards[1].getAttribute("name")) {
            // cards match
            turnedCards.forEach(card => {
                // stop card from turning around again
                card.classList.remove("turned");
                // stop pointer event 
                card.classList.add("matched");

                // If all 12 cards have been matched, timeout removes game board and Start again button appears
                if(document.getElementsByClassName("matched").length === 12) {
                    setTimeout(() => memoryGame.style.display = "none", 3000);
                    setTimeout(() => displayWinner(), 3000);
                }
            });
    } else {
        // cards don't match
        turnedCards.forEach(card => {
            card.classList.remove("turned");
            // after 1.5s turn both cards over with their backsides visible
            setTimeout(() => card.classList.remove("card-turn"), 1500);
        });
        // add move to moves
        moves++;
        }
    }
}
    

// Display the winner message and reset button
const displayWinner = () => {
    winnerContainer.style.display= "block";

    winnerDisplay.innerHTML = `🥳 🥳  You won the game  🥳 🥳 Only ${moves} sideways moves`;

    // A click on reset button clears the game board,
    // re-starts move count and calls initializeGame function
    resetButton.addEventListener("click", function() {
        memoryGame.innerHTML = " ";
        winnerContainer.style.display= "none";
        moves = 0;

        initializeGame();

        // Remove "matched" class from all cards to be able to click and turn them again
        let cards = document.querySelectorAll(".cards");
        cardArray.forEach((obj, i) => {
            cards[i].classList.remove("matched");
        });
    });
};


