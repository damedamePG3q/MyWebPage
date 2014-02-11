/*******************************************************************************
String����
********************************************************************************/

/************************************************
������̃o�C�g���擾
	�����F String ������
	�ߒl�F Number ������
	�T�v�F ���͂��ꂽ������̃o�C�g�����擾����
************************************************/
function getByte(text){
	var count=0;
	var i;
	var l;
	l=text.length;
	for (i=0;i<l;i++){
		n=escape(text.charAt(i));
		if(n.length<4)count++;else count+=2;
	}
	return count;
}


/************************************************
������Trim����(��)
	�����F String ������
	�ߒl�F String ������ (L_TRIM ��������)
*************************************************/
function trimLeft(str){
	var l,i,c;
	var f=false;
	var s="";
	l=str.length;
	for(i=0;i<l;i++){
		c=str.charAt(i);
		if(c==" "){
			if(f){s+=c;}
		}else{
			f=true;
			s+=c;
		}
	}
	return s;
}

/********************************************
������Trim����(�E)
	�����F String ������
	�ߒl�F String ������ (R_TRIM ��������)
*********************************************/
function trimRight(str){
	var i,j,c,c2,f;
	var s="";
	var l=str.length;
	for(i=0;i<l;i++){
		c=str.charAt(i);
		if(c==" "){ 
			f=false;
			for(j=i;j<l;j++){
				c2=str.charAt(j);
				if(c2!=" "){
					f=true;
					break;
				}
			}
			if(f){s+=c;}else{return s;}
		}else{
			s+=c;
		}
	}
	return s;
}

/*******************************************************************************
HTMLParts�֘A
********************************************************************************/

/**************************************
�v���_�E��(SELECT)���I�ύX
�����FString 	Element ID
	�FArray[][]	Value �� Name �̃f�[�^
	�FFunction	onchange���Ɏ��s���鏈��
****************************************/
function changePulDown(id,data,prc){
	var elm,ar,d;
	d=document;
	elm=d.getElementById(id);
	elm.innerHTML="";
	if(prc==undefined){
		elm.onchange=null;
	}else{
		elm.onchange=prc;
	}
	createOptionText(elm,data);

	/**************************
	OPTION�v�f�̓��I�쐬(DOM)
	****************************/
	function createOptionText(elm,inArr){
		var l=inArr.length;
		var d=document;
		for(i=0;i<l;i++){
			var node;
			node=d.createElement("OPTION");
			node.value=inArr[i][0];
			node.innerHTML=inArr[i][1];
			elm.appendChild(node);	
		}
	}
}

/*********************************
���W�I�{�^���̒l���擾����
�����@�FName����
�߂�l�FValue����
**********************************/
function getRadioValue(name){
	var d=document;
	var list=d.getElementsByName(name);
	var l=list.length;
	var elm;
	var i;
	for(i=0;i<l;i++){
		elm=list[i];
		if(elm.checked){
			return elm.value;
		}
	}
}

/*******************************************************************************
JavaScritp�I�u�W�F�N�g�`�F�b�N�֘A
********************************************************************************/

/************************************************
�ϐ��^�C�v�擾
	�����FObject �Ώەϐ�
	�߂�FString �ϐ���(�S������)
	�T�v�F�n���ꂽ�ϐ��̌^��String������ŕԂ�
**************************************************/
function getVarType(input){
	var type;
	var result;
	type=typeof(input);
	
	if(type=="object"){
		if(input instanceof String){
			result="string";
		}else if(input instanceof Number){
			result="number";
		}else if(input instanceof Boolean){
			result="boolean";
		}else if(input instanceof Array){
			result="array";
		}else{
			result="object";
		}
	}else{
		result=type;
	}
	return result;
}

/******************************************
String����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���String�̏ꍇtrue��Ԃ�
******************************************/
function isString(obj){
	if(typeof(obj)=="string" || obj instanceof String){
		return true;
	}else{
		return false;
	}
}

/******************************************
Number����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���Number�̏ꍇtrue��Ԃ�
******************************************/
function isNumber(obj){
	if(typeof(obj)=="number" || obj instanceof Number){
		return true;
	}else{
		return false;
	}
}

