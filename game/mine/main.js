window.onload=init;

function init(){
	var d=document;
	var mine = new Mine();
	var main = d.getElementById("game");
	mine.init(game,12,12,32);
}	