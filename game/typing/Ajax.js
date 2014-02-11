/****************************************
Ajax�������C�u����	(IE6 FireFox3.5�Ή�)
	Morishita
*******************************************
�R���X�g���N�^
		��������
			�y�����z
				�Ȃ�
			�y�T�v�z
				�C���X�^���X�𐶐�����
			
�v���p�e�B
	��ԁFgetStatus
			Number�FAjax�̎��s���
				 0	�F�ҋ@
				 1	�F�擾��
				 2	�F�擾����
				-1	�F���̑��G���[
	
	�擾�f�[�^�FgetData
			String�F�擾�������ʂ��i�[�����

���\�b�h
	�ǂݍ��݁Fload
			�y�����z
				String�F���\�b�h(GET or POST)
				String�F�ǂݍ��ݐ�URL
				String�F���M�p�����[�^
				Bool  �Fasyn
				Element�F�Ǎ���G�������g
			�y�T�v�z
				�w�肵���G�������gID�Ɏ擾�������ʂ��e�L�X�g�Ŋi�[����B
					
	�擾�Fget
			�y�����z
				String�F���\�b�h(GET or POST)
				String�F�ǂݍ��ݐ�URL
				String�F���M�p�����[�^
				Bool  �Fasyn
			�y�T�v�z
				�w�肵�������Ńf�[�^���擾(�N���X�ϐ��Ɋi�[)����
				�� �擾��̃f�[�^�E�X�e�[�^�X�́A�v���p�e�B�ɂĎ擾����
					
	�擾�����������o�^�FsetEndProc
			�y�����z
				Function�F���s����
				Number 	�F���[�v�Ԋu(�~���b) (�ȗ��\�j
			�y�T�v�z
				Ajax�ǂݍ��ݏI�����̏�����ݒ肷��


***************************************************************************************************/
//Ajax��{�N���X
var Ajax=function(){

	/***********
	�N���X�ϐ�
    *************/
	var doc;			//document�V���[�g�J�b�g
	var xmlhttp;		//XML�I�u�W�F�N�g
	var browser;		//�u���E�U���
	var resiveProc;		//��M�����s�v���O����
	var reqHeader1;		//���M�w�b�_�P
	var reqHeader2;		//���M�w�b�_�Q
	var elem;			//�ΏۃG�������g
	
	var status;			//���s�X�e�[�^�X		(0:�ҋ@�C1:�擾���C2:�����C-1:�G���[���̑�)
	var mainData;       //�擾�f�[�^(�e�L�X�g)

	/****************
	�v���p�e�B
	*****************/	
	this.getStatus=function(){return status;}
	this.getData=function(){return mainData;}

	/****************
	�R���X�g���N�^
    *****************/
	initialize();
	function initialize(){
		doc=document;
		if(window.opera){
			browser=2;			//OPERA
		}else if(doc.all){		//IE
			browser=1;
		}else{					//IE�ȊO
			browser=3;
		}
		this.reqHeader1="If-Modified-Since";
		this.reqHeader2="Thu, 01 Jun 1970 00:00:00 GMT";
		status=0;
		mainData="";
	}

	/***********************************************************
	�e�L�X�g�ǂݍ��ݎ擾�Fload
		�����FString Method
			�FString �擾��URL
			�FString ���MPram
			�FString asyn
			�FString �ǂݍ��ݐ�Element ID
		�T�v�F�w�肵��ElementID�ɓǂݍ��񂾃e�L�X�g��}������
	****************************************************	*********/
	//�ǂݍ��ݎ��s�J�n����
	this.load=function(method,url,param,asyn,elm){

		if(browser==1){
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			//xmlhttp=new XMLHttpRequest();
			xmlhttp=new window.XMLHttpRequest();	//��L�ł� googleChrome�œ��삵�Ȃ��B
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
	//�ǂݍ��ݏI��������
	var resiveProc=function(id){
		if (xmlhttp.readyState == 4 && (xmlhttp.status==0 || xmlhttp.status==200)){
			elem.innerHTML=xmlhttp.responseText;
			status=2;
		}
	}
	
	/***********************************************************
	�e�L�X�g�t�@�C���ǂݍ��ݏ���
		�����FString Method
			�FString �擾��URL
			�FString ���MParam
			�FString asyn
		�T�v�F�w�肵�������Ńf�[�^���擾(�N���X�ϐ��Ɋi�[)����
			�� �擾��̃f�[�^�E�X�e�[�^�X�́A�v���p�e�B�ɂĎ擾����
	*************************************************************/
	this.get=function(method,url,param,asyn){
		if(browser==1){
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			//xmlhttp=new XMLHttpRequest();
			xmlhttp=new window.XMLHttpRequest();		//��L�ł� googleChrome�œ��삵�Ȃ��B
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
	//�ǂݍ��ݏI��������
	var resiveProc2=function(id){
		if (xmlhttp.readyState == 4 && (xmlhttp.status==0 || xmlhttp.status==200)){
			mainData=xmlhttp.responseText;
			//alert(xmlhttp.responseText);
			status=2;
		}
	}

	/***********************************************
	�f�[�^�擾���������s�����o�^
		�����FFunction ���s���� (�K�{)
			�FNumber ���[�v�Ԋu(�~���b) (�ȗ��\�j
		�T�v�FAjax�ǂݍ��ݏI�����̏�����ݒ肷��
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
