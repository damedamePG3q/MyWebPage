/******************
マインスイーパー
*******************/
/*
	//Sample Code
	var mine = new Mine();
	var main = d.getElementById("game");
	mine.init(game,8,8,4);

	//
	init(HTML_DIV_ELEMENT,CELL_Y,CELL_X,BOMBS)
		引数１：対象となるDIVエレメント
		引数２：ゲーム盤の縦のマスの数
		引数３：ゲーム盤の横のマスの数
		引数４：爆弾の数
*/

var Mine=function(){

	//CSS
	var CSS_CELL_N="MINE_N";
	var CSS_CELL_NO=["MINE_V0","MINE_V1","MINE_V2","MINE_V3","MINE_V4","MINE_V5","MINE_V6","MINE_V7","MINE_V8"];
	var CSS_CELL_BOM="MINE_BOM";
	var CSS_CELL_MISS="MINE_MISS";
	var CSS_CELL_FLG="MINE_FLG";
	var CSS_CELL_FLG_OK="MINE_FLG_OK";
	var CSS_CELL_FLG_NG="MINE_FLG_NG";
	var CSS_CELL_FLG_Q="MINE_FLG_Q";
	
	
	//CONST
	var MAIN_BOARD_W=8;
	var MAIN_BOARD_H=8;
	
	var bombs=8;	
	
	//ELEMENT
	var mainElm;
	var mapElms;
	var startBtn;
	var timerDisp;
	
	//OBJECT
	var d=document;
	var startTime;
	
	//ARRAY
	var bombMap;
	var dispMap;
	
	//
	var gameOver=true;
	var timerF=false;
	var firstF=false;
	
	//ie;
	
	
	this.init=function(elm,h,w,b){
		MAIN_BOARD_W=w;
		MAIN_BOARD_H=h;
		bombs=b;
		
		
		
		makeGameBody(elm);
		mainElm=elm;
	
		document.oncontextmenu=setFlag;
	}
	
	function makeGameBody(elm){
		var bomb;
		mainElm=elm;
		bombMap=create2DArray(MAIN_BOARD_H,MAIN_BOARD_W,0);
		dispMap=create2DArray(MAIN_BOARD_H,MAIN_BOARD_W,0);
		mapElms=create2DArray(MAIN_BOARD_H,MAIN_BOARD_W,null);
		makeMainTable();
		
		startBtn=d.createElement("INPUT");
		startBtn.type="BUTTON";
		startBtn.value="RESET";
		
		
		//startBtn.onclick=startEvent;
		
		addEvent(startBtn,"click",startEvent);
		
		mainElm.appendChild(startBtn);

		elm=d.createElement("SPAN");
		elm.innerHTML="TIME:";
		mainElm.appendChild(elm);
		timerDisp=d.createElement("SPAN");
		timerDisp.innerHTML="00:00:00.000";
		mainElm.appendChild(timerDisp);

		reset();
		disp();
		return;
	}
	
	function initGame(n){
		bomb=createRandomArray(bombs,MAIN_BOARD_H*MAIN_BOARD_W,n);
		initBombMap(bomb);
	}
	
	function startEvent(){
		reset();
		disp();
	}
	
	function reset(){
		gameOver=false;
		init2dArray(dispMap,0);
		init2dArray(bombMap,0);
		startTime = new Date();
		firstF=true;
		timerF=false;
		setTimeout(lateValueSet_A,10);
	}
	
	function lateValueSet_A(){
		setInnerHTML(timerDisp,"00:00:00.000");
	}
	
	function timer(){
		var nowTime;
		var h,m,s,ns;
		var time;
		now = new Date();
		time=now.getTime() - startTime.getTime();
		s=Math.floor(time/1000);
		ms=time%1000;
		m = Math.floor(s/60);
		s -= m * 60;
		h = Math.floor(m/60);
		m -= h * 60;
		if(h <10){h="0"+h;};
		if(m <10){m="0"+m;};
		if(s <10){s="0"+s;};
		if(ms <10){ms="00"+ms;}else if(ms < 100){ms="0"+ms;}
		timerDisp.innerHTML=h +":"+ m +":"+ s +"."+ ms;
		if(timerF){setTimeout(timer,1)}
	}
	
	function cellClick(e){
		var x;
		var y;
		var a;
		var t;
		var f=false;

		if(gameOver)return;
		t=event.srcElement.tag;
		if(t==undefined)return;
		
		y=eval(Math.floor(t/MAIN_BOARD_W));
		x=eval(Math.floor(t%MAIN_BOARD_W));
		
		if(firstF){
			initGame(eval(t));
			firstF=false;
			timerF=true;
			timer();
		}		

		if(dispMap[y][x]==0){
			dispMap[y][x]=(bombMap[y][x]==0)?1:2;
			open();
		}
		
		if(bombMap[y][x]==-1){
			dispMap[y][x]=4;
			timerF=false;
			gameOver=true;
			mapFullOpen();
		}
		
		if(endCheck()){
			timerF=false;
			gameOver=true;
			mapFullOpen();
		}
		disp();
	}

	function setFlag(){
		var x,y,a,t,v;
		if(gameOver)return false;
		if(firstF)return false;
		t=event.srcElement.tag;
		if(t==undefined){return false;}
		
		y=eval(Math.floor(t/MAIN_BOARD_W));
		x=eval(Math.floor(t%MAIN_BOARD_W));
		v=dispMap[y][x];
		if(v==0){
			dispMap[y][x]=3;
		}else if(v==3){
			dispMap[y][x]=7;
		}else if(v==7){
			dispMap[y][x]=0;
		}
		disp();
		return false;	
	}

	function endCheck(){
		var i,j,c;
		c=0;
		for(i=0;i<MAIN_BOARD_H;i++){
			for(j=0;j<MAIN_BOARD_W;j++){
				if(dispMap[i][j]==0||dispMap[i][j]==3){c++;}
			}
		}
		if(bombs==c){return true;}
		return false;
	}

	function disp(){
		var i,j;
		var v=cln="";
		for(i=0;i<MAIN_BOARD_H;i++){
			for(j=0;j<MAIN_BOARD_W;j++){
				switch(dispMap[i][j]){
					case 0: //CLOSED
						v="&nbsp;&nbsp;";
						cln=CSS_CELL_N;
						break;
					case 2:	//OPEN
						v=(bombMap[i][j]==-1)?"*":bombMap[i][j];						
						v=(v==0)?"&nbsp;&nbsp;":v;
						cln=CSS_CELL_NO[bombMap[i][j]];
						break;
					case 3: //FLAG
						v="!";cln=CSS_CELL_FLG;break;
					case 4: //OPEN_BOMB_
						v="*";cln=CSS_CELL_MISS;break;
					case 5: //OPEN_FLAG_OK
						v="*";cln=CSS_CELL_FLG_OK;break;
					case 6: //OPEN_FLAG_NG
						v=(bombMap[i][j]==-1)?"*":bombMap[i][j];						
						v=(v==0)?"&nbsp;&nbsp;":v;
						cln=CSS_CELL_FLG_NG;
						break;
					case 7:
						v="?";cln=CSS_CELL_FLG;break;
					case 8:
						v=(bombMap[i][j]==-1)?"*":bombMap[i][j];						
						v=(v==0)?"&nbsp;&nbsp;":v;
						cln=CSS_CELL_FLG_Q;
						break;
				}
				mapElms[i][j].innerHTML=v;
				mapElms[i][j].className=cln;
			}
		}
	}


	function open(){
		var i,j,a,b;
		var f=true;
		var v;
		while(f){
			f=false;
			LABEL_1:
			for(i=0;i<MAIN_BOARD_H;i++){
				for(j=0;j<MAIN_BOARD_W;j++){
					if(dispMap[i][j]==1){
						dispMap[i][j]=2;
						for(a=-1;a<2;a++){
							for(b=-1;b<2;b++){
								if((a==0&&b==0)||(i+a<0)||(j+b<0)||(i+a>=MAIN_BOARD_H)||(j+b>=MAIN_BOARD_W)){continue;}
								if(dispMap[i+a][j+b]==0){
									v=bombMap[i+a][j+b];
									if(v){
										if(v>0){dispMap[i+a][j+b]=2;}
									}else{
										dispMap[i+a][j+b]=1;
										f=true;
									}
								}
							}
						}
						if(f){break LABEL_1;}
					}
				}
			}
		}
	}

	function mapFullOpen(){
		var i,j;
		for(i=0;i<MAIN_BOARD_H;i++){
			for(j=0;j<MAIN_BOARD_W;j++){
				if(dispMap[i][j]==0){
					dispMap[i][j]=2;
				}else if(dispMap[i][j]==3){
					if(bombMap[i][j]==-1){
						dispMap[i][j]=5;
					}else{
						dispMap[i][j]=6;
					}
				}else if(dispMap[i][j]==7){
					dispMap[i][j]=8;
				}
			}
		}
	}

	function initBombMap(bomb){
		var i,j,a,b;
		var l;
		var c;
		var x,y;
		//SET BOMB
		l=bombs;
		for(i=0;i<l;i++){bombMap[Math.floor(bomb[i]/MAIN_BOARD_W)][bomb[i]%MAIN_BOARD_W]=-1;}
		
		//CALC
		for(i=0;i<MAIN_BOARD_H;i++){
			for(j=0;j<MAIN_BOARD_W;j++){
				if(bombMap[i][j]==-1){continue;}
				cnt=0;
				for(a=-1;a<2;a++){
					for(b=-1;b<2;b++){
						if ((a==0&&b==0)||(i+a<0)||(j+b<0)||(i+a>=MAIN_BOARD_H)||(j+b>=MAIN_BOARD_W)){continue;}
						if(bombMap[i+a][j+b]==-1){cnt++;}
					}
				}
				bombMap[i][j]=cnt;
			}
		}		
	}
	
	function makeMainTable(){
		var table;
		var elm,table,tb,tr,td;
		var i,j;
		//
		table=d.createElement("TABLE");
		table.border=1;
		tb=d.createElement("TBODY");
		for(i=0;i<MAIN_BOARD_H;i++){
			tr=d.createElement("TR");
			for(j=0;j<MAIN_BOARD_W;j++){
				td=d.createElement("TD");
				td.innerHTML="&nbsp;&nbsp;";
				
				addEvent(td,"click",cellClick);
				td.tag= i * MAIN_BOARD_W + j;
				mapElms[i][j]=td;
				tr.appendChild(td);
			}
			tb.appendChild(tr);
		}
		table.appendChild(tb);		
		mainElm.appendChild(table);
	}

	function createRandomArray(len,max,n){
		var b,v,m,a,t,l;
		var i,j,idx;
		b=new Array(max);	//Base
		a=new Array(len);	//Return
		t=new Array(max);	//Temp
		for(idx=i=0;i<max;i++){
			if(i==n)continue;
			b[idx]=i;idx++;
		}//baseInit
		for(i=0;i<len;i++){
			m=max-i-2;
			v=Math.round(Math.random()*m);
			l=max-i;
			for(idx=j=0;j<l;j++){
				(v==j)?a[i]=b[j]:t[idx++]=b[j];
			}
			l--;
			for(j=0;j<l;j++){b[j]=t[j];}
		}
		return a;
	}

	
	/***************************************************************************/
	//COMMON
	/***************************************************************************/

	function setInnerHTML(elm,v){
		elm.innerHTML=v;
	}

	
	function createTable(tblElm,acTable,defaltValue){
		var elm,table,tb,tr,td;
		var i,j;
	}
	
	function addEvent(elm,ev,fnc){
		if(document.all){
			elm.attachEvent("on"+ ev,fnc);
		}else{
			elm.addEventListener(ev,fnc,false);
		}
	}
	
	function create2DArray(h,w,v){
		var i,j,a;
		a=new Array(h);
		for(i=0;i<h;i++){
			a[i]=new Array(w);
			for(j=0;j<w;j++){a[i][j]=v;}
		}
		return a;
	}
	
	function init2dArray(a,v){
		var i,j,m,n;
		m=a.length;
		for(i=0;i<m;i++){
			n=a[i].length;
			for(j=0;j<n;j++){
				a[i][j]=v;
			}
		}	
	}
	
	function debug2Array(a){
		var i,j,l,m;
		var s="";
		l=a.length;
		for(i=0;i<l;i++){
			m=a[i].length;
			for(j=0;j<m;j++){
				s+=a[i][j];
				if(!(j==m-1)){s+="\t";}
			}
			s+="\n";
		}
		alert(s);
	}
}