const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


let i = 0;

for(let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList(currCode);
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let antval = amount.value;
    if(antval === "" || antval < 1) {
        antval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data(toCurr.value.toLowerCase());
    
    let finalAmount = antval * rate;
    msg.innerText = `${antval} ${fromCurr} = ${finalAmount} ${toCurr.value}`
}


window.addEventListener("load", () => {
    updateExchangeRate();
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
}) 
