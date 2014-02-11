/***********************
エレメントの表示非表示
引数：トリガーのID
　　：コンテンツのID
*************************/
function showHide(p0,p1,p2){
	var d=document;
	if(!p2) p2="block";
	var trg=d.getElementById(p0);
	var tex=d.getElementById(p1);
	if(tex.style.display=="none"){
		tex.style.display=p2;
		trg.innerHTML="折りたたむ";
	}else{
		tex.style.display="none";
		trg.innerHTML="表示する";
	}
}

function hideAd(){
	var elms,elm,i,l;
	elms=document.getElementsByTagName("*");
	l=elms.length;
	for(i=0;i<l;i++){if(elms[i].className=="fluct_ad_container"){elms[i].style.display="none";}}
}

/***************************
CSSクラス名に"Web"を付加する
引数：cssクラス名
***************************/
function changeWebFont(iptFont){
	var d=document;
	var elms=d.getElementsByTagName("*");
	l=elms.length;
	for(i=0;i<l;i++){
		var c=elms[i].className;
		if(c.indexOf(iptFont)==-1)continue;
		elms[i].className=c.replace(iptFont,iptFont+"Web");
	}
}


