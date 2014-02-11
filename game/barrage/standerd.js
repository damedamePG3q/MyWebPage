function getKeyCode(e){
	if (document.all){
		return event.keyCode;
	}else{
		return e.keyCode;
	}
}