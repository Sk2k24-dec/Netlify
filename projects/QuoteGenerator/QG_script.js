const URL = "https://api.api-ninjas.com/v1/quotes";
let time = new Date();


const topBar = document.querySelector(".topBar");
const greetingArea = document.querySelector(".greetings");
const timeArea = document.querySelector(".time");
const quoteArea = document.querySelector(".quote");
const gen_btn = document.querySelector(".btn");

let onAuthor = false;
let author = "anonymous";



let containerColors = ["#06D001", "#B1F0F7", "#A6F6FF", "#AF8F6F", "#35A29F", "#FFCAC8", "#FFCDB2", "#E82561", "#A888B5", "#DBB5B5"];
let quoteBodyColors = ["#9BEC00", "#81BFDA", "#9EDDFF", "#C39898", "#0B666A", "#FF9E9E", "#FFB4A2", "#C30E59", "#8174A0", "#C39898"]

// fetching data from API
const getQuote = async () => {
    let response = await fetch(URL, {
        headers: {
            'X-Api-Key': "NHm8wqbSpIOqSH6QgRMI6w==vSc81bzrWw9tgAiG",
        }
    });
    let data = await response.json();
    return data;
}

// setting the topBar
const setTopBar = () => {
    let hh = time.getHours();
    let mm = time.getMinutes();
    let am_pm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12; // (debugged by AI)
    hh = hh ? hh : 12; // the hour '0' should be '12' (debugged by AI)

    if (mm >= 10) {
        timeArea.innerText = hh + " : " + mm + " " + am_pm;
    } else {
        timeArea.innerText = hh + " : 0" + mm + " " + am_pm;
    }

    if (am_pm === "AM") {
        if(hh>=5 && hh<12){
            greetingArea.innerText = "Good Morning!";
        }
        else{
            greetingArea.innerText = "Good Night!";
        }
    } else {
        if (hh === 12 && mm === 0) {
            greetingArea.innerText = "Good Noon!";
        } else if (hh < 6) {
            greetingArea.innerText = "Good Afternoon!";
        } else if (hh >= 6 && hh <= 7) {
            greetingArea.innerText = "Good Evening!";
        } else {
            greetingArea.innerText = "Good Night!";
        }
    }
};


// setting different bgColor
const bgColorChange = () => {
    let index = Math.floor((Math.floor(Math.random() * 100)) / 10); // gererating random number between 0-10;
    const body = document.querySelector(".container");
    body.style.backgroundColor = containerColors[index];
    quoteArea.style.backgroundColor = quoteBodyColors[index];
    topBar.style.backgroundColor = quoteBodyColors[index];
    gen_btn.style.backgroundColor = quoteBodyColors[index];

}


setTopBar(); // updating the topBar when reloaded;

// functionality of gerating Button
gen_btn.addEventListener("click", () => {
    const loading = document.querySelector(".loader");
    const body = document.querySelector("body");
    body.style.cursor = "wait";
    gen_btn.style.display = "none";
    loading.style.display = "flex";
    quoteArea.innerText = "Loading...";
    getQuote().then((data) => {
        loading.style.display = "none";
        gen_btn.style.display = "";
        body.style.cursor = "";
        quoteArea.innerText = data[0].quote + "\n\n - " + data[0].author;
        author = data[0].author;
        setTopBar();
        bgColorChange();
    }).catch((err) => {
        alert("Oops! Seems like the computer is not obeying 😬. Try again...");
        console.log(err);
    });
})

quoteArea.addEventListener("mouseover",(evt)=>{
    gen_btn.style.minWidth = "fit-content";
    gen_btn.style.padding = "0px 20px";
    gen_btn.innerText = "Click on author to know more";
    onAuthor = true;
    
});
quoteArea.addEventListener("click",()=>{
    if(onAuthor){
        const link = document.querySelector(".link");
        link.href = "https://www.google.co.in/search?q="+author;
    }
    else{
        console.log("this is the else condition");
    }
})
quoteArea.addEventListener("mouseout",()=>{
    gen_btn.style.padding = "";
    gen_btn.innerText = "Generate";
    onAuthor = false;
    
})



