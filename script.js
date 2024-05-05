const baseurl =
  " https://v6.exchangerate-api.com/v6/c6047f9c13ec993aec125eca/latest";

let selects = document.querySelectorAll(".main select");
let cbtn = document.querySelector(".cbtn");
let amount = document.querySelector(".amount input");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let display = document.querySelector(".display p");

for (let option of selects) {
  for (currcode in countryList) {
    let nwoptn = document.createElement("option");
    nwoptn.innerText = currcode;
    nwoptn.value = currcode;
    option.append(nwoptn);
    if (option.name === "from" && currcode === "INR") {
      nwoptn.selected = "selected";
    } else if (option.name === "to" && currcode === "USD") {
      nwoptn.selected = "selected";
    }
  }
  option.addEventListener("change", (e) => {
    flag(e.target);
  });
}

let flag = (element) => {
  let currcode = element.value;
  let crtcode = countryList[currcode];
  let nwsrc = `https://flagsapi.com/${crtcode}/flat/64.png`;
  let imgs = element.parentElement.querySelector("img");
  imgs.src = nwsrc;
};

cbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amt = amount.value;
  if (amt < 0 || amt == null) {
    amount.value = 1;
    amt = 1;
  }
  console.log(fromcurr.value.toLowerCase(), tocurr.value.toLowerCase());
  let url = `${baseurl}` + `/${fromcurr.value.toLowerCase()}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  console.log(data.conversion_rates[`${tocurr.value}`]);
  let finalamt = amt * data.conversion_rates[`${tocurr.value}`];
  // console.log(url);
  display.innerText = `${amt} ${fromcurr.value} = ${finalamt} ${tocurr.value} `;
});
