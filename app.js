// BUDGET CONTROLLER
var budgetController = (function() {

  /* Some Code; need a data model for expenses and incomes here: You know that each new item
  will have description and a value. You also know that you need to distinguish between
  income and expenses (a unique ID) - to store the data, you want to create an object
  that has a description, value and an ID. What do you do when you want to create lots
  of objects? You create function constructors, which can be used to instatiate lots of
  expense and income objects - so you create a custom data-type for income and expenses. */
  var Expense = function(id, description, value) { // Function constructors start with capitals, remember?
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      // create a unique number to assign to each new expense or income item
      if (data.allItems[type].length > 0) {
        ID = 0; data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create a new item based on 'income' or 'expense' type
      if (type === 'expense') {
        newItem = new Expense(ID, des, val); // After you have the 'newItem' you can add it to your data structure.
      } else if (type === 'income') {
        newItem = new Income(ID, des, val);
      }
      // push the new item type into its respective array in the data structure
      data.allItems[type].push(newItem); // [type] can only be expense or income

      return newItem; // Making this public makes it accessable to other modul/fuction
    },

    testing: function() {
      console.log(data);
    }
  };

})();

// UI CONTROLLER
var UIController = (function() { /* Because this is a funcion you want to be able
  to use in the other contorller, it needs to be public - so it will have to be in
  the object that this IIFE will return (REMEMBER, this gets executed immediately
  and the object that is returned will be assigned to the UIController and all the
  variables and functions that are defined in the function will stay in the closure
  even after this function returns - the object that is returned from this will have
  access to these private methods/functions and variables)*/

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either 'income' or 'expense'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    // added a new public method to add a list item
    addListItem: function(obj, type) { /* This obj is exactly the same object you created using
                                      a function constructor, passed to the app controller*/
      // Create HTML string with placeholder text
      var html, newHtml, element;

      if (type === 'income') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'expense') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } // The placeholders I've used above are %id%, %description% and %value%
      // Preplace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      /* so, first you need to select some element from the DOM, then you can insert
      this newHtml next to that using the insertAdjacentHTML which accepts (position, text) as arguments
      https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML*/
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() { /* you don't need any parameters here because you know which
    fields you want to clear ('inputDescription' and 'inputValue'). By using the querySelectorAll, you can reduce the code needed*/
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); /* The syntax here is like CSS selecting
      separating different selectors simply by a comma. But the querySelectorAll method doesn't return
      a nice array that you can loop over, instead it returns a List, which you can then convert to an array.*/
      fieldsArr = Array.prototype.slice.call(fields); /* Using the 'call' method and setting the 'this' variable
      to 'fields' tricks the 'slice' method into thinking that we're giving it an array, so it will
      return an array.
      Now you're able to loop over the array and can clear the two selected fields*/
      fieldsArr.forEach(function(current, index, array) {
        current.value = ""; // This sets the value of the 'current' element being processed to empty.
      }); // So now this function can be used in the app controller!
      /* But after clearing the fields, you'll want to set the focus back to the desciption
      field making it easier to input the values. This can be done as follows using the 'focus' method.*/
      fieldsArr[0].focus();
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() { /* This function now sets up all of the eventListeners, but it's still private!
  so this setupEventListeners needs to be called somehow - the best way to do this is to make a public
  initialization function - I'll call it 'init'*/
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
      // upon click, the income or expese should be listed as such and added to its respective total

    /* What if you want the user to be able to enter the amount by pressing the 'return' key too?
    Then you'll need a keyPressEvent - so you'll need another event listener
      see: https://developer.mozilla.org/en-US/docs/web/events - checkout 'keyboard events'*/

    document.addEventListener('keypress', function(event) { /* Here, I've included the argument 'event'
    which automatically gets passed into the eventhandler by the browser - you have to know which
    'keyCode' idendifies the button you want to use (the return key in this case) - http://keycodes.atjayjo.com/#*/
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() { /* This is basically the control center of the app, telling the other moduls what
    they should do, then gets data back that is used for other things - it gets called when hits the input button
    or hits the return key, but it's still private!*/
    var input, newItem;
    // 1. Get the user input data
    input = UICtrl.getInput(); // First, the input is read out of the fields and then stored into this variable
    // 2. Add the item to the budget controller
    newItem = budgetController.addItem(input.type, input.description, input.value); /* Then, using
    the input variable and the 'addItem' method, a new item is created and stored in the 'newItem' variable.
    This 'newItem' variable is the object that gets passed to the 'addListItem' method in the UIController*/

    // 3. Add the item to the UI (expese/income item list)
    UICtrl.addListItem(newItem, input.type);
    // 4. Clear the fields of the UI
    UICtrl.clearFields();
    // 5. Calculate the budget

    // 6. Display the updated budget on the UI

  };

  // Because you want the 'init' function to be public, you need to return it in an object,
  return {
    init: function() {
      setupEventListeners();
      // ctrlAddItem;
    }
  };

})(budgetController, UIController);

  /* So, the eventListeners are only going to be set up as soon as you call the 'init'
  function - so you need to do that outside of the controllers. This is the only line
  of code I'm going to place on the outside.*/
  controller.init(); /* Without this line of code, nothing will ever happen because
  there won't be any eventListeners and without the eventListeners, you can't input
  data and without data, there is no application*/
