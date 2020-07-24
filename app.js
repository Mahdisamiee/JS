/**
 * Budget Controller
 */
let budgetController = (function () {})();

/**
 * UI Controller
 */
let UIController = (function () {
  //here is for have all DOM. if DOM will be changed we can change Dom just by this place and didnt need to change it in the all of code.
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
  };

  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType)?.value, // will be inc || exp
        description: document.querySelector(DOMstrings.inputDescription)?.value,
        value: document.querySelector(DOMstrings.inputValue)?.value,
      };
    },
    getDom() {
      return DOMstrings;
    },
  };
})();

/**
 * Controller
 */
let controller = (function (budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDom();

  function ctrlAddItem(params) {
    // 1- Get the Field Input data
    let input = UICtrl.getInput();
    console.log("input :>> ", input);
    // 2- Add the item to budget Controller

    // 3- Add the Item to UI

    // 4- Calculate the Budget

    // 5- Display the Budget on the UI
  }

  //**add event for ctrlAddItem function
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
  document.addEventListener("keydown", (event) => {
    if (event.keyCode != 13) return;
    ctrlAddItem();
  });
})(budgetController, UIController);
