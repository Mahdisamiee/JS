/**
 * Budget Controller
 */
let budgetController = (function () {
  function Expense(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  function Income(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  let data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    somfunc(input) {
      if (input.type === "inc") {
        let incObj = new Income(
          data.allItems.inc.length + 1,
          input.description,
          input.value
        );
        data.allItems.inc.push(incObj);
      } else {
        // do it for Expense Object
      }
      console.log(data.allItems);
    },
  };
})();

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
  function setupEventListener() {
    let DOM = UICtrl.getDom();
    //**add event for ctrlAddItem function
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
    document.addEventListener("keydown", (event) => {
      if (event.keyCode != 13) return;
      ctrlAddItem();
    });
  }

  function ctrlAddItem(params) {
    // 1- Get the Field Input data
    let input = UICtrl.getInput();

    // 2- Add the item to budget Controller
    Object.keys(input).map((el) => {
      if (input[el].trim == "") {
        // retrun error
        return;
      }
    });
    budgetCtrl.somfunc(input);
    // 3- Add the Item to UI

    // 4- Calculate the Budget

    // 5- Display the Budget on the UI
  }

  return {
    init() {
      console.log("Application Started!");
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
