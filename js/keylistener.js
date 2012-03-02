var keyIsDown = false;

function initKeyListener()
{
	$(document).bind('keydown',function(e){
		if(!keyIsDown){
		keyIsDown = true;
		switch(e.keyCode)
		{
			case(37):
				// Left
				startAnimation();
				startWalking('L');

				break;
			case(38):
				// Up
				moveUp();

				break;
			case(39):
				// Right
				startAnimation();
				startWalking('R');

				break;
			case(40):
				// Down
				moveDown();

				break;
		}
		}
	});
	$(document).bind('keyup',function(e){
		if(keyIsDown){
		keyIsDown = false;
		switch(e.keyCode)
		{
			case(37):
				// Left
				stopWalking();
				stopAnimation();
				break;
			case(39):
				// Right
				stopWalking();
				stopAnimation();
				break;
		}
		}
	});
}