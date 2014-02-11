/*******************
テトリスクラス
********************/
/*
	//SamleCode
	main=d.getElementById("tetris");
	game = new Tetris();
	game.init(main);
*/


var Tetris = function(){

	//STYLE CSS CLASS
	var styleBlock0="TETRIS_BLOCK_0";
	var styleBlock1="TETRIS_BLOCK_1";
	var styleBlock2="TETRIS_BLOCK_2";
	var styleBlock3="TETRIS_BLOCK_3";
	var styleBlock4="TETRIS_BLOCK_4";
	var styleBlock5="TETRIS_BLOCK_5";
	var styleBlock6="TETRIS_BLOCK_6";
	var styleBlock7="TETRIS_BLOCK_7";
	var styleBlockNone="TETRIS_BLOCK_NONE";	
	
	var styleMainBox="TETRIS_MAIN_BOX";
	var styleNextBox="TETRIS_NEXT_BOX";

	var styleNextLabel="TETRIS_NEXT_LABEL";
	var styleNextText="TETRIS_NEXT_TEXT";
	var styleLinsLabel="TETRIS_LINES_Label";
	var styleLinsText="TETRIS_LINES_TEXT";

	//Class---------------------------------------------------------------------
	var Block=function(){
		this.posX;
		this.posY;
		this.blockNo;
		this.rotateNo;
		this.blockPatten;

		//CONST
		var BLOCK_L0=[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,1,0,0,0]];
		var BLOCK_L1=[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,1,0]];
		var BLOCK_L2=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,0],[0,1,1,1,0]];
		var BLOCK_L3=[[0,0,0,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0]];
		var BLOCK_J0=[[0,0,0,0,0],[0,0,0,0,0],[0,2,2,2,0],[0,0,0,2,0]];
		var BLOCK_J1=[[0,0,0,0,0],[0,0,2,2,0],[0,0,2,0,0],[0,0,2,0,0]];
		var BLOCK_J2=[[0,0,0,0,0],[0,0,0,0,0],[0,2,0,0,0],[0,2,2,2,0]];
		var BLOCK_J3=[[0,0,0,0,0],[0,0,2,0,0],[0,0,2,0,0],[0,2,2,0,0]];
		var BLOCK_T0=[[0,0,0,0,0],[0,0,0,0,0],[0,3,3,3,0],[0,0,3,0,0]];
		var BLOCK_T1=[[0,0,0,0,0],[0,0,3,0,0],[0,0,3,3,0],[0,0,3,0,0]];
		var BLOCK_T2=[[0,0,0,0,0],[0,0,0,0,0],[0,0,3,0,0],[0,3,3,3,0]];
		var BLOCK_T3=[[0,0,0,0,0],[0,0,3,0,0],[0,3,3,0,0],[0,0,3,0,0]];
		var BLOCK_S0=[[0,0,0,0,0],[0,0,0,0,0],[0,0,4,4,0],[0,4,4,0,0]];
		var BLOCK_S1=[[0,0,0,0,0],[0,0,4,0,0],[0,0,4,4,0],[0,0,0,4,0]];
		var BLOCK_Z0=[[0,0,0,0,0],[0,0,0,0,0],[0,5,5,0,0],[0,0,5,5,0]];
		var BLOCK_Z1=[[0,0,0,0,0],[0,0,5,0,0],[0,5,5,0,0],[0,5,0,0,0]];
		var BLOCK_I0=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[6,6,6,6,0]];
		var BLOCK_I1=[[0,0,6,0,0],[0,0,6,0,0],[0,0,6,0,0],[0,0,6,0,0]];
		var BLOCK_B0=[[0,0,0,0,0],[0,0,0,0,0],[0,7,7,0,0],[0,7,7,0,0]];
		
		var BLOCK_PATTERN_LIST=create2dArray(7,4);
		BLOCK_PATTERN_LIST[0][0]=BLOCK_L0;
		BLOCK_PATTERN_LIST[0][1]=BLOCK_L1;
		BLOCK_PATTERN_LIST[0][2]=BLOCK_L2;
		BLOCK_PATTERN_LIST[0][3]=BLOCK_L3;
		BLOCK_PATTERN_LIST[1][0]=BLOCK_J0;
		BLOCK_PATTERN_LIST[1][1]=BLOCK_J1;
		BLOCK_PATTERN_LIST[1][2]=BLOCK_J2;
		BLOCK_PATTERN_LIST[1][3]=BLOCK_J3;
		BLOCK_PATTERN_LIST[2][0]=BLOCK_T0;
		BLOCK_PATTERN_LIST[2][1]=BLOCK_T1;
		BLOCK_PATTERN_LIST[2][2]=BLOCK_T2;
		BLOCK_PATTERN_LIST[2][3]=BLOCK_T3;
		BLOCK_PATTERN_LIST[3][0]=BLOCK_S0;
		BLOCK_PATTERN_LIST[3][1]=BLOCK_S1;
		BLOCK_PATTERN_LIST[3][2]=BLOCK_S0;
		BLOCK_PATTERN_LIST[3][3]=BLOCK_S1;
		BLOCK_PATTERN_LIST[4][0]=BLOCK_Z0;
		BLOCK_PATTERN_LIST[4][1]=BLOCK_Z1;
		BLOCK_PATTERN_LIST[4][2]=BLOCK_Z0;
		BLOCK_PATTERN_LIST[4][3]=BLOCK_Z1;
		BLOCK_PATTERN_LIST[5][0]=BLOCK_I0;
		BLOCK_PATTERN_LIST[5][1]=BLOCK_I1;
		BLOCK_PATTERN_LIST[5][2]=BLOCK_I0;
		BLOCK_PATTERN_LIST[5][3]=BLOCK_I1;
		BLOCK_PATTERN_LIST[6][0]=BLOCK_B0;
		BLOCK_PATTERN_LIST[6][1]=BLOCK_B0;
		BLOCK_PATTERN_LIST[6][2]=BLOCK_B0;
		BLOCK_PATTERN_LIST[6][3]=BLOCK_B0;
		
		this.setBlockPatern = function(blockNo,rotateNo){
			this.blockNo = blockNo;
			this.rotateNo = rotateNo;
			this.blockPatten=getBlockPatern(blockNo,rotateNo);
		}
		
		this.moveX=function(vectorX){
			this.posX += vectorX;
		}
		
		this.moveY=function(vectorY){
			this.posY += vectorY;	
		}
		
		this.rotateL=function(){
			if(this.rotateNo>=3){this.rotateNo=0;}else{this.rotateNo++;}
			this.blockPatten=getBlockPatern(this.blockNo,this.rotateNo)
		}
		
		this.rotateR=function(){
			if(this.rotateNo<0){this.rotateNo=3;}else{this.rotateNo--;}
			this.blockPatten=getBlockPatern(this.blockNo,this.rotateNo)	
		}
		
		function getBlockPatern(blockNo,rotateNo){
			return BLOCK_PATTERN_LIST[blockNo][rotateNo];
		}

		//
		function create2dArray(y,x){
			var arr,i;
			arr = new Array(y);
			for(i=0;i<y;i++){arr[i]=new Array(x);}
			return arr;
		}
	}
	
	function copyBlock(cpFrom,cpTo){
		cpTo.posX = cpFrom.posX;
		cpTo.posY = cpFrom.posY;
		cpTo.blockNo = cpFrom.blockNo;
		cpTo.rotateNo = cpFrom.rotateNo;
		cpTo.blockPattern = cpFrom.blockPattern;
	}

	//COMMON-------------------------------------------------------------------
	function setupTable(elm,arr,y,x,c){
		var d=document;
		var tb,tr,td,i,j;
		tb=d.createElement("TBODY");
			
		for(i=0;i<y;i++){
			tr=d.createElement("TR");
			for(j=0;j<x;j++){
				td=d.createElement("TD");
				td.innerHTML=c;
				arr[i][j]=td;
				tr.appendChild(td);
			}
			tb.appendChild(tr);
		}
		elm.appendChild(tb);
	}

	function create2dArray(y,x){
		var arr,i;
		arr = new Array(y);
		for(i=0;i<y;i++){arr[i]=new Array(x);}
		return arr;
	}

	function init2dArray(a,v){
		var i,j,li,lj;
		li = a.length;
		for(i=0;i<li;i++){
			lj=a[i].length;
			for(j=0;j<lj;j++){
				a[i][j]=v;
			}
		}
	}
	
	//CROSS BLOWSER----------------------------------------------------------------------
	
	function getKeyCode(e){
		if (document.all){
			return event.keyCode;
		}else{
			return e.keyCode;
		}
	}
	
	function addEvent(elm,ev,fnc){
		if(d.all){
			elm.attachEvent("on"+ ev,fnc);
		}else{
			elm.addEventListener(ev,fnc,false);
		}
	}

	//SUB----------------------------------------------------------------------
	function setBlockMap(block,map,h,w){
		var i,j;
		var currentX;
		var currentY;
		for(i=0;i<4;i++){
			for(j=0;j<5;j++){
				if(block.blockPatten[i][j]==0){continue;}
				currentX = block.posX + j;
				currentY = block.posY + i;
				if(currentX < 0 || currentX >= w || currentY < 0 || currentY >= h){continue;}
				map[currentY][currentX]=block.blockPatten[i][j];
			}
		}	
	}

	function setMapDisp(map,tableElms,y,x){
		var i,j;
		for(i=0;i<y;i++){
			for(j=0;j<x;j++){
				if(map[i][j]==0){
					tableElms[i][j].innerHTML="&nbsp;";
					tableElms[i][j].className=styleBlockNone;
				}else{
					tableElms[i][j].innerHTML="&nbsp;";
					tableElms[i][j].className=blockClassList[map[i][j]];
				}
			}
		}
	}

	function clearTableDisp(tableElms,y,x){
		var i,j;
		for(i=0;i<y;i++){
			for(j=0;j<x;j++){
				
				tableElms[i][j].innerHTML="&nbsp;";
				tableElms[i][j].className=styleBlockNone;
			}
		}
	}


	function setBlockDisp(block,tableElms,w,h){
		var i,j;
		var currentX;
		var currentY;	
		for(i=0;i<4;i++){
			for(j=0;j<5;j++){
				if(block.blockPatten[i][j]==0){continue;}
				currentX = block.posX + j;
				currentY = block.posY + i;
				if(currentX < 0 || currentX >= w || currentY < 0 || currentY >= h){continue;}
				tableElms[currentY][currentX].innerHTML="&nbsp;";
				tableElms[currentY][currentX].className=blockClassList[block.blockPatten[i][j]];
			}
		}	
	}

	function checkBlockOk(block,map,h,w){
		var i,j;
		var currentX;
		var currentY;
		
		for(i=0;i<4;i++){
			for(j=0;j<5;j++){
				if(block.blockPatten[i][j]==0){continue;}
				currentX = block.posX + j;
				currentY = block.posY + i;
				if(currentX < 0){return 1;}
				if(currentX >= w){return -1;}
				if(currentY < 0 || currentY >= h){return -2;}
				if(map[currentY][currentX]!=0){return -2;}
			}
		}
		return 0;
	}

	//MAIN---------------------------------------------------------------------
	
	//KeyCode
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var KEY_SPACE = 32;

	//BORAD_SIZE
	var MAIN_BLOCK_CELL_MAX_X=10;
	var MAIN_BLOCK_CELL_MAX_Y=20;

	//Elment
	var startButton;
	var mainBlcokTable;
	var nextBlockTable;
	var blockElms;		//Array MainBlockElements;
	var nextBlockElms;
	
	var elmLines;
	var elmScore;
	var elmDeb;

	//Object
	var d=document;
	var myBlock;
	var nextBlock;
	var vtBlock;

	//Variable
	var keyUp = 0;
	var keyDown = 0;
	var keyLeft = 0;
	var keyRight = 0;
	var keySpace = 0;

	var keyLeftF = 0;
	var keyLeftWait = 0;

	var keyRightF = 0;
	var keyRightWait = 0;
	var fallWait = 10;

	var status=0;		//0:FREE,	1:DROP_WAIT,	2:NEXT_BLOCK,	3:EFECT_WAIT	4:GAME_OVER
	var lines=0;

	var blockMap;		//Array MainBlockTable
	var countTimer;		//
	var nextF;			//
	var conrolMarginF=false;
	var blockClassList;
	
	var score=0;
	var SCORE_LIST=[0,100,300,600,1600];
	var SCORE_ALL_CLEAR=5000;
	
	this.init = function(elm){
		cleateTetris(elm);
	}
	
	function cleateTetris(mainElm){
		var d=document;
		var elm;
		var br=d.createElement("BR");
		
		blockClassList=new Array(8);
		blockClassList[0]=styleBlock0;
		blockClassList[1]=styleBlock1;
		blockClassList[2]=styleBlock2;
		blockClassList[3]=styleBlock3;
		blockClassList[4]=styleBlock4;
		blockClassList[5]=styleBlock5;
		blockClassList[6]=styleBlock6;
		blockClassList[7]=styleBlock7;
		
		//KEYEVENT
		addEvent(d,"keydown",keyDownProc);
		addEvent(d,"keyup",keyUpProc);
		
		//START_BUTTON
		startButton=d.createElement("SPAN");
		//startButton.type="button";
		startButton.innerHTML="START";
		mainElm.appendChild(startButton);
		startButton.onclick=startEvent;
				
		//NEXT
		elm=d.createElement("DIV");
		elm.innerHTML="NEXT";
		mainElm.appendChild(elm);
		nextBlockElms=create2dArray(4,5);
		nextBlockTable=d.createElement("TABLE");
		nextBlockTable.className=styleNextBox;
		mainElm.appendChild(nextBlockTable);
		setupTable(nextBlockTable,nextBlockElms,4,5,"　");
		mainElm.appendChild(br);
		
		
		//MAINTTABLE
		blockElms=create2dArray(MAIN_BLOCK_CELL_MAX_Y,MAIN_BLOCK_CELL_MAX_X)
		mainBlcokTable=d.createElement("TABLE");
		mainBlcokTable.className=styleMainBox;
		mainElm.appendChild(mainBlcokTable);
		setupTable(mainBlcokTable,blockElms,MAIN_BLOCK_CELL_MAX_Y,MAIN_BLOCK_CELL_MAX_X,"　");
		blockMap=create2dArray(MAIN_BLOCK_CELL_MAX_Y,MAIN_BLOCK_CELL_MAX_X);

		//LINS
		elm=d.createElement("SPAN");
		elm.innerHTML="LINES:";
		mainElm.appendChild(elm);
		elmLines=d.createElement("SPAN");
		elmLines.innerHTML=lines;
		mainElm.appendChild(elmLines);
		mainElm.appendChild(br);
		

		//SCORE
		elm=d.createElement("SPAN");
		elm.innerHTML="SCORE:";
		mainElm.appendChild(elm);
		elmScore=d.createElement("SPAN");
		elmScore.innerHTML=score;
		mainElm.appendChild(elmScore);

		//DEBUG
		elmDeb=d.createElement("DIV");
		mainElm.appendChild(elmDeb);
		
		//OBJECT
		myBlock = new Block();
		nextBlock = new Block();
		vtBlock = new Block();
	}
	
	function startEvent(){
		startButton.style.visibility="hidden";
		startButton.blur();
		reset();
		main();
	}

	function reset(){

		myBlock.posX=2;
		myBlock.posY=-2;
		myBlock.setBlockPatern(Math.round(Math.random()*6,0),0);

		nextBlock.posX=0;
		nextBlock.posY=-1;
		nextBlock.setBlockPatern(Math.round(Math.random()*6,0),0);
		
		init2dArray(blockMap,0);

		status=0;
		countTimer=0;
		nextF=false;
		lines=0;
		score=0;		
		elmLines.innerHTML=lines;	
	}

	function main(){
		var controlF=false;
		var delLines;
		
		switch(status){
			case 0:
				if(control()){conrolMarginF=true;}
				if(countTimer>fallWait){
					if(autoFall()){
						if(conrolMarginF){
							if(countTimer>fallWait+10){
								status=1;
								conrolMarginF=false;
							}
							
						}else{
							status=1;
							conrolMarginF=false;
						}
					}else{
						countTimer=0;
						conrolMarginF=false;	
					}	
				}
				break;
			case 1:	//停止
				if(countTimer>1){
					status=2;countTimer=0;
				}
				break;
			case 2:	//置く
				putBlock();
				delLines=delLine();
				score+=SCORE_LIST[delLines];
				if(delLines>0){
					lines+=delLines;
					if(lines%10 == 0){
						fallWait--;
						if(fallWait < 0){fallWait = 0;} 
					}
					if(isAllCrear())score+=SCORE_ALL_CLEAR;
				}
				status=3;countTimer=0;
				break;
			case 3:
				if(next()!=0){status=4;break;}
				status=0;countTimer=0;
				break;
			case 4:
				startButton.style.visibility="visible";
				return;
				break;
		}

		//DISP
		clearTableDisp(blockElms,20,10);
		setMapDisp(blockMap,blockElms,20,10);
		setBlockDisp(myBlock,blockElms,MAIN_BLOCK_CELL_MAX_X,MAIN_BLOCK_CELL_MAX_Y);
		elmScore.innerHTML=score;

		clearTableDisp(nextBlockElms,4,5);
		setBlockDisp(nextBlock,nextBlockElms,4,5);
		elmLines.innerHTML=lines;
		//elmDeb.innerHTML=fallWait + " : "+ controlF +"  :  "+countTimer;
		countTimer++;	
		setTimeout(main,16);
	}

	function next(){
		myBlock.posX=2;
		myBlock.posY=-2;
		myBlock.setBlockPatern(nextBlock.blockNo,nextBlock.rotateNo);

		nextBlock.posX=0;
		nextBlock.posY=-1;
		nextBlock.setBlockPatern(Math.round(Math.random()*6,0),0);
		return checkBlockOk(myBlock,blockMap,20,10);
	}

	function putBlock(){
		setBlockMap(myBlock,blockMap,20,10);
	}

	//Control;

	function control(){
		var controlF=false;
		var vectX=0;
		var vectY=0;
		 
		copyBlock(myBlock,vtBlock);
		vtBlock.setBlockPatern(vtBlock.blockNo,vtBlock.rotateNo);

		controlF=false;

		//ROTETE
		if(keySpace == 1){
			vtBlock.rotateL();
			if(checkBlockOk(vtBlock,blockMap,20,10)==0){
				myBlock.rotateL();controlF=true;
			}
			keySpace=0;
		}

		//LEFT
		if(keyLeft==1 && keyRight == 0){
			if(keyLeftF == 0){
				vectX = -1;
				keyLeftF = 1;
				keyLeftWait=0;
			}else if(keyLeftF == 1){
				if(keyLeftWait<5){
					keyLeftWait++;
				}else{
					keyLeftWait=0;
					keyLeftF = 2;
				}
			}else{
				vectX = -1;		
			}
		}else if(keyLeft==0){
			keyLeftWait=0;
			keyLeftF=0;
			keyLeftWait++;
		}	
		
		//Right
		if(keyRight==1 && keyLeft == 0){
			if(keyRightF==0){
				vectX = 1;
				keyRightF = 1;
				keyRightWait=0;
			}else if(keyRightF == 1){
				if(keyRightWait<5){
					keyRightWait++;
				}else{
					keyRightWait=0;
					keyRightF = 2;
				}
			}else{
				vectX = 1;
			}
		}else if(keyRight==0){
			keyRightWait=0;
			keyRightF=0;
			keyRightWait++;
		}
			
		if(vectX!=0){
			vtBlock.moveX(vectX);
			if(checkBlockOk(vtBlock,blockMap,20,10)==0){myBlock.moveX(vectX);controlF=true;}
		}
		//Down
		if(keyDown==1){
			vtBlock.moveY(1);	
			if(checkBlockOk(vtBlock,blockMap,20,10)==0){myBlock.moveY(1);countTimer=0;score++;}
		}
		return controlF;
	}

	function autoFall(){
		copyBlock(myBlock,vtBlock);
		vtBlock.setBlockPatern(vtBlock.blockNo,vtBlock.rotateNo);
		vtBlock.moveY(1);	
		if(checkBlockOk(vtBlock,blockMap,20,10)==0){myBlock.moveY(1);}else{return true;}
		return false;
	}

	function delLine(){
		var i,j,k,f;
		var cp;
		var c=0;
		var r=0;
		var h=20;
		var w=10;
		
		cp = create2dArray(h,w);
		init2dArray(cp,0);
		c=h-1;
		
		for(i=c;i>=0;i--){
			f=true;
			for(j=0;j<w;j++){
				if(i==19){
					//alert("map"+ i +" : "+ j +" = "+map[i][j]);
				}
				if(blockMap[i][j]==0){f=false;}
			}
			if(f==false){
				//alert("dell");
				for(j=0;j<w;j++){
					cp[c][j]=blockMap[i][j];
				}
				c--;
			}else{
				r++;
			}
		}
		blockMap = cp;
		return r;
	}
	
	function isAllCrear(){
		var i,j;
		for(i=0;i<MAIN_BLOCK_CELL_MAX_Y;i++){
			for(j=0;j<MAIN_BLOCK_CELL_MAX_X;j++){
				if(blockMap[i][j]){return false;}
			}
		}
		return true;
	}	

	function keyDownProc(e){
		var keyCd;
		keyCd = getKeyCode(e);
		if(keyCd == KEY_UP){keyUp = 1;}
		if(keyCd == KEY_DOWN){keyDown = 1;}
		if(keyCd == KEY_LEFT){keyLeft = 1;}
		if(keyCd == KEY_RIGHT){keyRight = 1;}
		if(keyCd == KEY_SPACE){keySpace = 1;}
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

	function keyInit(){
		keyUp=0;
		keyDown=0;
		keyLeft=0;
		keyRight=0;
		keySpace=0;
	}
}