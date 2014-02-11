(function(){
	// Param: gl_pageKey = PageNumber
	if(!gl_pageKey)gl_pageKey=null;
	var linkList=[
		['エアロバイクの魅力(2014/02/04)','column_9.html','AeroBike'],
		['３ＤＳで遊ぶブラウザーゲーム(2014/01/31)','column_8.html','3dsBrowser'],
		['プチコンの魅力(2014/01/19)','column_7.html','petitcom'],
		['世界で一番人気のあるスマフォのゲーム－Candy Crush－(2014/01/14)','column_6.html','candy'],
		['これは面白いと思ったカードゲーム<br>(ハゲタカのえじき)(2013/12/25)','column_5.html','hagetaka'],
		['移植＆復刻が得意な凄いゲーム会社(Ｍ２)(2013/12/23)','column_4.html','m2'],
		['ゲームやアニメのキャラクターの性別について(2013/12/13)','column_3.html','gamechar'],
		['任天堂の本気「大合奏バンドブラザーズＰ(2013/11/14)','column_2.html','banbra'],
		['伝記映画のあるべき姿 ～ジョブズの映画の感想～(2013/11/01)','column.html','jobs']
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
