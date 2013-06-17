//= require jquery
//= require tree

var clicked_val = "mike"

function projectClick(value){
  if (clicked_val == value){
    toMike();
  }
  else{
    deselect(projects);
    highlightSelf(value);
    highlightTools(projects[value]["tools"]);
    insertDiv(value);
    changePic(value);
    clicked_val = value;
  }
}

function toolClick(value){
  if (clicked_val == value){
    toMike();
  }
  else{
    toMike();
    // deselect(tools);
    highlightSelf(value);
    num = findWithAttr(tools,"name",value);
    highlightProjects(tools[num]["projects"]);  
    clicked_val = value;
  }
}

function highlightTools(names_of_tools){
  for(var i=0; i<tools.length; i++){
    if (names_of_tools.contains(tools[i]["name"])){
      shadow($("#"+tools[i]["name"]+""));
    } 
    else{
      if ($("#"+tools[i]["name"]+"").length > 0){
        unshadow($("#"+tools[i]["name"]+""));
      }
    }
  }
}

function highlightProjects(names_of_projects){
  for(var i=0; i<projects.length; i++){
    if (names_of_projects.contains(projects[i]["name"])){
      shadow($("#"+projects[i]["name"]+""))
    } 
    else{
      if ($("#"+projects[i]["name"]+"").length > 0){
        unshadow($("#"+projects[i]["name"]+""))
      }
    }
  }
}

function deselect(array){
  for(var i=0;i < array.length;i++){
    unshadow($("#"+array[i]["name"]+""))
  }
}

function shadow(div){
  div.removeClass("unshadowed")
  div.addClass("shadowed")
}

function unshadow(div){
  div.removeClass("shadowed")
  div.addClass("unshadowed")
}

function highlightSelf(value){
  if(typeof value == "number"){
    switch(value)
    {
    case 0:
      shadow($("#TeachingTree"));
      break;
    case 1:
      shadow($("#Two_cents"));
      break;
    case 2:
      shadow($("#Find_by_shortcut"));
      break;
    case 3:
      shadow($("#Griddy_city"));
      break;
    }
  }
  else{
    shadow($("#"+value+""))
  }
}

function toMike(){
  deselect(projects);
  deselect(tools);  
  changePic(4);
  $("#relevant_info_header").html("Michael Nomitch");
  $("#relevant_info_text").html("I founded and develop <a href='http://www.teachingtree.co'>TeachingTree</a>, an online platform for easily accessing concepts within college-level math and computer science lectures. I also recently launched <a href='http://curated.herokuapp.com'>TwoCents</a>, a simple way to quickly share your thoughts on music with friends.</br></br>Click each project for more information or check out my <a href='http://www.linkedin.com/pub/michael-nomitch/45/474/3b5/'>LinkedIn</a> and <a href='https://github.com/mikenomitch/'>GitHub</a> pages.</br></br>I am always happy to chat. If you want to get in touch, email me at <a href='mailto:mikenomitch@gmail.com'>mikenomitch@gmail.com</a>.");
  clicked_val = "mike";
}

function insertDiv(value){
  $("#relevant_info_header").html(projects[value]["header"])
  $("#relevant_info_text").html(projects[value]["div"])
}

function insertTool(num){
  $("#relevant_info_header").html(tools[num]["name"])
  $("#relevant_info_text").html(tools[num]["div"])
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
}

function changePic(value){
switch(value)
    {
    case 0:
      new_pic = "<div class='picture_holder'><img src='tt.png' class='project_image'></img></div>"
      break;
    case 1:
      new_pic = "<div class='picture_holder'><img src='2c.png' class='project_image'></img></div>"
      break;
    case 2:
      new_pic = "<div class='picture_holder'><img src='fbs.png' class='project_image'></img></div>"
      break;
    case 3:
      new_pic = "<div class='picture_holder'><img src='grid.png' class='project_image'></img></div>"
      break;
    case 4:
      new_pic = "<div class='picture_holder'><img src='me.png' class='actual_image'></img></div>"
      break;
    }
  $("#relevant_info_picture").html(new_pic)
}

// DATA DATA DATA
// DATA DATA DATA
// DATA DATA DATA
// DATA DATA DATA

