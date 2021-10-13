const resetBtn = document.getElementById("reset");
const bill = document.getElementById("bill");
const numOfPeople = document.getElementById("ppl-num");
const custom = document.getElementById("custom");



/* ========= Event Listeners ========= */

resetBtn.addEventListener("click", reset);

/* Preventing Letters in Number Fields */

bill &&
  numOfPeople &&
  custom.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    }
  });

/* ========= Functions ========= */

function reset() {
  bill.value = "";
  numOfPeople.value = "";
  custom.value = "";
}
