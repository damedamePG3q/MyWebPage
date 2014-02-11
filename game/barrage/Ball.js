var Ball = function(){
	this.x;			//座標
	this.y;
	this.height;
	this.width;
	this.onOff=false;
	
	this.hitWidth;	//当たり判定サイズ
	this.hitHeigh;	
	
	this.vectorX;
	this.vectorY;
	
	this.init = function(x,y,w,h,elm){
		this.x = x;
		this.y = y;
		this.height = h;
		this.width = w;
		this.elm = elm;
		this.onOff=false;
	}
	
	this.setHitSize = function(w,h){
		this.hitWidth = w;
		this.hitHeight = h;
	}

	this.go = function(){
		this.x = this.x + this.vectorX;
		this.y = this.y + this.vectorY;
		this.elm.style.left = this.x;
		this.elm.style.top = this.y;
	}

	this.hide = function(){
		this.elm.style.visibility="hidden";
		this.onOff=false;	
	}

	this.show = function(){
		this.elm.style.visibility="visible";
		this.onOff=true;
	}
	
	this.updatePos = function(){
		this.elm.style.left = this.x;
		this.elm.style.top = this.y;
	}

	



}