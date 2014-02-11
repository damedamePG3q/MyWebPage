<?php
	//ＤＢ関連オブジェクト
	$dbCon;							//DBリソース
	$dbHost='localhost';			//サーバ
	$dbName='typing2';				//接続先DB 
	$dbUser='webControl';			//DBユーザID
	$dbPassword='webtest';			//DBパスワード

	$sql;							//SQL文
	
	$result;						//クエリ結果
	$recNum;						//データ件数
	$rows;							//１行データ
	$errorMsg='';
	$inputGroup;

	//入力パラメータ取得
	if(isset($_GET['g'])){
		if(is_numeric($_GET['g'])){
			$inputGroup=htmlentities($_GET['g'], ENT_QUOTES, mb_internal_encoding());
			}else{
        	$inputGroup=0;
		}
	}else{
		$inputGroup=0;
	}

	while(true){

		//DB接続
		$dbCon=mysql_connect($dbHost,$dbUser,$dbPassword);
	   	if (!$dbCon) {
	   		$errorMsg.='DB接続エラーです。'.mysql_error();
	   		$errorCd=2;
			//echo 'DB NG';
	   		break;
	   	}

		//DB選択
		$r=mysql_select_db($dbName,$dbCon);	
		if(!$r){
			//echo 'select DB Error';
	   		$errorMsg.='DB選択エラーです。'.mysql_error();
			break;
		}

		//文字コード設定
		$result=mysql_query("SET NAMES sjis");	//日本語文字化け対策

		//SQL作成
		$sql="SELECT WORD,TYPING,COMMENT,C_TYPE FROM TYPING_WORDS WHERE DEL_FLG=0 AND GROUP_ID=".$inputGroup;
		
		//SELECT文発行
		$result=mysql_query($sql);
		if (!$result) {
			$errorMsg.='検索クエリーが失敗しました。'.mysql_error();
			$errorCd=3;	break;
		}

		//件数取得
		$recNum = mysql_num_rows($result);
		//echo 'rec num:'.$recNum.'<BR>';
		for($i=0;$i<$recNum;$i++){
			$rows=mysql_fetch_array($result);	//１レコード取得
			print $rows[0].",";
			print $rows[1].",";
			print $rows[2].",";
			print $rows[2]."\r\n";
		}
		break;
	}	
	//DB切断
	mysql_close($dbCon);
	echo $errorMsg;
?>
