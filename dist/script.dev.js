"use strict";

var resetBtn = document.getElementById("reset");
var bill = document.getElementById("bill");
var numOfPeople = document.getElementById("ppl-num");
var custom = document.querySelector(".custom");
var fields = [bill, custom, numOfPeople];
var tips = Array.from(document.querySelectorAll(".tip-option"));
var tipDisplay = document.querySelector(".tip-display");
var totalDisplay = document.querySelector(".total-display");
var isCustomTip = false;
var currentTipPercent = 5;
/* Tip Selection*/

tips.forEach(function (tip) {
  tip.addEventListener("click", function () {
    tips.forEach(function (tip) {
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
resetBtn.addEventListener("click", reset);
custom.addEventListener("input", calculateAndDisplay);
/* Preventing Letters in Number Fields */

fields.forEach(function (element) {
  element.addEventListener("input", function () {
    if (isNaN(element.value)) {
      element.value = "";
    }

    calculateAndDisplay();
  });
});
/* ========= Functions ========= */

function calculateAndDisplay() {
  var billTotal = parseFloat(bill.value);
  var tipPerPerson = billTotal / 100 * currentTipPercent;
  var totalPerPerson = billTotal / 100 * currentTipPercent + billTotal;

  if (numOfPeople.value == "" || numOfPeople.value == 0) {
    numOfPeople.classList.add("error");
    return;
  } else {
    numOfPeople.classList.remove("error");
  }

  if (isNaN(billTotal) || isNaN(currentTipPercent)) {
    tipDisplay.innerText = "$0.00";
    totalDisplay.innerText = "$0.00";
  } else {
    tipDisplay.innerText = "$" + (tipPerPerson / numOfPeople.value).toFixed(2);
    totalDisplay.innerText = "$" + (totalPerPerson / numOfPeople.value).toFixed(2);
  }

  if (isCustomTip) {
    currentTipPercent = parseInt(custom.value);
  }
}

function reset() {
  bill.value = "";
  numOfPeople.value = 3;
  custom.value = "";
  tipDisplay.innerText = "$0.00";
  totalDisplay.innerText = "$0.00";
  numOfPeople.classList.remove("error");
  tips.forEach(function (tip) {
    tip.id = "";
  });
  tips[0].id = "selected";
}