/******************************************
Boolean����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���Boolean�̏ꍇtrue��Ԃ�
******************************************/
function isBoolean(obj){
	if(typeof(obj)=="boolean" || obj instanceof Boolean){
		return true;
	}else{
		return false;
	}
}

/******************************************
Date����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���Date�̏ꍇtrue��Ԃ�
******************************************/
function isDate(obj){
	if(obj instanceof Date){
		return true;
	}else{
		return false;
	}
}

/******************************************
Function����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���Function�̏ꍇtrue��Ԃ�
******************************************/
function isFunction(obj){
	if(obj instanceof Function){
		return true;
	}else{
		return false;
	}
}

/******************************************
RegExp����
	�����FObject �Ώەϐ�
	�߂�FBoolean
	�T�v�F�Ώەϐ���RegExp�̏ꍇtrue��Ԃ�
******************************************/
function isRegExp(obj){
	if(obj instanceof RegExp){
		return true;
	}else{
		return false;
	}
}

/*******************************************************************************
CSV(�W��) �z��֘A
********************************************************************************/

/***************************
CSV���z��ϐ�
	�����F	CSV�f�[�^(���s�R�[�h��CRLF)
	�߂�F Array�ϐ�(�Q����)
	CSV���Array�ϐ��Ɋi�[����
****************************/
function csvToArray(csv){
	// memo ["]=34  [,]=44 [CRLF]=13 10;

	var charCode;
	var quoteFlg=false;
	var fieldStr="";
	var cntRow=0;
	var cntField=0;
	var arrTable=new Array();
	var arrField=new Array();
	var l,i;

	l=csv.length;
	for(i=0;i<l;i++){
		charCode=csv.charCodeAt(i);

		if((quoteFlg==false)&&(charCode==44)){			//�J���}
			arrField[cntField]=fieldStr;
			cntField++;
			fieldStr="";
		}else if(charCode==34){							//�_�u���N�H�[�g
			if(quoteFlg==false){
				quoteFlg=true;
			}else{
				if(i>0&&i+1<l){
					if(csv.charCodeAt(i+1)==34){
						fieldStr+=csv.charAt(i);
						i++;
					}else{
						quoteFlg=false;
					}
				}else{
					quoteFlg=false;
				}
			}
		}else if((quoteFlg==false)&&(charCode==13)){	//���s����
			if(i>0&&i+1<l){
				if(csv.charCodeAt(i+1)==10){
					i++;
					arrField[cntField]=fieldStr;
					fieldStr="";
					arrTable[cntRow]=arrField;
					cntRow++;
					cntField=0;
					arrField=new Array();
				}
			}
		}else{
			fieldStr+=csv.charAt(i);
		}
		
		if(i+1>=l){										//�f�[�^�̏I��
			if(fieldStr!=""){
					arrField[cntField]=fieldStr;
					fieldStr="";
					arrTable[cntRow]=arrField;
			}	
		}
	}
	return arrTable;
}

/*******************************************************************************
CSV(�Ǝ�) �z��֘A
********************************************************************************/
/************************************************************
�b�r�u�n�f�[�^���Q�����z��ɕϊ�
	�����FString CSV�n�f�[�^
		�FString ��؂蕶�� (�ȗ����́A",")
		�FString �s������   (�ȗ����́A";")
	�ߒl�FArray[][]
************************************************************/
function setArray2DfromCsv(dataCsv,param1,param2){
	var l=dataCsv.length;
	var cm,ed;

	var i,c;
	var p1=0;
	var p2=0;
	var s="";
	
	var list=new Array();
	
	list[0]=new Array();

	if(param1==undefined){cm=",";}else{cm=param1;}
	if(param2==undefined){ed=";";}else{ed=param2;}
	for(i=0;i<l;i++){
		c=dataCsv.charAt(i);
		if(c==cm||c==ed){
			list[p1][p2]=trimRight(trimLeft(s));
			s="";
			p2++;
			if(c==ed){
				if(i<l-1){
					p1++;
					list[p1] = new Array()
					p2=0;
					s="";
				}
			}
		}else{
			s+=c;
		}
	}
	return list;
}

