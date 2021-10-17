const resetBtn = document.getElementById("reset");
const bill = document.getElementById("bill");
const numOfPeople = document.getElementById("ppl-num");
const custom = document.querySelector(".custom");
const fields = [bill, custom, numOfPeople];
const tips = Array.from(document.querySelectorAll(".tip-option"));
const tipDisplay = document.querySelector(".tip-display");
const totalDisplay = document.querySelector(".total-display");

let isCustomTip = false;
let currentTipPercent = 5;

/* ========= Event Listeners ========= */

resetBtn.addEventListener("click", reset);

/* Tip Selection*/

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    tips.forEach((tip) => {
      isCustomTip = false;
      tip.classList.remove("active-custom");
      tip.id = "";
    });
    tip.id = "selected";

    if (tip.classList.contains("custom")) {
      isCustomTip = true;
      tip.classList.add("active-custom");
      currentTipPercent = parseInt(tip.value, 10);
    } else {
      currentTipPercent = tip.innerText.substring(0, tip.innerText.length - 1);
    }

    calculateAndDisplay();
  });
});

/* Preventing Letters in Number Fields */

fields.forEach((element) => {
  element.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    }
    calculateAndDisplay();
  });
});

custom.addEventListener("input", calculateAndDisplay);

/* ========= Functions ========= */

function reset() {
  bill.value = "";
  numOfPeople.value = 3;
  custom.value = "";
  tipDisplay.innerText = "$0.00";
  totalDisplay.innerText = "$0.00";

  tips.forEach((tip) => {
    tip.id = "";
  });
  tips[0].id = "selected";
}

function calculateAndDisplay() {
  if (numOfPeople.value == "" || numOfPeople.value == 0) {
    numOfPeople.classList.add("error");
    return;
  } else {
    numOfPeople.classList.remove("error");
  }

  let billTotal = parseFloat(bill.value);
  let tipPerPerson = (billTotal / 100) * currentTipPercent;
  let totalPerPerson = (billTotal / 100) * currentTipPercent + billTotal;

  if (isNaN(billTotal) || isNaN(currentTipPercent)) {
    tipDisplay.innerText = "$0.00";
    totalDisplay.innerText = "$0.00";
  } else {
    tipDisplay.innerText = "$" + (tipPerPerson / numOfPeople.value).toFixed(2);
    totalDisplay.innerText =
      "$" + (totalPerPerson / numOfPeople.value).toFixed(2);
  }

  if (isCustomTip) {
    currentTipPercent = parseInt(custom.value);
  }
}
