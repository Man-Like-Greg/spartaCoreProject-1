// varibles 

var memoryArray = ['A','A','B','B'];
var memoryValues = [];
var memoryBoxIds = [];
var boxesFlipped = 0;
// shuffle function
Array.prototype.memoryBoxShuffle = function() {
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
// //setting the timer
// function countDown(secs,elem) {
// 	var element = document.getElementById(elem);
// 	element.innerHTML = "Please wait for "+secs+" seconds";
// 	if(secs < 1) {
// 		clearTimeout(timer);
// 		element.innerHTML = '<h2>Countdown Complete!</h2>';
// 		element.innerHTML += '<a href="#">Click here now</a>';
// 	}
// 	secs--;
// 	var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
// }
// countDown(10,"status");

// function for new board
function newBoard() {
	boxesFlipped = 0;
	var output = '';
    memoryArray.memoryBoxShuffle();
	for(var i = 0; i < memoryArray.length; i++){
		output += '<div id="tile_'+ i +'" onclick="memoryFlipBox(this,\''+ memoryArray[i] +'\')"></div>';
	}
	document.getElementById('memoryBoard').innerHTML = output;
}
// function to flip the boxes 
function memoryFlipBox(box,val) {
	if(box.innerHTML == "" && memoryValues.length < 2){
		box.style.background = '#FFF'; // make the background white
		box.innerHTML = val;
		if(memoryValues.length == 0) {
			memoryValues.push(val);
			memoryBoxIds.push(box.id);
		} else if(memoryValues.length == 1){
			memoryValues.push(val);
			memoryBoxIds.push(box.id);
			if(memoryValues[0] == memoryValues[1]) {
				boxesFlipped += 2;
				// Clear both arrays
				memoryValues = [];
            	memoryBoxIds = [];
				// Check to see if the whole board is cleared
				if(boxesFlipped == memoryArray.length) {
					console.log("Game Completed... generating new board");
					document.getElementById('memoryBoard').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back() {
				    // Flip the 2 tiles back over
				    var box_1 = document.getElementById(memoryBoxIds[0]);
				    var box_2 = document.getElementById(memoryBoxIds[1]);
				    box_1.style.background = '#CCC';
            	    box_1.innerHTML = "";
				    box_2.style.background = '#CCC';
            	    box_2.innerHTML = "";
				    // Clear both arrays
				    memoryValues = [];
            	    memoryBoxIds = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
newBoard();
