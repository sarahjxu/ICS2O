var nuM = [];
var signChoice = [];
var i=0;
var total=0;
  function addNum(num){
    document.getElementById("screen").value = document.getElementById("screen").value + num;
  }
  function setSign(sign){
   signChoice[i] = sign;
   nuM[i] = document.getElementById("screen").value;
   document.getElementById("screen").value = "";
   i++;
 }
  function equalPressed() {
   var num1=nuM[0];
   var s="";
   var j;
   nuM[i]=document.getElementById("screen").value;
   for(j=1; j<=i; j++){
     s = signChoice[j-1];
     if (s =="+") {
       total= (Number(num1)+ Number(nuM[j]));
     } else if (s =="-") {
       total= Number(num1)- Number(nuM[j]);
     } else if (s =="*") {
       total= Number(num1)* Number(nuM[j]);
     } else if (s =="/") {
         total= Number(num1)/ Number(nuM[j]);
      } else if (s =="x²") {
        total= Number(num1)* Number(num1);
      } else if (s =="x³") {
        total= Math.pow(Number(num1), 3);
      } else if (s =="√") {
        total= Math.sqrt(Number(num1));
      } else if (s =="∛") {
        total= Math.pow(Number(num1), 1/3);
      } else if (s =="n√") {
        total= Math.pow(Number(num1), (1/Number(nuM[j])));
      } else if (s =="xⁿ") {
        total= Math.pow(Number(num1), Number(nuM[j]));
      } else if (s =="Exp") {
        total= Number(num1) * Math.pow(10, Number(nuM[j]));
      } else if (s =="sin") {
        total= Math.sin(Number(num1) * Math.PI/180);
      } else if (s =="cos") {
        total= Math.cos(Number(num1) * Math.PI/180);
      } else if (s =="tan") {
        total= Math.tan(Number(num1) * Math.PI/180);
      } else if (s =="%") {
        total= Number(num1) * (Number(nuM[j])/100);
      }
    num1=total;
   }
 document.getElementById("screen").value=total;
 i=0;
}
function allClear() {
  nuM=[]
  signChoice=[];
  i=0;
}
