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

  function calculateTotal(type) {
    let sum = 0;
    data.allItems[type].forEach((cur) => {
      sum += cur.value;
    });
    data.totals[type] = sum;
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
    budget: 0,
    percentage: -1,
  };

  return {
    addItem(input) {
      let newItem, ID;

      //create new ID
      if (data.allItems[input.type].length > 0) {
        ID =
          data.allItems[input.type][data.allItems[input.type].length - 1].id +
          1;
      } else {
        ID = 0;
      }

      //create newItem based on exp or inc
      if (input.type === "inc") {
        newItem = new Income(ID, input.description, input.value);
      } else if (input.type === "exp") {
        newItem = new Expense(ID, input.description, input.value);
      }

      // Push it into out data structure
      data.allItems[input.type].push(newItem);

      //return it to use in outher module.
      console.log(data);
      return newItem;
    },

    deleteItem(type, id) {
      let ids, index;
      ids = data.allItems[type].map((cur) => cur.id);
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    // Calculate Budget
    calculateBudget() {
      // calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");
      // calculate budget : totalIncome - totalExpenses
      data.budget = data.totals["inc"] - data.totals["exp"];
      // caluclate percentage
      if (data.totals["inc"] > 0) {
        data.percentage = Math.round(
          (data.totals["exp"] / data.totals["inc"]) * 100
        );
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages() {
      if (data.totals["inc"] > 0) {
        let percentages = data.allItems["exp"].map((el) =>
          Math.round((el.value / data.totals["inc"]) * 100)
        );
        return percentages;
      }
    },

    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals["inc"],
        totalExp: data.totals["exp"],
        percentage: data.percentage,
      };
    },

    // Testing function
    simpleTest() {
      console.log(data);
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
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    percentagesLabel: ".item__percentage",
  };

  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType)?.value, // will be inc || exp
        description: document.querySelector(DOMstrings.inputDescription)?.value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue)?.value),
      };
    },

    // add new item to dom.
    addListItem(obj, type) {
      let html, newHtml, element;
      // make html code

      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="inc-${obj.id}">
                  <div class="item__description">${
                    obj.description[0].toUpperCase() + obj.description.slice(1)
                  }</div>
                  <div class="right clearfix">
                      <div class="item__value">+ ${obj.value}</div>
                      <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                  </div>
                </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}">
                  <div class="item__description">${
                    obj.description[0].toUpperCase() + obj.description.slice(1)
                  }</div>
                  <div class="right clearfix">
                      <div class="item__value">- ${obj.value}</div>
                      <div class="item__percentage">10%</div>
                      <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                  </div>
                </div>`;
      }
      // replace obj vale with placeholder
      /**
       * here in video use ES5 way to change value of placeholder. noticethat we change it using ES6 way( object literal)
       * newHtml = html.replace("%id%", obj.id)
       * newHtml = html.replace("%title%", obj.description)
       * newHtml = html.replace("%value%", obj.value)
       */
      // insert newHtml to our HTML file
      newHtml = html;
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml); // this method has som security problem
    },

    deleteListItem(id) {
      let element = document.querySelector("#" + id);
      console.log(element);
      element.remove();
    },
    // delete the value of input and turn focus back on first input field
    clearFields() {
      //it's return a list . list is same as array but it havnt all nice method of array.
      let fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      [...fields].forEach((current, index) => {
        current.value = "";
      });

      // make focus on description input(first input)
      fields[0].focus();
    },

    // Display Budget on UI
    displayBudget(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent =
        obj.budget > 0 ? "+" + obj.budget : obj.budget;

      document.querySelector(DOMstrings.incomeLabel).textContent =
        "+" + obj.totalInc;

      document.querySelector(DOMstrings.expensesLabel).textContent =
        "-" + obj.totalExp;

      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage > 0 ? "%" + obj.percentage : "---";
    },

    updatePercentagesUI(arr) {
      let expensesList = document.querySelector(DOMstrings.expensesContainer)
        .children;
      // console.log(expensesList);
      [...expensesList].forEach((el, index) => {
        el.querySelector(DOMstrings.percentagesLabel).textContent = arr[index];
      });
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
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keydown", (event) => {
      if (event.keyCode != 13) return;
      ctrlAddItem();
    });

    // add event delegation for delete button each item
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  }

  function updateBudget() {
    let budget;

    // 1. Calculate the Budget
    budgetCtrl.calculateBudget();
    // 2. Return the Budget
    budget = budgetCtrl.getBudget();
    // 3. Display the Budget on th UI
    UICtrl.displayBudget(budget);
  }

  function updatePercentages() {
    let percentagesArr;
    // 1. Calculate Percentages
    // ..
    // 2. Read Percentagaes from the budget controller.
    percentagesArr = budgetCtrl.calculatePercentages();
    console.log(percentagesArr);
    // 3. Update the UI with the new Percentages
    UICtrl.updatePercentagesUI(percentagesArr);
  }

  // controll add ew item
  function ctrlAddItem(params) {
    let input, newItem;

    // 1- Get the Field Input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2- Add the item to budget Controller
      newItem = budgetCtrl.addItem(input);

      // 3- Add the Item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4- Clear Fields
      UICtrl.clearFields();

      // 5- Calculate & update the Budget
      updateBudget();

      // 6- Calculate and update percentages
      updatePercentages();
    }
  }

  // Control Delete items
  function ctrlDeleteItem(event) {
    let itemID, splitID, type, ID;
    itemID = event.target.closest("div.item").id;

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. delete the Item from data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete the item from UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  }

  return {
    init() {
      console.log("Application Started!");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