/***************************************************
�Q�����z����w�肵���J�������P�����z��Ƃ��Ď擾
	�����FArray[][]	�Q�����z��f�[�^
		�FNumber 	�J�����C���f�b�N�X
	�ߒl�FArray[]	�P�����z��f�[�^
***************************************************/
function getColumValueList(arr2DList,colum){
	var l=arr2DList.length;
	var col=colum;
	var i;
	var resultList = new Array(l);
	for(i=0;i<l;i++){
		resultList[i]=arr2DList[i][colum];
	}
	return resultList;
}


/************************************************
�p�����[�^�e�L�X�g���A�z�z����擾
	�����F String �p�����[�^�e�L�X�g 
			[�`��] name1=param;name2=param2����
	�ߒl�F Array[] �A�z�z��
*************************************************/
function createArrayFromName(str){
	var l=str.length;
	var i,c,name;
	var s="";
	var p=0;
	var list=new Array();

	for(i=0;i<l;i++){
		c=str.charAt(i);
		if(c=="="){
			name=trimRight(trimLeft(s));
			s="";
		}else if(c==";"){
			list[name]=s;
			s="";
		}else{
			s+=c;
		}
	}
	return list;
}

/*******************************************
�ꎟ���z����d���������ĕϊ�����
	�����FArray[] �ϊ���
	�ߒl�FArray[] �ϊ���
********************************************/
function arrDuplicateRemove(inputList){
	var resultList;
	var l1,l2,i,j,p,f;

	l1=inputList.length;
	p=0;

	resultList=new Array();
	resultList[0]=inputList[0];
	
	for(i=0;i<l1;i++){
		l2=resultList.length;
		f=false;
		for(j=0;j<l2;j++){
			if(inputList[i]==resultList[j]){
				f=true;
			}
		}
		if(f==false){
			p++;
			resultList[p]=inputList[i];
		}
	}
	return resultList;
}

/************************
�Q�����z�񁨂P�����z��
*************************/
function convertArray2Dto1D(inArray){
	var i,j,p,l1,l2,outArray;
	
	outArray=new Array();
	p=0;
	
	l1=inArray.length;
	for(i=0;i<l1;i++){

		l2=inArray[i].length;		
		for(j=0;j<l2;j++){
			outArray[p]=inArray[i][j];	
			p++;
		}
	}
	 
	return outArray;
}


/*******************************************************************************
�����_��
********************************************************************************/

/******************************
�����_���ȏ��ԗp�z����쐬����
	�����F�@�ő�ԍ�
	�߂�F	�Q�����z��
****************************/
function makeRndList(max){
	var numList;		//�ԍ����X�g
	var wkList;			//�ԍ����X�g(��Ɨp)
	var resultList;		//�߂�l�p�z��
	var rndMax=max;
	var pos;			//�擾����(Index�p)
	var i,j,k;	

	numList= new Array(max);
	resultList = new Array(max);

	//�A�ԃ��X�g�쐬
	for(i=0;i<max;i++){ numList[i]=i; }

	//
	for(i=0;i<max;i++){
		pos=parseInt(Math.random()*(rndMax-1));		//���X�g��藐���őI��
		resultList[i]=numList[pos];	
		wkList=new Array(rndMax-1);

		k=0;		//wkList.pos					//�擾�����ԍ������X�g��菜��
		for(j=0;j<rndMax;j++){
			if(j!=pos){
				wkList[k]=numList[j];
				k++;	
			}						
		}
		numList=wkList;
		rndMax--;
	}
	return resultList;
}


/*******************************************************************************
�f�o�b�O�֘A
********************************************************************************/

/*************************
�f�o�b�O�p�P�����z��\��
**************************/
function debugArray1D(ar){
	var i;
	var l;
	var s="";
	l=ar.length;
	for(i=0;i<l;i++){
		s+="["+i+"]"+ar[i]+"\n";
	}
	alert(s);
}

/*************************
�f�o�b�O�p�Q�����z��\��
**************************/
function debugArray2D(ar){
	var i,j,l1,l2;
	var s="";
	l1=ar.length;
	for(i=0;i<l1;i++){
		l2=ar[i].length;
		for(j=0;j<l2;j++){
			s+="["+i+"]["+j+"]:"+ar[i][j]+"\n";
		}
	}
	alert(s);
}