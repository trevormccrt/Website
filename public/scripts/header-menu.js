//Snippet of code that deals with the menu bar popup when on mobile

//for toggling the menu on and off
var menuOn=false;

function turnOnEventListeners(){
  document.getElementById("main-content").addEventListener("click", hideMenu);
  document.getElementById("menu").addEventListener("mouseleave", hideMenu);
}
function removeEventListeners(){
  document.getElementById("main-content").removeEventListener("click", hideMenu);
  document.getElementById("menu").removeEventListener("mouseleave", hideMenu);
}
//Media queries for turning on the event listeners if on mobile
var windowSize = window.matchMedia("(max-width: 770px)");
//waits for the DOM to load
document.addEventListener("DOMContentLoaded", function(event) {
  //if the window size is less than 769px
  if(windowSize.matches) {
    turnOnEventListeners();
  }
});
//when the window is resized
windowSize.addListener(function(changed) {
  //if the new window size is less than 769px
  if(changed.matches) {
    turnOnEventListeners();
    hideMenu();
  }
  //if the new window size is more than 769px
  else {
    removeEventListeners();
    showMenu();
    document.getElementById("menu").style.display="flex";
  }
});
//toggles the menu when the expand menu button is pressed
function toggleMenu(){
  if (menuOn){
    hideMenu();
  }
  else if (!menuOn){
    showMenu();
  }
}

function showMenu(){
  document.getElementById("menu").style.display="block";
  menuOn=true;
}

function hideMenu(){
  document.getElementById("menu").style.display="none";
  menuOn=false;
}
