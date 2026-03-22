const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".selector select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector("form input");
let amtval = amount.value;

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , async (evt)=> {
    evt.preventDefault();
    if(amtval === "" || amtval < 0){
        amtval = 1;
        amount.value = "1";
    }
    const fromURL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(fromURL);
    let data =  await response.json();
    let fromC = fromCurr.value.toLowerCase();
    let toC = toCurr.value.toLowerCase();
    let rate = data[fromC][toC];
    console.log(rate);
    const res = rate*amount.value;
    const ans = res.toFixed(2);
    
    msg.innerText = `${amount.value} ${fromCurr.value} = ${ans} ${toCurr.value}`;

})