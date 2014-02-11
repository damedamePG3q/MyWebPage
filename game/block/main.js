window.onload=init;

function init(){
	var d=document;
	var game;
	var main;
	main=d.getElementById("tetris");
	game = new Tetris();
	game.init(main);
}
