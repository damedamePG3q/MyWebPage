/*******************************************************************************
String操作
********************************************************************************/

/************************************************
文字列のバイト数取得
	引数： String 文字列
	戻値： Number 文字数
	概要： 入力された文字列のバイト数を取得する
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
文字列Trim処理(左)
	引数： String 文字列
	戻値： String 文字列 (L_TRIM した結果)
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
文字列Trim処理(右)
	引数： String 文字列
	戻値： String 文字列 (R_TRIM した結果)
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
HTMLParts関連
********************************************************************************/

/**************************************
プルダウン(SELECT)動的変更
引数：String 	Element ID
	：Array[][]	Value と Name のデータ
	：Function	onchange時に実行する処理
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
	OPTION要素の動的作成(DOM)
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
ラジオボタンの値を取得する
引数　：Name属性
戻り値：Value属性
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
JavaScritpオブジェクトチェック関連
********************************************************************************/

/************************************************
変数タイプ取得
	引数：Object 対象変数
	戻り：String 変数名(全小文字)
	概要：渡された変数の型をString文字列で返す
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
String判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がStringの場合trueを返す
******************************************/
function isString(obj){
	if(typeof(obj)=="string" || obj instanceof String){
		return true;
	}else{
		return false;
	}
}

/******************************************
Number判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がNumberの場合trueを返す
******************************************/
function isNumber(obj){
	if(typeof(obj)=="number" || obj instanceof Number){
		return true;
	}else{
		return false;
	}
}

/******************************************
Boolean判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がBooleanの場合trueを返す
******************************************/
function isBoolean(obj){
	if(typeof(obj)=="boolean" || obj instanceof Boolean){
		return true;
	}else{
		return false;
	}
}

/******************************************
Date判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がDateの場合trueを返す
******************************************/
function isDate(obj){
	if(obj instanceof Date){
		return true;
	}else{
		return false;
	}
}

/******************************************
Function判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がFunctionの場合trueを返す
******************************************/
function isFunction(obj){
	if(obj instanceof Function){
		return true;
	}else{
		return false;
	}
}

/******************************************
RegExp判定
	引数：Object 対象変数
	戻り：Boolean
	概要：対象変数がRegExpの場合trueを返す
******************************************/
function isRegExp(obj){
	if(obj instanceof RegExp){
		return true;
	}else{
		return false;
	}
}

/*******************************************************************************
CSV(標準) 配列関連
********************************************************************************/

/***************************
CSV→配列変数
	引数：	CSVデータ(改行コードはCRLF)
	戻り： Array変数(２次元)
	CSVよりArray変数に格納する
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

		if((quoteFlg==false)&&(charCode==44)){			//カンマ
			arrField[cntField]=fieldStr;
			cntField++;
			fieldStr="";
		}else if(charCode==34){							//ダブルクォート
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
		}else if((quoteFlg==false)&&(charCode==13)){	//改行文字
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
		
		if(i+1>=l){										//データの終了
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
CSV(独自) 配列関連
********************************************************************************/
/************************************************************
ＣＳＶ系データを２次元配列に変換
	引数：String CSV系データ
		：String 区切り文字 (省略時は、",")
		：String 行末文字   (省略時は、";")
	戻値：Array[][]
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
２次元配列より指定したカラムを１次元配列として取得
	引数：Array[][]	２次元配列データ
		：Number 	カラムインデックス
	戻値：Array[]	１次元配列データ
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
パラメータテキストより連想配列を取得
	引数： String パラメータテキスト 
			[形式] name1=param;name2=param2････
	戻値： Array[] 連想配列
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
一次元配列より重複を除いて変換する
	引数：Array[] 変換元
	戻値：Array[] 変換先
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
２次元配列→１次元配列
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
ランダム
********************************************************************************/

/******************************
ランダムな順番用配列を作成する
	引数：　最大番号
	戻り：	２次元配列
****************************/
function makeRndList(max){
	var numList;		//番号リスト
	var wkList;			//番号リスト(作業用)
	var resultList;		//戻り値用配列
	var rndMax=max;
	var pos;			//取得乱数(Index用)
	var i,j,k;	

	numList= new Array(max);
	resultList = new Array(max);

	//連番リスト作成
	for(i=0;i<max;i++){ numList[i]=i; }

	//
	for(i=0;i<max;i++){
		pos=parseInt(Math.random()*(rndMax-1));		//リストより乱数で選択
		resultList[i]=numList[pos];	
		wkList=new Array(rndMax-1);

		k=0;		//wkList.pos					//取得した番号をリストより除去
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
デバッグ関連
********************************************************************************/

/*************************
デバッグ用１次元配列表示
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
デバッグ用２次元配列表示
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