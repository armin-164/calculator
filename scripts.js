function operate(firstNum, operator, secondNum) {
  
    if (operator === "+") {
      return firstNum + secondNum;    
    }

    else if (operator === "-") {
      return firstNum - secondNum;
    }

    else if (operator === "*") {
      return firstNum * secondNum;
    }

    else if (operator === "/") {
      // If either number is 0 and u want to divide, return error
      if (firstNum == 0 || secondNum == 0) {
        return "ERROR";
      }
      else {
      return firstNum / secondNum;
      }
    }
}


let allbuttons = document.querySelectorAll("button");
let secondresult ="";
let resultbox = document.querySelector("div.result");
allbuttons.forEach((button) => {
  button.addEventListener("click", calculate) 
})


 let firstvalue = "";  
 let secondvalue = "";
 let operatorstorage = "";


function calculate(e) {

let numberOrDot =(e.target.value >= 0 && e.target.value <= 9 || e.target.value === ".")
let operatorPress = (e.target.classList.contains("operatorbutton"));
let equalsPress = (e.target.classList.contains("equalssymbol"));
let resetbutton = (e.target.classList.contains("reset"));
let fullvariables = firstvalue != "" && secondvalue != "" && operatorstorage != "";

// If resetbutton is pressed, remove values from firstvalue,
// secondvalue and operatorstorage
if (resetbutton) {
  firstvalue = "";
  secondvalue = "";
  operatorstorage ="";
  resultbox.innerText = 0;
  return;
}

 // If number or dot is pressed add it to firstvalue and show
 // Also restrict amount of dots being used and numbers shown in resultbox
 if (numberOrDot && operatorstorage == "") { 

      if (firstvalue.includes(".") && e.target.value === "." || firstvalue.length > 22) {
      return;
      }
      else {
      firstvalue += e.target.value;
      resultbox.innerText = firstvalue;
      }
  }
  // If number or dot is pressed and storage is empty,
  // add it to secondvalue and show it
  // Also restrict amount of dots being used and numbers shown in resultbox

  else if (numberOrDot && operatorstorage != "") {

    if (secondvalue.includes(".") && e.target.value === "." || secondvalue.length > 22) {
      return;
      }
      else {
    secondvalue += e.target.value;
    resultbox.innerText = secondvalue;
      }
  }

 
// If operator is pressed and first variable is not empty but second is, 
// add operator to operatorstorage
	if (operatorPress && firstvalue != "" && secondvalue == "") {  
  operatorstorage = e.target.value;
  }


  // If all variables are full and equal sign is clicked, calculate it,
  // assign it to firstvalue and remove the other values from secondvalue
  // and operatorstorage. Allows it to continue
  if (fullvariables && equalsPress) { 
  firstvalue = String(operate(parseFloat(firstvalue), operatorstorage, parseFloat(secondvalue)));
  resultbox.innerText = firstvalue;
  secondvalue = "";
  operatorstorage ="";
  }


// If all variables are full and an operator is pressed,
// calculate all the current variables, assign to firstvalue,
// show it in HTML and make secondvalue empty to avoid issues
if(fullvariables && operatorPress) {
  firstvalue = String(operate(parseFloat(firstvalue), operatorstorage, parseFloat(secondvalue)));
  resultbox.innerText = firstvalue;
  secondvalue = "";
  operatorstorage = e.target.value;
}

// If firstvalue and operatorstorage is not empty but secondvalue is, and
// the equalssign is pressed, return an error
if (firstvalue != "" && secondvalue == "" && operatorstorage != "" && equalsPress) { 
  resultbox.innerText = "ERROR";
  firstvalue = "";
  secondvalue ="";
  operatorstorage ="";
}

}

