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
  for (var keys in opts){
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

  //Add markup to project description
  this.description = marked(this.description);

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

//Retrieve data, process it, and hand off to View
Project.fetchAll = function() {
  //if data is already in localStorage, parse into a js object and load that
  if (localStorage.projects) {
    var jsonData = JSON.parse(localStorage.projects);
    Project.loadAll(jsonData);
    //otherwise make an ajax call to get data from json in data directory, process, and load
  } else {
    $.ajax('data/projects.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
    function successHandler(data) {
      Project.loadAll(data);
      projectView.renderIndexPage();
      var dataString = JSON.stringify(data);
      localStorage.setItem('projects', dataString);
    };
    function errorHandler(error) {
      console.log('Error', error);
    };
  };
};
