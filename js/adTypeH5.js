// コンピュータ(技術系)の広告
(function(){
	var strHtml="";	
	var adList=[
		// フリーエンジニア求人サイト Good Works
		'<div class="pcOnly"><iframe frameborder="0" allowtransparency="true" height="600" width="160" marginheight="0" scrolling="no" src="http://ad.jp.ap.valuecommerce.com/servlet/htmlbanner?sid=3097971&pid=882323320" marginwidth="0"><script language="javascript" src="http://ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3097971&pid=882323320"></script><noscript><a href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3097971&pid=882323320" target="_blank" ><img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3097971&pid=882323320" height="600" width="160" border="0"></a></noscript></iframe></div>'
	];
	//strHtml=adList[parseInt(Math.random()*2,10)];
	strHtml=adList[0];
	document.write(strHtml);
})();
