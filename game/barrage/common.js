/**************************
矩形当たり判定
引数：物体A_X座標配列[2]
	：物体A_Y座標配列[2]
	：物体B_X座標配列[2]
	：物体B_Y座標配列[2]
*****************************/
function isHitRect(aX,aY,bX,bY){
	var i;
	var f=false;
	for (i=0;i<2;i++){
		for(j=0;j<2;j++){
			if((aX[j] >= bX[0]) && (aX[j] <= bX[1]) && (aY[i] >= bY[0]) && (aY[i] <= bY[1])){return true;}
			if((bX[j] >= aX[0]) && (bX[j] <= aX[1]) && (bY[i] >= aY[0]) && (bY[i] <= aY[1])){return true;}
		}
	}
	return false;
}
