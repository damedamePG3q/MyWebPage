//CONST		--------------------------------------------------------------------

//KeyCode
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;

//GAME
var MAIN_AREA_WIDTH=320;
var MAIN_AREA_HEIGHT=240;

//PLAYER
var PLAYER_WIDTH=16;
var PLAYER_HEIGHT=16;

var TARGET_WIDTH=16;
var TARGET_HEIGHT=16;

//BALL
var MAX_BALLS=100;
var BALL_WIDTH=16;
var BALL_HEIGHT=16;

var BALL_HIT_WIDTH=10;
var BALL_HIT_HEIGHT=10;

var MAX_VECTOR=16;

//GLOBAL		--------------------------------------------------------------------
var d=document;

//HTML Element
var mainArea;	//
var msgArea;
var start;

//Object
var player;		//
var ball;
var target;

var deb;

//Value
var keyUp = 0;
var keyDown = 0;
var keyLeft = 0;
var keyRight = 0;
var keySpace = 0;

//
var balls=5;

var life=3;
var level=1;
var score=0;
var itemCnt=0;

//Main		--------------------------------------------------------------------
window.onload=init;

function init(){
	var i;
	var elm;

	//Event
	d.onkeydown=keyDownProc;
	d.onkeyup=keyUpProc;

	//
	mainArea = d.getElementById("mainArea");

	//Player
	player = new Player();
	elm = d.getElementById("player");
	player.elm = elm;
	player.init(160,120,PLAYER_WIDTH,PLAYER_HEIGHT);
	player.setHitSize(PLAYER_WIDTH,PLAYER_HEIGHT);
	player.updatePos();

	target = new Target();
	elm = d.getElementById("target");
	elm.innerHTML="T";
	target.elm=elm;
	target.init(160,120,TARGET_WIDTH,TARGET_HEIGHT);
	target.setHitSize(TARGET_WIDTH,TARGET_HEIGHT);
	setRandomInSide(target,MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT,20);
	target.updatePos();

	//Ball
	ball = new Array(MAX_BALLS);
	for (i=0;i<MAX_BALLS;i++){
		elm = d.createElement("SPAN");
		elm.className="ball";
		elm.innerHTML="œ";
		ball[i]=new Ball();
		ball[i].init(0,0,BALL_WIDTH,BALL_HEIGHT,elm);
		ball[i].setHitSize(BALL_HIT_WIDTH,BALL_HIT_HEIGHT);
		ball[i].hide();
		setRandomOutSide(ball[i], MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT);
		setRandomVector(ball[i],MAX_VECTOR,(ball[i].width * -1),MAIN_AREA_WIDTH,(ball[i].height * -1),MAIN_AREA_HEIGHT);
		ball[0].go();
		mainArea.appendChild(elm);
	}
	deb = d.getElementById("deb");	

	elm = d.createElement("INPUT");
	elm.type="button";
	elm.value="START";
	elm.onclick=start;
	
	mainArea.appendChild(elm);
	start = elm;
	//main();	
}


function start(){
	start.style.visibility="hidden";
	reset();
	main();	
}

function reset(){
	life = 3;
	balls=30;
	score=0;
	level=1;
	itemCnt=0;
	initBall();
}

function main(){
	var gameOverF=false;
	var hitF=false;
	var hitBall=-1;
	
	//CONTROL
	playerControl();
	ballControl();
	
	//DAMAGE JUDGE
	hitBall = ballHit();
	if(hitBall >= 0){
		//alert(hitBall);
		hitF = true;
		life--;	
		if(life < 0){
			gameOverF = true;
		}else{
			ball[hitBall].hide();
			setRandomOutSide(ball[hitBall], MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT);
			setRandomVector(ball[hitBall],MAX_VECTOR,(ball[hitBall].width * -1),MAIN_AREA_WIDTH,(ball[hitBall].height * -1),MAIN_AREA_HEIGHT);	
		}
	}
	//ITEM GET
	if(isHitRecObject(player,target)){
		setRandomInSide(target,MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT,20);
		target.updatePos();
		itemCnt++;
		score++;
	}
	
	
	//DISP
	if(hitF){
		mainArea.style.backgroundColor="red";
	}else{
		mainArea.style.backgroundColor="skyblue";
	}
	deb.innerHTML= score;		

	if(gameOverF){gameOver();return;}
	setTimeout(main,100);
}

function gameOver(){
	start.style.visibility="visible";
}

function playerControl(){
	var sp = 4;

	//SPEED
	if (keySpace == 1){sp = 2};

	//ª«©¨
	if(keyUp == 1){
		if(player.y > 0){player.moveUp(sp);}
	}
	if(keyDown == 1){
		if (player.y + player.height < MAIN_AREA_HEIGHT){
			player.moveDown(sp);
		}
	}

	if(keyLeft == 1){
		if(player.x > 0){player.moveLeft(sp);}
	}
	if(keyRight == 1){
		if (player.x + player.width < MAIN_AREA_WIDTH){player.moveRight(sp);}
	}
}

function ballControl(){
	var i;
	var debMsg;

	for (i=0;i<balls;i++){
		ball[i].show();
		if	( 	(ball[i].x + ball[i].width >= 0) &&  (ball[i].x <= MAIN_AREA_WIDTH) &&
				(ball[i].y + ball[i].height >= 0) && (ball[i].y <= MAIN_AREA_HEIGHT)){
			ball[i].go();
		}else{
			setRandomOutSide(ball[i], MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT);
			setRandomVector(ball[i],MAX_VECTOR,(ball[i].width * -1),MAIN_AREA_WIDTH,(ball[i].height * -1),MAIN_AREA_HEIGHT);
			//ball[i].reset();
		}
		//deb.innerHTML+=i;
	}
}

//Control;
function keyDownProc(e){
	var keyCd;
	keyCd = getKeyCode(e);
	if(keyCd == KEY_UP){keyUp = 1;}
	if(keyCd == KEY_DOWN){keyDown = 1;}
	if(keyCd == KEY_LEFT){keyLeft = 1;}
	if(keyCd == KEY_RIGHT){keyRight = 1;}
	if(keyCd == KEY_SPACE){keySpace = 1;}
	//deb.innerHTML=keyCd;

}

function keyUpProc(e){
	var keyCd;
	keyCd = getKeyCode(e);
	if(keyCd == KEY_UP){keyUp = 0;}
	if(keyCd == KEY_DOWN){keyDown = 0;}
	if(keyCd == KEY_LEFT){keyLeft = 0;}
	if(keyCd == KEY_RIGHT){keyRight = 0;}
	if(keyCd == KEY_SPACE){keySpace = 0;}
}

function ballHit(){
	var i;	
	for(i=0;i<balls;i++){
		if(isHitRecObject(player,ball[i]))return i;
	}
	return -1
}

function initBall(){
	var i;
	for (i=0;i<balls;i++){
		setRandomOutSide(ball[i], MAIN_AREA_WIDTH, MAIN_AREA_HEIGHT);
		setRandomVector(ball[i],MAX_VECTOR,(ball[i].width * -1),MAIN_AREA_WIDTH,(ball[i].height * -1),MAIN_AREA_HEIGHT);
	}
}
