'use strict';

//Push project entry objects into this array
//var projectArray = [];

//Create project entry objects using object constructor with data parameter
// function Project (data){
//   this.title = data.title;
//   this.githubUrl = data.githubUrl;
//   this.deployedUrl = data.deployedUrl;
//   this.skills = data.skills;
//   this.projectImage = data.projectImage;
//   this.description = data.description;
//   this.dateCreated = data.dateCreated;
// }

//New Object constructor
function Project(opts) {
  for (keys in opts){
    this[keys] = opts[keys];
  }
}

//Place artcile set into a method on the constructor object
Project.all = [];

//NEW build for project entry
Project.prototype.toHtml =
function(scriptTemplateId) {
  var template = Handlebars.compile($(scriptTemplateId).text());

  //build date created
  this.daysAgo = parseInt((new Date() - new Date(this.dateCreated)) / 60 / 60 / 24 / 1000);
  ///Build date created message: post date or "draft" status
  this.publishStatus = this.dateCreated ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  //Add markup to project body
  this.body = marked(this.body);

  //return the template for project entry
  return template(this);
};


//OLD: Build project entry
// Project.prototype.toHtml = function (){
//   //store location for insertion of populated template
//   var source = $('#article-template').html();
//   //Store Handlebars compiler method
//   var template = Handlebars.compile(source);
//
//   //build date created
//   this.daysAgo = parseInt((new Date() - new Date(this.dateCreated)) / 60 / 60 / 24 / 1000);
//   ///Build date created message: post date or "draft" status
//   this.publishStatus = this.dateCreated ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
//
//   //Compile "this" entry and set to variable
//   var html = template(this);
//
//   //return built project item
//   return html;
//
//   // OLD CODE - JS/JQUERY TEMPLATING
//   //save cloned template to var
//   // var $newProject = $('article.template').clone();
//   //
//   // //build project entry
//   // $newProject.find('.title').text(this.title);
//   // $newProject.find('.deployed').attr('href', this.deployedUrl);
//   // $newProject.find('.gitCode').attr('href', this.githubUrl);
//   // $newProject.find('.skills').text(this.skills);
//   // $newProject.find('.projectImage').attr('src', this.projectImage);
//   //
//   // //add date created
//   // $newProject.find('time[when]').attr('title', this.dateCreated);
//   // $newProject.find('time').html('Created About ' + parseInt((new Date() - new Date(this.dateCreated)) / 60 / 60 / 24 / 1000) + ' days ago');
//   // //remove template class from built entry
//   // $newProject.removeClass('template');
//   // //return built project entry
//   // return $newProject;
// };

//Take in data for the project entry and process
Project.loadAll = function(dataWePassIn) {
  dataWePassIn.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  }).forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

//Retrieve data, process it, adn hand off to View
Project.fetchAll = function() {
  //if data is already in localStorage, parse into a js object and load that
  if (localStorage.projects) {
    var jsonData = JSON.parse(localStorage.projects);
    Project.loadAll(jsonData);
    //otherwise get data from data files, process, and load
  } else {
    $.ajax('data/projects.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
    function successHandler(data) {
      Project.loadAll(data);
      projectArray.renderIndexPage();
      var dataString = JSON.stringify(data);
      localStorage.setItem('projects', dataString);
    }
    function errorHandler(error) {
      console.log('Error', error);
    };
  };
};


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
