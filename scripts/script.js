'use strict';
//Push project entries into this array
var projectArray = [];

//Create project entry objects using this object constructor
function Project (data){
  this.title = data.title;
  this.githubUrl = data.githubUrl;
  this.deployedUrl = data.deployedUrl;
  this.skills = data.skills;
  this.projectImage = data.projectImage;
  this.description = data.description;
  this.dateCreated = data.dateCreated;
}

//Build project entry using this object prototype
Project.prototype.toHtml = function (){
  //save cloned template to var
  var $newProject = $('article.template').clone();

  //build project entry
  $newProject.find('.title').text(this.title);
  $newProject.find('.deployed').attr('href', this.deployedUrl);
  $newProject.find('.gitCode').attr('href', this.githubUrl);
  $newProject.find('.skills').text(this.skills);
  $newProject.find('.projectImage').attr('src', this.projectImage);

  //add date created
  $newProject.find('time[when]').attr('title', this.dateCreated);
  $newProject.find('time').html('Created About ' + parseInt((new Date() - new Date(this.dateCreated)) / 60 / 60 / 24 / 1000) + ' days ago');
  //remove template class from built entry
  $newProject.removeClass('template');
  //return built project entry
  return $newProject;
};

projectArray.handleNavTabs = function () {
  //click event handler for .nabtab inside .main-nav
  $('.main-nav').on('click', '.navtab', function () {
    //store this node in a variable
    var $this = $(this);
    //store this attribute node of d-content
    var $selectedNavtab = $this.attr('data-content');
    //build hash to grab this
    var hash = '#' + $selectedNavtab;
    console.log('this item hash', hash);

    //hide all content and show only selected hash content
    $('.tab-content').not(hash).hide();
    $(hash).show();
  });
  $('.main-nav .navtab:first').click();
};

//order projectArray chronologically
projects.sort(function(this1, this2) {
  return (new Date(this2.publishedOn)) - (new Date(this1.publishedOn));
});
//Push built project entry into empty projectArray
projects.forEach(function(entry) {
  projectArray.push(new Project(entry));
});
console.log(projectArray);

//Render to HTML
projectArray.forEach(function(item){
  console.log(item);
  $('#project').append(item.toHtml());
});

//call the funciton to handlel nav tabs
projectArray.handleNavTabs();
