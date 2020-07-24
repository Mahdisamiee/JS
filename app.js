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
      return newItem;
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
  };

  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType)?.value, // will be inc || exp
        description: document.querySelector(DOMstrings.inputDescription)?.value,
        value: document.querySelector(DOMstrings.inputValue)?.value,
      };
    },

    addListItem(obj, type) {
      let html, newHtml, element;
      // make html code

      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="income-${obj.id}">
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
        html = `<div class="item clearfix" id="expense-${obj.id}">
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
    let input, newItem;

    // 1- Get the Field Input data
    input = UICtrl.getInput();

    // 2- Add the item to budget Controller
    Object.keys(input).map((el) => {
      //this part is for chck to our filed be filled.
      if (input[el].trim == "") {
        // retrun error
        return;
      }
    });
    newItem = budgetCtrl.addItem(input);
    // 3- Add the Item to UI
    UICtrl.addListItem(newItem, input.type);

    // 4- Clear Fields
    UICtrl.clearFields();
    // 5- Calculate the Budget

    // 6- Display the Budget on the UI
  }

  return {
    init() {
      console.log("Application Started!");
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
