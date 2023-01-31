//Sarah Xu, June 2, 2020
//This file contains the JavaScript code that is used to execute JavaScript instructions in gamepage.html

//categories and words to choose from
var categories = [
     ["TULIP", "ROSE", "LILY", "SUNFLOWER", "HYDRANGEA", "PEONY", "DAFFODIL", "HYACINTH"],
     ["RIVER", "MOON", "GALAXY", "FJORD", "STAR", "OCEAN", "SIERRA"],
     ["RADIANT", "NOBLE", "HALCYON", "UNRESTRAINED", "ETHEREAL", "AESTHETIC"],
     ["BLOSSOM", "FIREWORKS", "DREAM", "BUTTERFLY", "SHADOW", "SNOW", "BALLAD"]
 ];

var answerArray = []; //array to store the answer

var remainingLives = 10; //total number of lives for wrong answers

var clicks = 0; //total number of guess the user made

var right = 0; //total correct guesses the user made

var wrong = 0; //total wrong guesses the user made

var name; //name of player

var games = 0; //total played games (will increase if player decides to play again)

var win = 0; //total games won (may increase if player decides to play again)

var lose = 0; //total games lost(may increase if player decides to play again)

var winper; //percentage of wins the player had in all their games


//checks to see if the player has entered a name
function checkName(){
  name = document.getElementById("name").value;

  //for when the player only enters white spaces
  const trimmed = name.trim();
  if ((name.length==0)||(trimmed.length==0)){
    //alerts the player to enter a name and clears the input field
    alert("Hello! Spaces are not counted. Please enter your name to begin :)");
    document.getElementById('name').value = '';
  } else {
    //execute startGame if player has entered their name
    startGame();
  }
}


//Shows all necessary details to the player so they may start playing
//reveals the mystery word, the alphabet buttons, the hint button, the greeting, picked letters and number of lives, as well as the category.
function startGame(){
  //greeting, number of lives to start off with and the indicator showing which letters were guessed are shown
  document.getElementById("name").readOnly = true;   //sets the input to read only, so the player cannot change their name
  document.getElementById("hello").innerHTML = "Hello " + name + ", you can start guessing now! Good luck!";
  document.getElementById("lives").innerHTML = "You have: 10 lives left.";
  document.getElementById("picked").innerHTML = "Letters picked: ";

  chosenCategory = categories[Math.floor(Math.random() * categories.length)];   //the category

  word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];  //the mystery word

  //creates the blanks for the mystery word in the answerArray
  for (var i = 0; i < word.length; i++) {
   answerArray[i] = "_";
  }
  document.getElementById("answer").innerHTML = answerArray.join(" ");

  //creates alphabet to guess with
  for(x=1;x<=26;x++){
    btn = document.createElement("BUTTON");
    var letter = String.fromCharCode(x+64);
    var t = document.createTextNode(letter);
    btn.appendChild(t);
    btn.id = letter;
    btn.classList.add("allbtns");
    btn.addEventListener("click", checkLetter);
    document.getElementById("btns").appendChild(btn);
  }

  //creates the hint button
  hintbtn = document.createElement("BUTTON");
  hintbtn.appendChild(document.createTextNode("Stuck? Get a hint!"));
  hintbtn.setAttribute("id", "btnhint");
  hintbtn.addEventListener("click", getHint);
  document.getElementById("hint").appendChild(hintbtn);

  //disables the submit button
  var submit = document.querySelectorAll("#submit");
  for(var i of submit){
    i.disabled = true;
  }

  //styling for the div box over the hangman image
  document.getElementById("img").style.borderColor="white";
  document.getElementById("img").style.borderStyle="solid";
  document.getElementById("img").style.width="100%";

  selectCat(); //executes function selectCat to notify player of the category
}


//notifies player of the category
function selectCat(){
  if (chosenCategory == categories[0]) {
    document.getElementById("category").innerHTML = "The category is: flowers.";
  } else if (chosenCategory == categories[1]) {
    document.getElementById("category").innerHTML = "The category is: nature.";
  } else if (chosenCategory == categories[2]) {
    document.getElementById("category").innerHTML = "The category is: adjectives.";
  } else {
    document.getElementById("category").innerHTML = "The category is: non-specific.";
  }
}


//checks to see if the pressed letter is part of the word
function checkLetter(){
  var guess = this.id;

  document.getElementById(this.id).setAttribute('disabled', true);   //disables the button that was pressed

  document.getElementById("picked").innerHTML += this.id;   //adds the clicked letter to the list of picked letters

  //if the letter is part of the word, this code will execute to add the letter to the blanks (the answerArray)
  for(var j=0; j<word.length; j++){
    if (guess == word[j]){
      answerArray[j] = guess;
      document.getElementById("answer").innerHTML = answerArray.join(" ");
    }
  }

  //if the letter is not part of the word, this code will execute to decrease a life, update the hangman image and increase the number of wrong clicks
  if (word.indexOf(guess) === -1) {
    remainingLives --;
    wrong++;
    document.getElementById("lives").innerHTML = "You have " + remainingLives + " lives left.";
    updateHangmanImage();
  }

  clicks++;  //increase total guesses/clicks

  //executes the function finish() if the conditions to it are met
  if ((remainingLives==0) || (answerArray.join("") == word)){
    finish();
  }
}


