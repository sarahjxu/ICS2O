//Sarah Xu, June 2, 2020
//This file contains the JavaScript code that is used to execute JavaScript instructions in gamepage.html, specifically the instructions for the modal box

//modal box
var modal = document.getElementById("modal");

//<span> closes the modal box
var span = document.getElementsByClassName("close");

//opens the modal box when the button "Redeem Prize" is clicked on
redeem.onclick = function() {
  modal.style.display = "block";
}

//closes the modal box when the player clicks outside the modal box
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//shows the prize and redeem code in the modal box
function redeemCode(){
  //creates the prizes
  var dollar5 = ["$5 Amazon Gift Card","$5 iTunes Gift Card","$5 Google Play Gift Card","$5 Cineplex Gift Card"];
  var prize5 = dollar5[Math.floor(Math.random() * dollar5.length)];
  var dollar10 = ["$10 Amazon Gift Card","$10 iTunes Gift Card","$10 Google Play Gift Card","$10 Cineplex Gift Card"];
  var prize10 = dollar10[Math.floor(Math.random() * dollar10.length)];
  var dollar20 = ["$20 Amazon Gift Card","$20 iTunes Gift Card","$20 Google Play Gift Card","$20 Cineplex Gift Card"];
  var prize20 = dollar20[Math.floor(Math.random() * dollar20.length)];
  var hugs = "virtual hug";
  var certificate = "certificate of completion";
  //shows the prize and the redeem code in the modal box
  if ((games>=1)&&(games<10)){
      document.getElementById("redeemedprize").innerHTML = "Keep playing to redeem a prize!";
  } else if (games==10){
     if (winper>=80){
        document.getElementById("redeemedprize").innerHTML = "Your prize is: " + prize5;
        var num = Math.floor((Math.random() * 100) + 1);
        var arrLetter = ["A", "B", "C", "D", "E"];
        var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
        document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
      } else {
        document.getElementById("redeemedprize").innerHTML = "Your prize is: " + hugs;
        var num = Math.floor((Math.random() * 200) + 101);
        var arrLetter = ["F", "G", "H", "I", "J"];
        var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
        document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
      }
    } else if ((games<=20)&&(games>=10)){
    if (win>=75){
      document.getElementById("redeemedprize").innerHTML = "Your prize is: " + prize10;
      var num = Math.floor((Math.random() * 300) + 201);
      var arrLetter = ["K", "L", "M", "N"];
      var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
      document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
    } else {
      document.getElementById("redeemedprize").innerHTML = "Your prize is: " + certificate;
      var num = Math.floor((Math.random() * 400) + 301);
      var arrLetter = ["O", "P", "Q", "R"];
      var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
      document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
    }
  } else if (games>20){
    if (winper>=65){
      document.getElementById("redeemedprize").innerHTML = "Your prize is: " + prize20;
      var num = Math.floor((Math.random() * 500) + 401);
      var arrLetter = ["S", "T", "U", "V"];
      var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
      document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
    } else {
      document.getElementById("redeemedprize").innerHTML = "Your prize is: " + certificate;
      var num = Math.floor((Math.random() * 600) + 501);
      var arrLetter = ["W", "X", "Y", "Z"];
      var randLetter = arrLetter[Math.floor(Math.random() * arrLetter.length)];
      document.getElementById("code").innerHTML = "Your redeem code is: " + randLetter + num;
    }
  }
}
