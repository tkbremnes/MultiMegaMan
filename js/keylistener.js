var keyIsDown = false;
var keyDownObj = {
	left: false,
	right: false,
	jump: false,
	down: false,
	fire: false,
	kd: false
};

// var dirArray;

function initKeyListener()
{
	$(document).bind('keydown',function(e){
		switch(e.keyCode)
		{
			case(37):
				// Left
				if(!keyDownObj.left){
					keyDownObj.left = true;
					leftButtonPressed();
				}
				break;
			case(39):
				// Right
				if(!keyDownObj.right){
					keyDownObj.right = true;
					rightButtonPressed();
				}
				break;

			case(88):
				// Jump (letter x)
				if(!keyDownObj.jump){
					keyDownObj.jump = true;
					xButtonPressed();
				}
				break;

			case(90):
				// Fire (letter z)
				if(!keyDownObj.fire){
					keyDownObj.fire = true;
					zButtonPressed();
				}
				break;
			case(38):
				// Up
				e.preventDefault();
				upButtonPressed();
				// TODO
				break;
			case(40):
				// Down
				e.preventDefault();
				if(!keyDownObj.down){
					keyDownObj.down = true;
					downButtonPressed();
				}
				break;
			case(70):
				document.getElementById('canvas').webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				break;
			case(27):
				document.webkitCancelFullScreen();
				break;
			case(71):
				startGame();
				break;

		}
	});
	$(document).bind('keyup',function(e){
		switch(e.keyCode)
		{
			case(37):
				// Left
				if(keyDownObj.left){
					keyDownObj.left = false;
					leftButtonReleased();
				}
				break;
			case(39):
				// Right
				if(keyDownObj.right){
					keyDownObj.right = false;
					rightButtonReleased();
				}
				break;
			case(88):
				// Jump (letter x)
				if(keyDownObj.jump){
					xButtonReleased();
					keyDownObj.jump = false;
				}
				break;
			case(90):
				// Fire (letter z)
				if(keyDownObj.fire){
					keyDownObj.fire = false;
				}
				break;
			case(40):
				//Down
				if(keyDownObj.down){
					keyDownObj.down = false;
				}
				break;
		}
	});
}

function leftButtonPressed(){
	if(menuMode){
	}
	else{
		goLeft();
	}
}
function leftButtonReleased(){
	if(menuMode){
	}
	else{
		goingLeft = false;
		stopAnimation();
		setTimeout(function(){
			stopWalking();
		}, 50); 
	}
}
function rightButtonPressed(){
	if(menuMode){
	}
	else{	
		goRight();
	}
}
function rightButtonReleased(){
	if(menuMode){
	}
	else{
		goingRight = false;
		stopAnimation();
		setTimeout(function(){
			stopWalking();
		}, 50);
	}
}

function upButtonPressed(){
	if(menuMode){
		menu.moveUp();
	}
}
function upButtonReleased(){

}

function downButtonPressed(){
	if(menuMode){
		menu.moveDown();
	}
}
function downButtonReleased(){

}

function xButtonPressed(){
	if(menuMode){
		menu.pushButton();
	}
	else{
		player.jump();
	}
}

function xButtonReleased(){
	if(!menuMode){
		// Stops the jump with a slight delay
		if(player.fallSpeed<0){
			setTimeout(function(){
				player.stopJump();
			}, 50);
		}
	}
}

function zButtonPressed(){
	if(!menuMode){
		fire();
	}
}

function zButtonReleased(){
	// body
}