var projects = [{name:"TeachingTree",header:"TeachingTree",tools: ["Ruby","RubyonRails","HTML5","CSS3","SCSS","Git","Heroku","Javascript","JQuery","Ajax","JQuery","D3"], div: "<a href='www.teachingtree.co'>TeachingTree</a> is an online platform for people who want quick access to concepts in Computer Science and Math lectures. Any user can add videos and time-stamped tags to help other students. </br></br> The site has over 1500 users and has been featured on <a href='http://www.code.org/learn/scratch'>Code.org</a>, <a href='http://tech.co/teachingtree-online-learning-2013-04'>Tech Cocktail</a>, and <a href='http://www.freetech4teachers.com/2013/02/teaching-tree-video-explanations-of.html'>various</a> <a href='http://www.educatorstechnology.com/2013/05/teaching-platform-for-computer-and-math.html'>other</a> <a href='http://www.freetech4teachers.com/2013/02/teaching-tree-video-explanations-of.html'>blogs</a>. </br></br> Development on the site began in November 2012 and it is written using Ruby on Rails."},
                {name:"Two_cents",header:"Two Cents", tools: ["Ruby","RubyonRails","HTML5","CSS3","Git","Heroku","Javascript","Coffeescript","JQuery","Ajax","JQuery", "Backbone"], div: "<a href='http://curated.herokuapp.com/'>Two Cents</a> began as a weekend project, but has grown over time. The site allow users to post stylized 'micro-reviews' of songs and albums with embedded links to YouTube, Spotify, and SoundCloud. </br></br> It was primarily written over the span of two weeks using Ruby on Rails and Backbone. Feel free to check out the source code on <a href='https://github.com/mikenomitch/curated'>GitHub</a>."},
                {name:"Find_by_shortcut",header:"find_by_shortcut", tools: ["Ruby", "RubyonRails"], div: "Find_by_shortcut is a Ruby Gem I wrote to make the rails console a bit simpler. It modifies Active Record to allow for shorcuts while searching through your database. </br></br> Check out <a href='https://github.com/mikenomitch/find_by_shortcut'>the documentation on GitHub</a> or <a href='https://rubygems.org/gems/find_by_shortcut'>Ruby Gems</a> for more info."},
                {name:"Griddy_city",header:"Griddy City", tools: ["HTML5", "CSS3", "Javascript"], div: "Griddy City is a simple game that I created using Javascript to help people get to know the grid system of Chicago better. </br></br> It isn't my proudest achievement (it only took a couple hours to make), but it can be very helpful for new Chicago residents. </br></br> It is on <a href='https://github.com/mikenomitch/griddy'>GitHub</a> and will soon be hosted elsewhere."}]

var tools = [{name:"Ruby",projects:["TeachingTree","Two_cents","Find_by_shortcut"],div:"Ruby was used to create the back-end of TeachingTree and Two Cents (both of which use Rails). Additionally I used it to write Find_by_shortcut, which is a Ruby gem that uses light metaprogramming in order to make Active Record queries easier. </br></br> The more I get into Javascipt, the more I find myself appreciating just how good Ruby is."},
             {name:"RubyonRails",projects:["TeachingTree","Two_cents","Find_by_shortcut"],div:"I have used the Rails framework since starting TeachingTree in November, 2012. I have a good working knowledge understanding of its features and best practices. </br></br> I would love to get some experience modifying the source code a bit (but alas, where is the time?)."},
             {name:"HTML5",projects:["TeachingTree","Two_cents"],div:"There isn't all that much to say about HTML. I use it, just like everybody else. </br></br> If you want to know how good I am with it, check out my sites and judge for yourself."},
             {name:"CSS3",projects:["TeachingTree","Two_cents"],div:"CSS has become"},
             {name:"SCSS",projects:["TeachingTree","Two_cents"],div:"scss"},
             {name:"Git",projects:["TeachingTree","Two_cents"],div:"git"},
             {name:"Heroku",projects:["TeachingTree","Two_cents"],div:"herroku"},
             {name:"Javascript",projects:["TeachingTree","Two_cents","Griddy_city"],div:"js"},
             {name:"Coffeescript",projects:["Two_cents"],div:"coffee"},
             {name:"Jquery",projects:["TeachingTree","Two_cents"],div:"jquery"},
             {name:"Ajax",projects:["TeachingTree"],div:"ajax"},
             {name:"Filler",projects:["TeachingTree"],div:"filler"},
             {name:"D3",projects:["TeachingTree"],div:"D3"},
             {name:"Backbone",projects:["Two_cents"],div:"Backbone"}]

// var teachingTree = "Teachigntree Teachigntree Teachigntree Teachigntree Teachigntree Teachigntree Teachigntree"
// var twoCents = "2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents 2cents"
// var fbs = "find by shor find by shor find by shor find by shor find by shor find by shor"
// var griddyCity = "grid cuit grid cuit grid cuit grid cuit grid cuit grid cuit grid cuit grid cuit"