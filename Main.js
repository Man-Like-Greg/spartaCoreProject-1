$(function () {
	// 
	var arrayOfImages = ['images/Thierry-Henry.jpg','images/lionel-messi.jpg','images/Thierry-Henry.jpg','images/lionel-messi.jpg'];
	var $reset = $('#reset')
	// find the memory board
	var $memoryBoard = $('#memoryBoard');
	// find the scores
	var $scores = $('#scores');
	// find the grid
	var $grids = $('#grids');
	// find click counter
	var $counter = $('#counter');
	// find once box selected
	var $selected = $('.selected');
	// find the first game selection
	var $startGame1 = $('#startGame1');
	// find the introduction 
	var $scenario = $('#scenario');
	var counter = 0;

	var seconds = 20;

function countDown(){
  if (seconds > 0){
    var $theTimer = $('#timer');
    seconds--;
    $theTimer.html("Time: " + seconds);
  }
  
}

function startTimer(){
  setInterval(countDown, 1000);
}

startTimer();


	$reset.hide();
	$scores.hide();
	// start the game
	$startGame1.click(function(event) {
  counter = 0;
  $counter.html(counter);

	$scenario.slideUp();
	$scores.show();
	$reset.show();
		
	$('#grids').html("");
	createNewBoard();

	});


	$('#grids').on('click', 'div', function(event) {
		if (!$(this).hasClass('match')) {
			$(this).addClass('selected');
			$(this).children().show();
		}
		displayBox();
		
		});
	// shuffle function for any array this is called upon
	function shuffle(array) {
  		var currentIndex = array.length, tempValue, randomIndex;
  		while (0 !== currentIndex) {
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

		    tempValue = array[currentIndex]; // take the current index and adds it to an array
		    array[currentIndex] = array[randomIndex]; //then takes the current index array and makes it the random index
		    array[randomIndex] = tempValue; // which then is added back into the temporary value
		}
		  return array;
	} 
	// creating a new board using the shuffle function
	function createNewBoard () {
		shuffle(arrayOfImages);
	  	for (var i = 0; i < arrayOfImages.length; i++) {
        output = "<div id=box" + i + "><img src='" + arrayOfImages[i] + "'/></div>"
        $grids.append(output);
    	}
	    $('div img').hide();
  	} 
  	// show the box
  	function displayBox (){
  		var $selected = $('.selected');
  		var $match = $('.match');

  		counter = counter + 1;
      $counter.html(counter);

  		if($selected.length === 2) {

  			var src1 = $selected.eq(1).find('img').attr('src');
  			var src2 = $selected.eq(0).find('img').attr('src');

  			if (src1 === src2) {
  				$selected.removeClass('selected');
  				$selected.addClass('match');

  				if($('.match').length === 4) {
  					winner();
  				}

  			} else {
  				$selected.removeClass('selected');
				
				setTimeout(function() {
					$selected.find('img').fadeOut();
				}, 1000);
  				
  			}  		
    	}
    }
  // when the user wins   
	function winner () {
		
		setTimeout(function(){
			var $scores = $('#scores');
			$scores.fadeOut();
  			$('#grids div').fadeOut();			
  		}, 2000);
  	setTimeout(function (){
			var winMessage = 
			'<p class="winningMessage"><strong>Congratulations!</strong></p><p>You completed this in ' + counter + ' clicks.</p>'
			$('#scenario').fadeIn();
			$('#startGame1').html('<a class="link" href="index.html">Play again?</a>');
			$('.rules').html
			(winMessage).addClass('winningMessage');
		}, 3000);		
	}			


});

