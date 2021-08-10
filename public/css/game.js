var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern  =[];

 var  userClickedPattern = [];
 var started = false;
 var level = 0;


 $(document).keypress(function () {
   if(!started){
     $("#level-title").text("level " + level);
     nextSequence();
     started=true;
   }
 });
 $(".btn").click(function () {
   var userChosenColour = $(this).attr("id");

 userClickedPattern.push(userChosenColour);
 playsound(userChosenColour);
 animatepress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
 });

 function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
     console.log("success");
     if(userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       },1000);
     }
   }
   else {
  console.log("wrong");
  playsound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("game over , press any key to restart");
  startover();
}

 }


function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomnumber = Math.floor(Math.random()*4);
var randomChosenColour = buttoncolors[randomnumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColour);

}
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
},100);
}
function startover(){
  level = 0;
  started = false;
  gamePattern = [];

}
