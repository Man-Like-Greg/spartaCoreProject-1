$(function () {
	var arrayOfImages = ['images/Thierry-Henry.jpg','images/lionel-messi.jpg',
	'images/Thierry-Henry.jpg','images/lionel-messi.jpg','images/david.jpg',
	'images/ronaldo.jpg','images/david.jpg','images/ronaldo.jpg','images/Minionspic.jpeg'];
	// find reset
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
	// find paired
	var $paired = $('#paired');
	// find leader board
	var $leaderBoard = $('#leaderBoard')
	var counter = 0;
	var pairs = 0;
	// getting the seconds
	var seconds = 10;
	var inteval;

	$reset.hide();
	$scores.hide();


	function setUpEventListeners() {
		// start the game
		$startGame1.click(function(event) {
		  counter = 0;
		  $counter.html(counter);
			$scenario.slideUp();
			$scores.show();
			$reset.show();

			$('#grids').html("");
			startTimer();
			createNewBoard();
		});

		$leaderBoard.click(function(event) {
			$scenario.slideUp();
			$reset.show();
			$('#grids').html("");
			leadBoard();
		})

	// if statement to allow matching the grids
		$('#grids').on('click', 'div', function(event) {
			if (!$(this).hasClass('match')) {
				$(this).addClass('selected');
				$(this).children().show();
			}
			displayBox();
		});
	}

	function countDown() {
	  if (seconds > 0){
	    var $theTimer = $('#timer');
	    seconds--;
	    $theTimer.html("Time: " + seconds);
	  } else {
	  	// clear the inteval
	  	clearInterval(inteval);
	  	//set the seconds back to original
	  	seconds = 50;
  		loser();
	  }  
	}

	function startTimer() {
	  inteval = setInterval(countDown, 1000);
	}

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

			// if (src1 || src2 = Minionspic.jpeg) {
			// 	loser();
			// }

			if (src1 === src2) {
				$selected.removeClass('selected');
				$selected.addClass('match');
				pairs = pairs + 1;
				$paired.html("Matched: " +pairs);

				if($('.match').length === 12) {
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
  // leader board function
  function leadBoard() {

  	
  }


  // when the timer runs out function
  function loser() {

  	setTimeout(function() {
			var $scores = $('#scores');
			$scores.fadeOut();
  		$('#grids div').fadeOut();			
  	}, 500);
  	
  	setTimeout(function () {
			var loseMessage = 
			'<p class="losingMessage"><strong>GAME OVER!</strong></p><p>Time ran out.</p>' //this is to add a message in html
			$('#scenario').fadeIn();
			$('#startGame1').html('<a class="link" href="index.html">Play again?</a>'); // change the button on html
			$('.rules').html(loseMessage).addClass('losingMessage');
		}, 1000);
  }  

  // when the user wins   
	function winner() {
		var $theTimer = $('#timer');
		$theTimer.off();

		setTimeout(function() {
			var $scores = $('#scores');
			$scores.fadeOut();
  		$('#grids div').fadeOut();			
  	}, 1000);
  	
  	setTimeout(function () {
			var winMessage = 
			'<p class="winningMessage"><strong>Congratulations!</strong></p><p>You completed this in ' + counter + ' clicks.</p>' //this is to add a message in html
			$('#scenario').fadeIn();
			$('#startGame1').html('<a class="link" href="index.html">Play again?</a>');
			$('.rules').html(winMessage).addClass('winningMessage');
		}, 2000);		
	}	

	setUpEventListeners();		

});

