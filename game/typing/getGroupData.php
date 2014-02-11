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
		$sql="SELECT VALUE,NAME FROM NAME_MASTER WHERE GROUP_ID=1 AND DEL_FLG=0 ORDER BY SORT_NO ASC";
		
		//SELECT文発行
		$result=mysql_query($sql);
		if (!$result) {
			$errorMsg.='検索クエリーが失敗しました。'.mysql_error();
			$errorCd=3;	break;
		}

		//件数取得
		$recNum = mysql_num_rows($result);
		//echo 'rec num:'.$recNum.'<BR>';
		
		//CSV生成
		for($i=0;$i<$recNum;$i++){
			$rows=mysql_fetch_array($result);	//１レコード取得
			print $rows[0].",";
			print $rows[1]."\r\n";
		}
		break;
	}	
	//DB切断
	mysql_close($dbCon);
	echo $errorMsg;
?>
