<?php
	//�c�a�֘A�I�u�W�F�N�g
	$dbCon;							//DB���\�[�X
	$dbHost='localhost';			//�T�[�o
	$dbName='typing2';				//�ڑ���DB 
	$dbUser='webControl';			//DB���[�UID
	$dbPassword='webtest';			//DB�p�X���[�h

	$sql;							//SQL��
	
	$result;						//�N�G������
	$recNum;						//�f�[�^����
	$rows;							//�P�s�f�[�^
	$errorMsg='';
	$inputGroup;

	//���̓p�����[�^�擾
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

		//DB�ڑ�
		$dbCon=mysql_connect($dbHost,$dbUser,$dbPassword);
	   	if (!$dbCon) {
	   		$errorMsg.='DB�ڑ��G���[�ł��B'.mysql_error();
	   		$errorCd=2;
			//echo 'DB NG';
	   		break;
	   	}

		//DB�I��
		$r=mysql_select_db($dbName,$dbCon);	
		if(!$r){
			//echo 'select DB Error';
	   		$errorMsg.='DB�I���G���[�ł��B'.mysql_error();
			break;
		}

		//�����R�[�h�ݒ�
		$result=mysql_query("SET NAMES sjis");	//���{�ꕶ�������΍�

		//SQL�쐬
		$sql="SELECT WORD,TYPING,COMMENT,C_TYPE FROM TYPING_WORDS WHERE DEL_FLG=0 AND GROUP_ID=".$inputGroup;
		
		//SELECT�����s
		$result=mysql_query($sql);
		if (!$result) {
			$errorMsg.='�����N�G���[�����s���܂����B'.mysql_error();
			$errorCd=3;	break;
		}

		//�����擾
		$recNum = mysql_num_rows($result);
		//echo 'rec num:'.$recNum.'<BR>';
		for($i=0;$i<$recNum;$i++){
			$rows=mysql_fetch_array($result);	//�P���R�[�h�擾
			print $rows[0].",";
			print $rows[1].",";
			print $rows[2].",";
			print $rows[2]."\r\n";
		}
		break;
	}	
	//DB�ؒf
	mysql_close($dbCon);
	echo $errorMsg;
?>
