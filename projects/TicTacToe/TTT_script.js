let turn0 = false;
let winnerFound = false;

let boxes = document.querySelectorAll(".boxes");
let reset = document.querySelector(".reset");
let newGame = document.createElement("button");
let extraButtons = document.querySelector(".extra_buttons");
let winnerBanner = document.querySelector(".winnerBanner");

let winSeq = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

const resetGameState = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.border = "";
    });
    turn0 = false;
    winnerFound = false;
    winnerBanner.style.display = "none";
    reset.style.display = "inline";
};

const resetFunc = () => {
    resetGameState();
};

const winFunc = (symbolAtBox1) => {
    winnerBanner.style.display = "flex";
    winnerBanner.innerText = "Winner " + symbolAtBox1;
    winnerBanner.style.alignItems = "center";
    boxes.forEach((box) => {
        box.disabled = true;
    });
    reset.style.display = "none";
    newGame.innerText = "New Game";
    extraButtons.prepend(newGame);
    newGame.classList.add("newGame");
    newGame.addEventListener("click", () => {
        newGame.remove();
        resetGameState();
    });
};

const checker = () => {
    for (let pattern of winSeq) {
        let symbolAtBox1 = boxes[pattern[0] - 1].innerText;
        let symbolAtBox2 = boxes[pattern[1] - 1].innerText;
        let symbolAtBox3 = boxes[pattern[2] - 1].innerText;

        if (symbolAtBox1 != "" && symbolAtBox2 != "" && symbolAtBox3 != "") {
            if (symbolAtBox1 === symbolAtBox2 && symbolAtBox2 === symbolAtBox3) {
                boxes[pattern[0] - 1].style.border = "3px solid green";
                boxes[pattern[1] - 1].style.border = "3px solid green";
                boxes[pattern[2] - 1].style.border = "3px solid green";
                winnerFound = true;
                winFunc(symbolAtBox1);
            }
        }
    }
};

document.querySelector("html").addEventListener("contextmenu",()=>{
    alert("created by - sk2k25");
})

const allButtonDisabledChecker = (boxes) => {
    for (let box of boxes) {
        if (box.disabled === false) {
            return false;
        }
    }
    return true;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.disabled = true;
            turn0 = false;
        } else {
            box.innerText = "X";
            box.disabled = true;
            turn0 = true;
        }
        checker();
        if (allButtonDisabledChecker(boxes) && winnerFound==false) {
            winnerBanner.style.display = "flex";
            winnerBanner.innerText = "Game Draw";
            boxes.forEach((box)=>{
                box.style.border = "2px solid red";
            })
        }
    });
});

reset.addEventListener("click", resetFunc);
