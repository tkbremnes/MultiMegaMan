var keyIsDown = false;
var keyDownObj = {
	left: false,
	right: false,
	up: false,
	down: false,
	fire: false,
	kd: false
};

function initKeyListener()
{
	$(document).bind('keydown',function(e){
		switch(e.keyCode)
		{
			case(37):
				// Left
				if(!keyDownObj.left){
					keyDownObj.left = true;
					goLeft();
				}
				break;
			case(39):
				// Right
				if(!keyDownObj.right){
					keyDownObj.right = true;
					goRight();
				}
				break;

			case(88):
				// Jump (letter x)
				if(!keyDownObj.up){
					keyDownObj.up = true;
					jump();
				}
				break;

			case(90):
				// Fire (letter z)
				if(!keyDownObj.fire){
					keyDownObj.fire = true;
					fire();
				}
				break;
			case(38):
				// Up
				e.preventDefault();
				// TODO
				break;
			case(40):
				// Down
				e.preventDefault();
				if(!keyDownObj.down){
					keyDownObj.down = true;
					moveDown();
				}
				break;
			case(70):
				document.getElementById('canvas').webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				break;
			case(27):
				document.webkitCancelFullScreen();
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
					goingLeft = false;
					stopWalking();
					stopAnimation();
				}
				break;
			case(39):
				// Right
				if(keyDownObj.right){
					keyDownObj.right = false;
					goingRight = false;
					stopWalking();
					stopAnimation();
				}
				break;
			case(88):
				// Jump (letter x)
				if(keyDownObj.up){
					keyDownObj.up = false;
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