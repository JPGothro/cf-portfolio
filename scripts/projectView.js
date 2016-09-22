'use strict';

//empty object to handle view
var projectView = {};

//handle navigation tabs
projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function () {
    //variable hold value of this
    var $this = $(this);
    //variable hold value of attr in clicked tab
    var $selected = $this.attr('data-content');
    //variable hold value of tab selected
    var item = '#' + $selected;
    console.log(item);
    //hide all Continental
    $('.tab').hide();

    //show only selected tab
    $(item).show();
  }); //annnon function
  $('.main-nav .tab:first').click();
};//handleMainNav method

projectView.handleMainNav();
