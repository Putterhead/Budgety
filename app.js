var budgetController = (function() {

  // Some Code

})();

var UIController = (function() {

  // Some Code

})();

var controller = (function() {

  document.querySelector('.add__btn').addEventListener('click', function() {
    // upon click, the income or expese should be listed as such and added to its respective total
    // 1. Get the user input data

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI (expese/income item list)

    // 4. Calculate the budget

    // 5. Display the updated budget on the UI
  });

  /* What if you want the user to be able to enter the amount by pressing the 'return' key too?
  Then you'll need a keyPressEvent - so you'll need another event listener
    see: https://developer.mozilla.org/en-US/docs/web/events - checkout 'keyboard events'*/

    document.addEventListener('keypress', function(event) { /* Here, I've included the argument 'event'
    which automatically gets passed into the eventhandler by the browser - you have to know which
    'keyCode' idendifys the button you want to use (the return key in this case) - http://keycodes.atjayjo.com/#*/
      console.log(event);

    });

})(budgetController, UIController);
