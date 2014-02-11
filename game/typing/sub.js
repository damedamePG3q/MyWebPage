/***************
ÉçÅ[É}éÆÇ…ïœä∑
*****************/	
function convTypeRome(s){
	var s;
	var l,i;
	var cmvList=[	[/shi/g,"si"],[/ji/g,"zi"],[/chi/g,"ti"],[/tsu/g,"tu"],[/fu/g,"hu"],[/sha/g,"sya"],
					[/shu/g,"syu"],[/sho/g,"syo"],[/ja/g,"zya"],[/ju/g,"zyu"],[/jo/g,"zyo"],[/cha/g,"tya"],
					[/chu/g,"tyu"],[/cho/g,"tyo"],[/she/g,"sye"],[/che/g,"tye"]
				];
	l=cmvList.length;
	for(i=0;i<l;i++){
		s=s.replace(cmvList[i][0],cmvList[i][1]);
	}
	return s;
}

/***************
ÉwÉ{ÉìéÆÇ…ïœä∑
*****************/
function convTypeHepburn(s){
	var s;
	var l,i;
	var cmvList=[
					[/si/g,"shi"],[/zi/g,"ji"],[/ti/g,"chi"],[/tu/g,"tsu"],[/^hu/g,"fu"],[/[^cs]{1}hu/g,"fu"],[/sya/g,"sha"],
					[/syu/g,"shu"],[/syo/g,"sho"],[/zya/g,"ja"],[/zyu/g,"ju"],[/zyo/g,"jo"],[/tya/g,"cha"],
					[/tyu/g,"chu"],[/tyo/g,"cho"],[/sye/g,"she"],[/tye/g,"che"]
				];
	l=cmvList.length;
	for(i=0;i<l;i++){
		s=s.replace(cmvList[i][0],cmvList[i][1]);
	}
	return s;
}
