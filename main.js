/* First section */
const budgetError = document.querySelector(".budget-error");
const budgetForm = document.querySelector(".budget-form");
const fieldBudget = document.querySelector(".field.budget-input");
const totaleBudget = document.querySelector(".total-budget .amount-number");
const totaleExpense = document.querySelector(".expenses .amount-number");
const balance = document.querySelector(".balance .amount-number");
let total = 0;
let prices = 0;
let arrPrices = [];
/* second section */
const expenseErr = document.querySelector(".expense-error");
const expenseName = document.querySelector(".expense-name");
const expensePrice = document.querySelector(".expense-input");
const expenseForm = document.querySelector(".expense-form");
const showInfo = document.querySelector(".expense-container .info");

function getBudget() {
  const theBudget = fieldBudget.value;
  if (theBudget == "" || isNaN(parseFloat(theBudget))) {
    budgetError.classList.remove("hide");
    setTimeout(function () {
      budgetError.classList.add("hide");
    }, 3000);
    fieldBudget.value = "";
  } else {
    totaleBudget.textContent = theBudget;
    balance.textContent = theBudget;
    total = parseFloat(theBudget);
    fieldBudget.value = "";
  }
  return;
}

function addItem() {
  if (expensePrice.value == "" || expenseName.value == "" || isNaN(parseFloat(expensePrice.value))) {
    expenseErr.classList.remove("hide");
    setTimeout(function() {
      expenseErr.classList.add("hide");
    }, 3000);
    expensePrice.value = "";
    return;
  }
  /* ============================ */
  let div = document.createElement("div");
  div.setAttribute("class", "all-values");
  let iName = document.createElement("p");
  let tName = document.createTextNode(expenseName.value)
  iName.appendChild(tName);
  div.appendChild(iName);
  let iPrice = document.createElement("p");
  let tPrice = document.createTextNode(expensePrice.value)
  iPrice.appendChild(tPrice);
  div.appendChild(iPrice);
  let buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");
  div.appendChild(buttons);
  let editE = document.createElement("button");
  editE.setAttribute("class", "edit-exense");
  let pen = document.createElement("i");
  pen.setAttribute("class", "fa-solid fa-pen-to-square");
  editE.appendChild(pen);
  buttons.appendChild(editE);
  let removeE = document.createElement("button");
  editE.setAttribute("class", "remove-expense");
  let trash = document.createElement("i");
  trash.setAttribute("class", "fa-solid fa-trash");
  removeE.appendChild(trash);
  buttons.appendChild(removeE);


  // div.innerHTML = `
  //    <p>${expenseName.value}</p>
  //    <p>$${expensePrice.value}</p>
  //    <div class="buttons">
  //      <button class="edit-exense">
  //          <i class="fa-solid fa-pen-to-square"></i>
  //      </button>
  //      <button data-price="${expensePrice.value}" class="remove-expense">
  //          <i class="fa-solid fa-trash"></i>
  //      </button>
  //    </div>
  //   `;


    showInfo.appendChild(div);
  /*==================================*/
  arrPrices.push(parseFloat(expensePrice.value));
  expenseName.value = "";
  expensePrice.value = "";
  updateNums();
  pen.addEventListener("click", function(e) {
    editItem(e);
  });
  trash.addEventListener("click", function(e) {
    deleteItem(e);
  });
}

function updateNums() {
  let all = 0;
  if (arrPrices.length > 0) {
    for (let i = 0; i < arrPrices.length; i++) {
      all += arrPrices[i];
    }
  }
  totaleExpense.textContent = all;
  balance.textContent = parseFloat(totaleBudget.textContent) - all;
}

function deleteItem(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}

function editItem(e) {
  let currItemPrice = e.target.parentElement.parentElement.previousElementSibling.textContent;
  if (currItemPrice[0] == "$") {
    currItemPrice = parseFloat(currItemPrice.split("").splice(1).join(""));
  } else {
    currItemPrice = parseFloat(currItemPrice);
  }
  arrPrices = arrPrices.filter(item => {
    return item != currItemPrice;
  });
  e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent =
  prompt("Edit item name", e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent);
  e.target.parentElement.parentElement.previousElementSibling.textContent =
  prompt("Edit itemprice", e.target.parentElement.parentElement.previousElementSibling.textContent);
  let newPriceItem = e.target.parentElement.parentElement.previousElementSibling.textContent
  newPriceItem = parseFloat(newPriceItem);
  console.log(newPriceItem)
  arrPrices.push(newPriceItem);
  updateNums();
}

/* Handle events */
budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getBudget();
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addItem();
});




