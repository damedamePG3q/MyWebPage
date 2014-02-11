// ゲーム系の広告
(function(){
	var strHtml="";	
	var adList=[
		'<div class="pcOnly"><iframe frameborder="0" allowtransparency="true" height="600" width="160" marginheight="0" scrolling="no" src="http://ad.jp.ap.valuecommerce.com/servlet/htmlbanner?sid=3097971&pid=882323265" marginwidth="0"><script language="javascript" src="http://ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3097971&pid=882323265"></script><noscript><a href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3097971&pid=882323265" target="_blank" ><img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3097971&pid=882323265" height="600" width="160" border="0"></a></noscript></iframe></div>',
		'<div class="pcOnly"><iframe frameborder="0" allowtransparency="true" height="600" width="160" marginheight="0" scrolling="no" src="http://ad.jp.ap.valuecommerce.com/servlet/htmlbanner?sid=3097971&pid=882320728" marginwidth="0"><script language="javascript" src="http://ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3097971&pid=882320728"></script><noscript><a href="http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3097971&pid=882320728" target="_blank" ><img src="http://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3097971&pid=882320728" height="600" width="160" border="0"></a></noscript></iframe></div>'
	];
	strHtml=adList[parseInt(Math.random()*2,10)];
	document.write(strHtml);
})();
