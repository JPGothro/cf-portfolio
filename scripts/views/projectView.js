//***VIEW***
//Set navigation so that only section selected shows, beginning with the "About" section
projectArray.handleNavTabs = function () {
  //click event handler for navigation tabs
  $('.main-nav').on('click', '.navtab', function () {
    //store this object reference in a variable
    var $this = $(this);
    //store attribute of d-content
    var $selectedNavtab = $this.attr('data-content');
    //build hash to grab d-content
    var hash = '#' + $selectedNavtab;
    //hide all content and show only selected tab's content
    $('.tab-content').not(hash).hide();
    $(hash).show();
  });
  //begin by selecting/showing first tab
  $('.main-nav .navtab:first').click();
};


//***QUESTION HERE AS TO ORDER***//
//order projectArray chronologically
projects.sort(function(this1, this2) {
  return (new Date(this2.publishedOn)) - (new Date(this1.publishedOn));
});

//push built/compiled project entries into empty projectArray
projects.forEach(function(entry) {
  projectArray.push(new Project(entry));
});

//render to HTML
projectArray.forEach(function(item){
  $('#project').append(item.toHtml());
});

/*Helper Functions*/
//animate header
function animateHeader (){
  $('h1').on('mouseenter', function(){
    $('h1').text('.τέχνη(ἰδέα);');
    $('h2').text('Sturdy Technology From Ideas');
  });
  $('h1').on('mouseout', function(){
    $('h1').text('A L F ◯ N S O');
    $('h2').text('Web Development');
  });
}

/*Function Calls*/
//call the function to handle nav tabs
projectArray.handleNavTabs();
//animate header
animateHeader ();
