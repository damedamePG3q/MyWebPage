/******************************************************
ランダムに座標を設定する(矩形の内側)
引数：オブジェクト
	：矩形の幅
	：矩形の高さ
使用可能オブジェクト
	プロパティとして、
	x,y,width,height を持つもの
*******************************************************/
function setRandomInSide(obj,w,h,margin){
	var x;
	var y;
	x = margin + (Math.round(Math.random() * ((w - obj.width) -  margin *2)));
	y = margin + (Math.round(Math.random() * ((h - obj.height) - margin *2)));	
	obj.x = x;
	obj.y = y;
}

/******************************************************
ランダムに座標を設定する(矩形の外側)
引数：オブジェクト
	：矩形の幅
	：矩形の高さ
使用可能オブジェクト
	プロパティとして、
	x,y,width,height を持つもの
*******************************************************/
function setRandomOutSide(obj,w,h){
	var x;
	var y;
	var type;
	x = Math.round((Math.random() * w),0);
	y = Math.round((Math.random() * h),0);
	type = Math.round((Math.random()*2),0);
	if(type==1){	//縦
		if (x < w/2){
			x = obj.width * -1;
		}else{
			x = w;
		}
	}else{			//横
		if (y < h/2){
			y = obj.height * -1;
		}else{
			y = h;
		}
	}
	obj.x = x;
	obj.y = y;	
}

/******************************************************
ランダムにベクトルを設定する
引数：オブジェクト
	：乱数最大値
	：X最小値
	：X最大値
	：Y最小値
	：Y最大値
		
使用可能オブジェクト
	プロパティとして、
	x,y,width,height,vectorX,vectorY を持つもの
※	矩形の外側に配置された場合は、
	矩形の内側を向くようにベクトルが設定される。
*******************************************************/
function setRandomVector(obj,maxF,minW,maxW,minH,maxH){
	var vx;
	var vy;
	var half=Math.floor(maxF/2);
	vx = Math.round((Math.random()*maxF),0)-half;
	vy = Math.round((Math.random()*maxF),0)-half;
	if((vx == 0) && (vy == 0)){
		vx = 1;
		vy = 1;
	}	
	if(obj.x == minW){vx = Math.abs(vx);}
	if(obj.x == maxW){vx = Math.abs(vx) * -1;}
	if(obj.y == minH){vy = Math.abs(vy);}
	if(obj.y == maxH){vy = Math.abs(vy) * -1;}
	obj.vectorX = vx;
	obj.vectorY = vy;
}


/************************************
オブジェクトの当たり判定
引数：オブジェクトA
	：オブジェクトB
	
使用可能オブジェクト
	プロパティとして、
	x,y,width,heightを持つもの
*************************************/
function isHitRecObject(objA,objB){
	var aX = new Array(2);
	var aY = new Array(2);
	var bX = new Array(2);
	var bY = new Array(2);
	var cx;
	var cy;
	var halfW;
	var halfH;

	//OBJ_A
	cx = objA.x + Math.floor(objA.width/2);
	cy = objA.y + Math.floor(objA.height/2);
	halfW = Math.floor(objA.hitWidth/2);
	halfH = Math.floor(objA.hitHeight/2);
	aX[0] = cx - halfW;
	aX[1] = cx + halfW;
	aY[0] = cy - halfH;
	aY[1] = cy + halfH;
	
	//OBJ_B
	cx = objB.x + Math.floor(objB.width/2);
	cy = objB.y + Math.floor(objB.height/2);
	halfW = Math.floor(objB.hitWidth/2);
	halfH = Math.floor(objB.hitHeight/2);
	bX[0] = cx - halfW;
	bX[1] = cx + halfW;
	bY[0] = cy - halfH;
	bY[1] = cy + halfH;
	
	return isHitRect(aX,aY,bX,bY);
}
