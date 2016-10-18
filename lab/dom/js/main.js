"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');

boxOne.onclick = function() {
	boxOne.classList.add("fade-to-black", "black");
}

boxTwo.onclick = function() {
	boxTwo.classList.add("fall");
}

boxThree.onmouseover = function() {
	boxThree.classList.add("fade-to-white", "white");
}

boxThree.onmouseout = function() {
	boxThree.classList.remove("fade-to-white", "white");
}

boxFour.onclick = function() {
	boxFour.classList.toggle("fall");
}

boxFive.onclick = setInterval(function() { // NEEDS FIXING: CANT GET VALUE FROM STYLE.PADDING
	console.log("THIS WORKS");
	boxFive.style.padding = toString(boxFive.style.padding + 100) + "px";
}, 500);