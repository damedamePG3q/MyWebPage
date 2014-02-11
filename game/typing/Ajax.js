/****************************************
Ajax処理ライブラリ	(IE6 FireFox3.5対応)
	Morishita
*******************************************
コンストラクタ
		初期処理
			【引数】
				なし
			【概要】
				インスタンスを生成する
			
プロパティ
	状態：getStatus
			Number：Ajaxの実行状態
				 0	：待機
				 1	：取得中
				 2	：取得完了
				-1	：その他エラー
	
	取得データ：getData
			String：取得した結果が格納される

メソッド
	読み込み：load
			【引数】
				String：メソッド(GET or POST)
				String：読み込み先URL
				String：送信パラメータ
				Bool  ：asyn
				Element：読込先エレメント
			【概要】
				指定したエレメントIDに取得した結果をテキストで格納する。
					
	取得：get
			【引数】
				String：メソッド(GET or POST)
				String：読み込み先URL
				String：送信パラメータ
				Bool  ：asyn
			【概要】
				指定した条件でデータを取得(クラス変数に格納)する
				※ 取得後のデータ・ステータスは、プロパティにて取得する
					
	取得完了時処理登録：setEndProc
			【引数】
				Function：実行処理
				Number 	：ループ間隔(ミリ秒) (省略可能）
			【概要】
				Ajax読み込み終了時の処理を設定する


***************************************************************************************************/
//Ajax基本クラス
var Ajax=function(){

	/***********
	クラス変数
    *************/
	var doc;			//documentショートカット
	var xmlhttp;		//XMLオブジェクト
	var browser;		//ブラウザ種別
	var resiveProc;		//受信時実行プログラム
	var reqHeader1;		//送信ヘッダ１
	var reqHeader2;		//送信ヘッダ２
	var elem;			//対象エレメント
	
	var status;			//実行ステータス		(0:待機，1:取得中，2:完了，-1:エラーその他)
	var mainData;       //取得データ(テキスト)

	/****************
	プロパティ
	*****************/	
	this.getStatus=function(){return status;}
	this.getData=function(){return mainData;}

	/****************
	コンストラクタ
    *****************/
	initialize();
	function initialize(){
		doc=document;
		if(window.opera){
			browser=2;			//OPERA
		}else if(doc.all){		//IE
			browser=1;
		}else{					//IE以外
			browser=3;
		}
		this.reqHeader1="If-Modified-Since";
		this.reqHeader2="Thu, 01 Jun 1970 00:00:00 GMT";
		status=0;
		mainData="";
	}

	/***********************************************************
	テキスト読み込み取得：load
		引数：String Method
			：String 取得元URL
			：String 送信Pram
			：String asyn
			：String 読み込み先Element ID
		概要：指定したElementIDに読み込んだテキストを挿入する
	****************************************************	*********/
	//読み込み実行開始処理
	this.load=function(method,url,param,asyn,elm){

		if(browser==1){
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			//xmlhttp=new XMLHttpRequest();
			xmlhttp=new window.XMLHttpRequest();	//上記では googleChromeで動作しない。
		}
		if(xmlhttp){
			elem=elm;
			xmlhttp.onreadystatechange=resiveProc;	
			if(method=="POST"){
				xmlhttp.open("POST", url, true);
				//xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
				xmlhttp.setRequestHeader('Content-Type' ,'application/x-www-form-urlencoded; charset=UTF-8');
				status=1;
				xmlhttp.send(param)
			}else if(method=="GET"){
				xmlhttp.open("GET", url, true);
				xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
				status=1;
				xmlhttp.send();
			}else{
				alert("Method Select Eror!");
				status=-1;
			}
		}
	}
	//読み込み終了時処理
	var resiveProc=function(id){
		if (xmlhttp.readyState == 4 && (xmlhttp.status==0 || xmlhttp.status==200)){
			elem.innerHTML=xmlhttp.responseText;
			status=2;
		}
	}
	
	/***********************************************************
	テキストファイル読み込み処理
		引数：String Method
			：String 取得元URL
			：String 送信Param
			：String asyn
		概要：指定した条件でデータを取得(クラス変数に格納)する
			※ 取得後のデータ・ステータスは、プロパティにて取得する
	*************************************************************/
	this.get=function(method,url,param,asyn){
		if(browser==1){
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			//xmlhttp=new XMLHttpRequest();
			xmlhttp=new window.XMLHttpRequest();		//上記では googleChromeで動作しない。
			//alert(xmlhttp);
		}
		if(xmlhttp){
			//elemId=id;
			xmlhttp.onreadystatechange=resiveProc2;	
			if(method=="POST"){
				xmlhttp.open("POST", url, true);
				//xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
				xmlhttp.setRequestHeader('Content-Type' ,'application/x-www-form-urlencoded; charset=UTF-8');
				status=1;
				mainData="";
				xmlhttp.send(param)
			}else if(method=="GET"){
				xmlhttp.open("GET", url, true);
				xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
				status=1;
				mainData="";
				xmlhttp.send();
			}else{
				alert("Method Select Eror!");
				status=-1;
				mainData="";
			}
		}
	}
	//読み込み終了時処理
	var resiveProc2=function(id){
		if (xmlhttp.readyState == 4 && (xmlhttp.status==0 || xmlhttp.status==200)){
			mainData=xmlhttp.responseText;
			//alert(xmlhttp.responseText);
			status=2;
		}
	}

	/***********************************************
	データ取得完了時実行処理登録
		引数：Function 実行処理 (必須)
			：Number ループ間隔(ミリ秒) (省略可能）
		概要：Ajax読み込み終了時の処理を設定する
	*************************************************/
	this.setEndProc=function(proc,t){
		var time;
		if(t==undefined){
			time=10;
		}else{
			time=t;
		}
		setTimeout(msgLoop,time);
		function msgLoop(){
			if(status==0||status==1){
				setTimeout(msgLoop,time);
			}else if(status==2){
				status==0;
				proc();
			}
		}
	}
}
