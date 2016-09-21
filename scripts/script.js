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

  $newProject.removeClass('template');
  return $newProject;
};

//Push built project entry into empty projectArray
projects.forEach(function(entry) {
  projectArray.push(new Project(entry));
});
console.log(projectArray);

//Render to HTML
projectArray.forEach(function(item){
  console.log(item);
  $('#projects').append(item.toHtml());
});
