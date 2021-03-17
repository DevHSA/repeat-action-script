// ==UserScript==
// @name        Auto Battle Script Beta v0.01
// @namespace   Violentmonkey Scripts
// @match       https://www.pokemon-vortex.com/battle-user/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/3/2021, 7:49:59 pm
// ==/UserScript==

//USEFUL JS SYNTAX FOR FUTURE REFERENCE
//*****************ignore********************//
// var evt = document.createEvent('MouseEvents')
// evt.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
// document.querySelectorAll('.tab-button')[0].dispatchEvent(evt)
// setTimeout(function a() {
// your own code
// setTimeout(a, 1000);
// }, 1000);
//*****************ignore********************//

//INTEGRAL VARIABLES --- DO NOT DISTURB
let buttonList, h3List, loadingDiv, liList;
let location = window.location; //Starting Location whenever the page reloads
let logoutURL = "https://www.pokemon-vortex.com/logout";
let battleFunctionGlobalCallCount = 0;
//CONFIGURABLE VARIABLES --- CHANGE ACCORDING TO YOUR NEEDS
let battleFunctionCallInterval = 1200; // Smaller Values Lead to Loops and Bans. Bigger Values Increase time between reloads(Safe). Change according to your Internet speed and risk appetite

let decoyURLS = [
  "https://www.pokemon-vortex.com/gyms/",
  "https://www.pokemon-vortex.com/special-battles/",
  "https://www.pokemon-vortex.com/team/",


];

let battleURLS = [
  "https://www.pokemon-vortex.com/battle-user/381236",
  "https://www.pokemon-vortex.com/battle-user/1058571",
];


//UTILITY FUNCTIONS
const randomNumber = (min, max) =>{
  return  Math.random() * (max - min) + min;
}


//INTEGRAL FUNCTIONS
const selectPokemonHandler = () => {
  console.log("SELECT POKEMON PAGE");

  buttonList[0].dispatchEvent(new MouseEvent("click"));
};

const selectAttackHandler = () => {
  console.log("SELECT ATTACK PAGE");
  buttonList[1].dispatchEvent(new MouseEvent("click"));
};

const attackResultHandler = () => {
  console.log("ATTACK RESULT PAGE");
  buttonList[1].dispatchEvent(new MouseEvent("click"));
};

const battleOverHandler = () => {
  console.log("BATTLE OVER PAGE");
  //GET CLICKABLE BUTTON
  liList = document.querySelectorAll('li[class="menu-tab"]');
  liList[0].dispatchEvent(new MouseEvent("click"));
  // clearInterval(intervalHandler);
  // window.location.replace(location);
};






const autoBattle = () => {
  //GET CLICKABLE BUTTON
  buttonList = document.querySelectorAll('input[type="submit"]');
  //GET PAGE IDENTIFIERS
  h3List = document.querySelectorAll("h3");
  //LOADING CHECK
  loadingDiv = document.querySelector('div[id="loading"]');


  //INCREMENT TIMEOUT COUNT --- MAX RETRIES SET at 40 Function Calls
  reloadTimeoutCount++;

  console.log(reloadTimeoutCount);

  if (reloadTimeoutCount > 120) {
    console.log("Reload Try");
    window.location.replace(location);
  }
  //IF IN SELECT POKEMON PAGE
  else if (h3List[0].firstChild.data.includes("Select your next")) {
    //In case of select page where Loading does not have the style
    if (loadingDiv.attributes[1] === undefined) {
      console.log("Undefined Style", loadingDiv);
      selectPokemonHandler();
    }
    //In case of select page where loading is defined, then do not click till its hidden
    else {
      console.log("Undefined Else Style", loadingDiv);
      if (loadingDiv.attributes[1].nodeValue.includes("hidden")) {
        console.log("Undefined Else Inside Style", loadingDiv);
        selectPokemonHandler();
      }
    }
  }
  //IF IN SELECT ATTACK PAGE
  else if (h3List[0].firstChild.data.includes("Select an Attack")) {
    if (loadingDiv.attributes[1].nodeValue.includes("hidden")) {
      selectAttackHandler();
    }
  }
  //IF IN ATTACK RESULT PAGE
  else if (h3List[0].firstChild.data.includes("Attack Results")) {
    if (loadingDiv.attributes[1].nodeValue.includes("hidden")) {
      attackResultHandler();
    }
  }
  //IF IN BATTLE OVER PAGE
  else if (h3List[0].firstChild.data.includes("Your team")) {
    if (loadingDiv.attributes[1].nodeValue.includes("hidden")) {
      battleOverHandler();
    }
  
  }
  
  setTimeout(autoBattle,  randomNumber(2000,1000));
};

// let intervalHandler = setInterval(() => autoBattle(), callInterval);

  setTimeout(autoBattle, 1000);

