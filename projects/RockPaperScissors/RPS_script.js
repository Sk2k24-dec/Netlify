let icons = document.querySelectorAll(".icons");
let resultBoard = document.querySelector(".resultBoard");
let score_of_player = document.querySelector("#scoreOfPlayer");
let score_of_computer = document.querySelector("#scoreOfComputer");
let reset = document.querySelector(".reset");
let body = document.querySelector("body");
let marquee = document.querySelector("#marquee");

let value_preset = ["rock", "paper", "scissors"];

let user_selection = "";
let computer_selection = "rock";

let user_score = 0;
let computer_score = 0;

const checker = (resultBoard) => {

    resultBoard.innerText = "";
    
    // user wins
    if ((user_selection === "rock" && computer_selection === "scissors") || (user_selection === "scissors" && computer_selection === "paper") || (user_selection === "paper" && computer_selection === "rock")) {
        user_score += 1;
        resultBoard.innerText ="You WON!";
        score_of_player.innerText = user_score;
        resultBoard.style.backgroundColor = "green";
    }
    // user looses
    else if ((user_selection === "rock" && computer_selection==="paper")||(user_selection === "paper" && computer_selection==="scissors")||(user_selection === "scissors" && computer_selection==="rock")){
        computer_score+=1;
        resultBoard.innerText ="You LOST!";
        score_of_computer.innerText = computer_score;
        resultBoard.style.backgroundColor = "red";
    }
    // draw situationo 
    else{
        resultBoard.innerText ="It is a DRAW!";
        resultBoard.style.backgroundColor = "#727D73";
    }
}



// main function
icons.forEach((icon) => {
    icon.addEventListener("click", (evt) => {
        if (evt.target.id === "img1") {
            user_selection = "rock";
        }
        else if (evt.target.id === "img2") {
            user_selection = "paper";
        }
        else if (evt.target.id === "img3") {
            user_selection = "scissors";
        }
        checker(resultBoard);
        computer_selection = value_preset[Math.trunc(Math.random() * 3)];;
    })
})

reset.addEventListener("click",()=>{
    computer_score = 0;
    user_score = 0;
    score_of_computer.innerText = 0;
    score_of_player.innerText = 0;
    resultBoard.innerText = "Hajime!";
    resultBoard.style.backgroundColor= "rgb(8, 91, 185)";
})

body.addEventListener("contextmenu",()=>{
    alert("please open this site in desktop 😭");
})

marquee.addEventListener("click",()=>{
    marquee.style.display = "none";
})