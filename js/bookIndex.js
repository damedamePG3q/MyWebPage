(function(){
	// Param: gl_pageKey = PageNumber
	if(!gl_pageKey)gl_pageKey=null;
	var linkList=[
		['マンガで読む『分かりやすい表現』 の技術','一般書籍','マンガで学べる、わかりやすい表現の仕方','2014/01/28','book_wakariyasui.html','wakariyasui'],

		['ゆりてつ～私立百合ヶ咲女子高鉄道部～','マンガ','まったりとした日常系鉄道マンガ','2014/01/22','book_yuritetsu.html','yuritetsu'],
		['この世界がゲームだと俺だけが知っている','ライトノベル','バグの面白さに焦点を当てたライトノベル','2014/01/21','book_konosekaiga.html','konosekaiga'],
		['よくわかる現代魔法','ライトノベル','コンピュータと魔法ファンタジーの見事な融合','2013/12/12','book_yokuwakaru.html','yokuwakaru'],
		['なれる！ＳＥ','ライトノベル','ＳＥってこんな仕事です','2013/12/12','book_naresuse.html','nareruse'],
		['松岡修造の人生を強く生きる83の言葉 ほか','一般書籍','シューゾーって変な人だけど凄い人なんだなぁ','2013/12/12','book_shoozo.html','shoozo']
	];
	var l=linkList.length;
	var strHtml="";
	strHtml+="<b>目次</b>";
	strHtml+='<ol>';
	for(var i=0;i<l;i++){
		if(linkList[i][5]==gl_pageKey)
			strHtml+='<li><b>「'+ linkList[i][0] +'」</b>&nbsp;('+ linkList[i][1] +')<br>～'+ linkList[i][2] +'～('+ linkList[i][3] +')</li>';
		else 
			strHtml+='<li><a href="'+ linkList[i][4] +'" class="textLink"><b>「'+ linkList[i][0] +'」</b>&nbsp;('+ linkList[i][1] +')</a><br>～'+ linkList[i][2] +'～('+ linkList[i][3] +')</li>';
	}
	strHtml+='</ol>';
	document.write(strHtml);
	gl_pageKey=null;
})();
