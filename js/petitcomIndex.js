(function(){
	// Param: gl_pageNo = PageNumber
	if(!gl_pageKey)gl_pageKey="";
	var linkList=[
		['レースゲーム','pettitcom_1.html','Drive'],
		['宇宙シューティング','pettitcom_1b.html','Space'],
		['１画面プログラム','pettitcom_2.html','oneG'],
		['ゲームの歴史再現','pettitcom_4.html','gameHist'],
		['普通のプログラム','pettitcom_3.html','normal']
	];
	var l=linkList.length;
	var strHtml="";
	strHtml+="<b>目次</b>";
	strHtml+='<ol>';
	for(var i=0;i<l;i++){
		if(linkList[i][2]==gl_pageKey)
			strHtml+='<li><b>'+ linkList[i][0] +'</b></li>';
		else 
			strHtml+='<li><a href="'+ linkList[i][1] +'" class="textLink">'+ linkList[i][0] +'</a></li>';
	}
	strHtml+='</ol>';
	document.write(strHtml);
	gl_pageKey=null;
})();
