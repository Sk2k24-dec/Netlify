let URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


let banner = document.querySelector(".banner");
let input = document.querySelector(".input");
let searchBtn = document.querySelector(".btn");
let resultBoard = document.querySelector(".resultBoard");
let img = document.querySelector(".img");
let results = document.querySelectorAll(".result");
let resultsDiv = document.querySelector(".results");
let btnMore = document.querySelector(".more");
let link = document.querySelector(".link");
let translateBtn = document.querySelector(".translateBtn");
let lmbD = false;
let data;

const search = async (inputValue) => {
    try {
        let response = await fetch(URL + inputValue);
        data = await response.json();
    } catch (err) {
        console.log("Invalid API URL or API discontinued " + err);
        alert("Ops... Try again!");
        return;
    }
}



const display = () => {
    resultBoard.style.filter = "blur(0px)";
    img.style.display = "none";
    resultsDiv.style.display = "flex";
    for (let item of results) {
        item.style.display = "flex";
    }
    results[0].innerText = "Word : " + input.value.toUpperCase();
    results[1].innerText = "Part Of Speech : " + data[0].meanings[0].partOfSpeech;
    results[2].innerText = "Definition: " + data[0].meanings[0].definitions[0].definition;
    if(data[0].meanings[0].definitions[0].example){
        results[3].innerText = "Example : " + data[0].meanings[0].definitions[0].example;
    }
    else{
        results[3].innerText = "";
    }
    
}
banner.addEventListener("click",()=>{
    banner.style.display = "none";
})

input.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        if(input.value === "" || input.value >=0||input.value<0){
            alert("Numbers and Empty string is not allowed");
            return;
        } 
        resultBoard.style.filter = "blur(0px)";
        resultsDiv.style.display = "none";
        img.style.display = "flex";
        search(input.value).then(() => {
            if(data.title === "No Definitions Found"){
                img.style.display = "none";
                resultsDiv.style.display = "flex";
                input.innerText ="innertest";
                alert(input.value + " ! Did you just made this up?! 😒");
                resultsDiv.style.display = "none";
                return;
            }
            else{
                
                display();
            }
            
        })
        
    }
    
});


searchBtn.addEventListener("mousedown",()=>{
    lmbD = true;
    searchBtn.style.boxShadow = "3px 2px 0px ";
})
searchBtn.addEventListener("mouseup",()=>{
    searchBtn.style.boxShadow = "5px 3px 0px";
    lmbD = false;
})


translateBtn.addEventListener("click", () => {
    if(input.value === "" || input.value >=0||input.value<0){
        alert("Enter some words to translate");
        return;
    }
    else{
        translateBtn.href = "https://translate.google.co.in/?sl=auto&tl=bn&text="+input.value+"&op=translate";
        input.value = "";
    }
    
})

btnMore.addEventListener("click",()=>{
    if(input.value === "" || input.value >=0 || input.value <0){
        alert("Enter something to search");
        link.href = "https://www.google.com";
        return;
    }
    link.href = "https://www.google.co.in/search?q="+input.value+"+meaning";
})

