/**************************
��`�����蔻��
�����F����A_X���W�z��[2]
	�F����A_Y���W�z��[2]
	�F����B_X���W�z��[2]
	�F����B_Y���W�z��[2]
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
