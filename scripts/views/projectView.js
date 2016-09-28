//empty object to attach view handlers
var projectView = {};


//Set navigation so that only section selected shows, beginning with the "About" section
projectView.handleNavTabs = function () {
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

//put all render code into a function that can be called
projectView.renderIndexPage = function() {
  //push built/compiled project entries into empty projectArray
  //????IS this still okay as is???????<=======================================
  Project.all.forEach(function(entry) {
    projectArray.push(new Project(entry));
  });

  //render to HTML
  projectArray.forEach(function(item){
    $('#project').append(item.toHtml());
  });
};

/*Helper Functions*/
//animate header - not sure what to do with this helper function that I added on my own - it's currently floating. I shoudl probably add this as a method on the projectView object????????
//Old Code
// function animateHeader (){
//   $('h1').on('mouseenter', function(){
//     $('h1').text('.τέχνη(ἰδέα);');
//     $('h2').text('Sturdy Technology From Ideas');
//   });
//   $('h1').on('mouseout', function(){
//     $('h1').text('A L F ◯ N S O');
//     $('h2').text('Web Development');
//   });
// }
projectView.animateHeader = function() {
  $('h1').on('mouseenter', function(){
    $('h1').text('.τέχνη(ἰδέα);');
    $('h2').text('Sturdy Technology From Ideas');
  });
  $('h1').on('mouseout', function(){
    $('h1').text('A L F ◯ N S O');
    $('h2').text('Web Development');
  });
};

/*Function Calls*/
//call all the methods on the projectView object
projectView.handleNavTabs();
projectView.animateHeader();
projectView.renderIndexPage();