//player can choose to get a hint
function getHint(){
  hints = [
    ["widely associated with the Netherlands", "a symbol of love", "a stylized version of this is associated with French royalty", "produces sunlight in Plants vs Zombies", "first cultivated in Japan and require constant moisture", "among the longest-used flowers in Eastern culture", "source of inspiration for Wordsworth's 'I Wandered Lonely as a Cloud'", "associated with spring and rebirth"],
    ["a large natural stream of water flowing in a channel to the sea, a lake, or another such stream", "the natural satellite of the earth", "the Milky Way is this", "long, narrow inlet with steep sides or cliffs", "the sun is this", "a large body of water", "a long jagged mountain chain"],
    ["shining or glowing brightly", "aristocrats are this", "an idyllic time in the past that is better than today", "without restrctions", "extremely delicate and light, seems too perfect for this world", "concerned with beauty or the appreciation of beauty"],
    ["the flowers of peaches, cherries, and pears are called this", "pyrotechnic devices used for aesthetic and entertainment purposes", "thoughts, images, and sensations occurring in a person's mind during sleep", "insects with large, beautiful wings", "a dark shape formed when an object blocks a source of light", "precipitation that falls during winter", "a form of verse set to music"]
  ];
  var categoryIndex = categories.indexOf(chosenCategory);
  var hintIndex = chosenCategory.indexOf(word);
  document.getElementById("clue").innerHTML = "Hint: " +  hints [categoryIndex][hintIndex];

  var btnhint = document.querySelectorAll("#btnhint");   //disables the hint button after it is pressed
  for(var i of btnhint){
    i.disabled = true;
  }
}


//ends the guessing period either if the word was guessed or if the player ran out of lives. Also shows statistics on the player's accuracy.
function finish(){
  right=clicks-wrong; //calculate the right guesses

  //percentage of wrong guesses and right guesses
  var wg = Math.ceil((wrong/clicks)*100);
  var rg = Math.ceil((right/clicks)*100);

  //disables the alphabet buttons
  var all = document.querySelectorAll(".allbtns");
  for(var i of all){
    i.disabled = true;
  }
  //tells player whether they won or lost
  if (remainingLives==0){
    document.getElementById("result").innerHTML = "<br>Sorry " + name + ", you lost! The answer was " + word + ".";
    //increases total games, total games lost, and win percentage
    lose++;
    games++;
    winper = Math.ceil(((games-lose)/games)*100);
  } else {
    document.getElementById("result").innerHTML = "<br>Congrats, " + name + " you won!";
    //increases total games, total games won and win percentage
    win++;
    games++;
    winper = Math.ceil((win/games)*100);
  }

  //statistics on the player's guesses(% right/wrong) and player's games (% win/lose)
  document.getElementById("stats").innerHTML = "You used: " + clicks + " guesses. <br>" + wg + "% of your guesses were wrong and " + rg + "% of them were right.<br><br>You played: " + games + " game(s). <br>You won " + win + " game(s) and lost " + lose + " game(s). <br>Your winning percentage is: " + winper + "%";

  //gives the player the option to play again or exit to the homepage
  document.getElementById("choices").innerHTML = "Would you like to play again?";

  //creates yes button
  var yes=document.createElement("BUTTON");
  yes.appendChild(document.createTextNode("Play again!"));
  yes.addEventListener("click", function (){
    //sets the text to blank in the <p> with ids: result, stats, choices and clue
    document.getElementById("result").innerHTML = "";
    document.getElementById("stats").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("clue").innerHTML = "";
    //removes all the buttons on the screen except for the submit button
    hintbtn.parentNode.removeChild(hintbtn);
    var all = document.querySelectorAll(".allbtns");
    for(var i of all){
      i.parentNode.removeChild(i);
    }
    yes.parentNode.removeChild(yes);
    no.parentNode.removeChild(no);
    redeem.parentNode.removeChild(redeem);
    //the following will be reset to their original values, from before the player started playing
    answerArray=[];
    remainingLives = 10;
    clicks = 0;
    right = 0;
    wrong = 0;
    document.getElementById("hangmanImage").src = "images/10.png";
    //startGame() will execute, meaning all buttons will return, and, the category and mystery word will change
    startGame();
  });
  yes.classList.add("yesnored");
  document.getElementById("yes").appendChild(yes);

  //creates no button
  var no=document.createElement("BUTTON");
  no.appendChild(document.createTextNode("Back to home page"));
  //feedback.html will open
  no.addEventListener("click", function (){
    window.open("feedback.html","_self");
    document.getElementById("name").value = '';
  });
  no.classList.add("yesnored");
  document.getElementById("no").appendChild(no);

  //creates redeem prize button
  var redeem=document.createElement("BUTTON");
  redeem.appendChild(document.createTextNode("Redeem my prize"));
  //the redeem prize modal box will open
  redeem.addEventListener("click", function (){
    document.getElementById("name").value = '';
    redeemCode();
  });
  redeem.classList.add("yesnored");
  document.getElementById("redeem").appendChild(redeem);
}


//updates the image every time the player makes a wrong guess
function updateHangmanImage() {
  document.getElementById("hangmanImage").src = "images/" + remainingLives + ".png";
}
