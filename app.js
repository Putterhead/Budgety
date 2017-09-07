// BUDGET CONTROLLER
var budgetController = (function() {

  // Some Code

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
    inputBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either 'income' or 'expense'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
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

  var ctrlAddItem = function() { // This gets called when you want to add a new item, but it's still private!
    // 1. Get the user input data
    var input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to the budget controller

    // 3. Add the item to the UI (expese/income item list)

    // 4. Calculate the budget

    // 5. Display the updated budget on the UI

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
