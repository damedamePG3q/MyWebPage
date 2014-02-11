var Player = function(){
	this.x;
	this.y;
	this.width;
	this.height;
	this.elm;
	this.onOff=false;

	this.hitWidth;
	this.hitHeight;	

	this.init = function(x,y,w,h){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
	
	this.setHitSize = function(w,h){
		this.hitWidth = w;
		this.hitHeight = h;
	}
	
	this.updatePos = function(){
		this.elm.style.left = this.x;
		this.elm.style.top = this.y;
	}

	this.moveUp = function(v){
		this.y = this.y - v;
		this.elm.style.top = this.y;
	}
	this.moveDown = function(v){
		this.y = this.y + v;
		this.elm.style.top = this.y;
	}

	this.moveLeft = function(v){
		this.x = this.x - v;
		this.elm.style.left = this.x;
	}

	this.moveRight = function(v){
		this.x = this.x + v;
		this.elm.style.left = this.x;
	}
}
