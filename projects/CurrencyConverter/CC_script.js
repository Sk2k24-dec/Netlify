const USDURL = "https://v6.exchangerate-api.com/v6/203800820486f3e81c3f71a1/latest/USD";
const INRURL = "https://v6.exchangerate-api.com/v6/203800820486f3e81c3f71a1/latest/INR";

let covertBtn = document.querySelector(".submit");
let resultBoard = document.querySelector(".resultBoard");
let amount = document.querySelector("#input1");
let from = document.querySelector("#select1");
let to = document.querySelector("#select2");
let loading = document.querySelector(".images");

let converted_INR = 0;
let converted_USD = 0;

// getting INR and updating resultBoard
const getINR = async () => {
    let response = await fetch(USDURL);
    let data = await response.json();
    converted_INR = data.conversion_rates.INR;
    resultBoard.innerText = "";
    resultBoard.innerText = "$ "+amount.value + " = "+"₹ " + Math.floor(amount.value*converted_INR*100)/100;
    resultBoard.style.display = "flex";
    loading.style.display = "none";
};

// getting USD and updating resultBoard
const getUSD = async () => {
    let response = await fetch(INRURL);    
    let data = await response.json();
    converted_USD = data.conversion_rates.USD;
    resultBoard.innerText = "";
    resultBoard.innerText = "₹ "+amount.value + " = " +"$ "+ Math.floor(amount.value*converted_USD*100)/100;
    resultBoard.style.display = "flex";
    loading.style.display = "";
};

// auto selecting USD to INR and vice versa
from.addEventListener("click", () => {
    if (from.value === "INR") {
        to.value = "USD";
    }
    else {
        to.value = "INR";
    }
})

// submit button functionality
covertBtn.addEventListener("click", () => {
    if(amount.value ==="" || amount.value == 0){
        alert("amount cannot be 0!");
        return ;
    }
    resultBoard.style.display = "";
    loading.style.display = "inline";
    
    if (from.value === "USD" && to.value == "INR") {
        getINR();
    }
    else if (from.value === "INR" && to.value === "USD") {
        getUSD();
    }
    else {
        loading.style.display = "none";
        alert("conversion between same currency is not possible!");
        resultBoard.style.display = "none";
        amount.value = "";
        from.value = "USD";
        to.value = "INR";

    }

})