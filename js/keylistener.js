function initKeyListener()
{
	$(document).bind('keydown',function(e){

		switch(e.keyCode)
		{
			case(37):
				// Left
				moveLeft();

				break;
			case(38):
				// Up
				moveUp();

				break;
			case(39):
				// Right
				moveRight();

				break;
			case(40):
				// Down
				moveDown();

				break;
		}	
	});
	$(document).bind('keyup',function(e){
		switch(e.keyCode)
		{
			case(37):
				// Left
				stopAnimation();
				break;
			case(39):
				// Right
				stopAnimation();
				break;
		}
	});
}