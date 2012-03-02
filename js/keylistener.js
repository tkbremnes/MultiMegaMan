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
				startWalking('L');
				startAnimation();

				break;
			case(38):
				// Up
				jump();

				break;
			case(39):
				// Right
				startWalking('R');
				startAnimation();

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