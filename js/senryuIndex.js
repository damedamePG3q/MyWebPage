(function(){
	// Param: gl_pageKey
	if(!gl_pageKey)gl_pageKey=null;
	var linkList=[
		['プチコン紹介編','senryu_1.html','petitcom'],
		['プログラム編','senryu_2.html','program'],
		['未来のプログラマーへ向けて編','senryu_3.html','message'],
		['プチコン編','senryu_4.html','ds'],
		['１画面プログラム編','senryu_5.html','one']
	];
	var l=linkList.length;
	var strHtml="";
	strHtml+="<b>目次</b>";
	strHtml+='<ol>';
	for(var i=0;i<l;i++){
		if(linkList[i][2]==gl_pageKey)
			strHtml+='<li><b>「'+ linkList[i][0] +'」</b></li>';
		else 
			strHtml+='<li><a href="'+ linkList[i][1] +'" class="textLink">「'+ linkList[i][0] +'」</a></li>';
	}
	strHtml+='</ol>';
	document.write(strHtml);
	gl_pageKey=null;
})();
