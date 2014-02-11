(function(){
	var strHtml="";
	if(navigator.userAgent.indexOf('3DS') > 0){
		document.write('<meta name="viewport" content="width=320" />');
	}else{
		document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />');
	}
	var ua=navigator.userAgent;
	if((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0  || ua.indexOf('3DS') > 0 ){
		document.write('<link rel="stylesheet" type="text/css" href="css/style_sp.css">');
	}else{
		document.write('<link rel="stylesheet" type="text/css" href="css/style_pc.css">');
	}
})();
