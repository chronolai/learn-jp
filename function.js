var x,y,z;

function rand(){
	/**** 清音、濁音、半濁音 ****/
	if(document.getElementById("seion").checked==false&&document.getElementById("dakuon").checked==false&&document.getElementById("handakuon").checked==false){x = 3;}
	if(document.getElementById("seion").checked==false&&document.getElementById("dakuon").checked==false&&document.getElementById("handakuon").checked==true){x = 2;}
	if(document.getElementById("seion").checked==false&&document.getElementById("dakuon").checked==true&&document.getElementById("handakuon").checked==false){x = 1;}
	if(document.getElementById("seion").checked==false&&document.getElementById("dakuon").checked==true&&document.getElementById("handakuon").checked==true){x = Math.floor(Math.random()*2+1);}
	if(document.getElementById("seion").checked==true&&document.getElementById("dakuon").checked==false&&document.getElementById("handakuon").checked==false){x = 0;}
	if(document.getElementById("seion").checked==true&&document.getElementById("dakuon").checked==false&&document.getElementById("handakuon").checked==true){x = Math.floor(Math.random()*3);if(x==1){rand();}}
	if(document.getElementById("seion").checked==true&&document.getElementById("dakuon").checked==true&&document.getElementById("handakuon").checked==false){x = Math.floor(Math.random()*2);}
	if(document.getElementById("seion").checked==true&&document.getElementById("dakuon").checked==true&&document.getElementById("handakuon").checked==true){x = Math.floor(Math.random()*3);}
	
	/**** 音 ****/
	if(x==0){y = Math.floor(Math.random()*50);}
	if(x==1){y = Math.floor(Math.random()*20);}
	if(x==2){y = Math.floor(Math.random()*5);}
	if(x==3){y = 0;}
	
	/**** ローマ字、平仮名、片仮名 ****/
	if(document.getElementById("hiragana").checked==false&&document.getElementById("katakana").checked==false){z=0;}
	if(document.getElementById("hiragana").checked==true&&document.getElementById("katakana").checked==false){z=1;}
	if(document.getElementById("hiragana").checked==false&&document.getElementById("katakana").checked==true){z=2;}
	if(document.getElementById("hiragana").checked==true&&document.getElementById("katakana").checked==true){z = Math.floor(Math.random()*2+1);	}
	
	/**** DEBUG LINE ****/
	//if(x==3){alert("ERROR!")}
}

function print(){
	rand();

	if(jp[x][y][0]==""){print();
	}
	else{document.getElementById("print").innerHTML = jp[x][y][z];document.getElementById("print").title = jp[x][y][0];
/**** TEST LINE ****/document.getElementById("answer").innerHTML = jp[x][y][0];
	}
	document.getElementById("input").focus();
	document.getElementById("answer").innerHTML = "";
}

function tip(){
	document.getElementById("answer").innerHTML = jp[x][y][0];
}

function answer(){
	if(document.getElementById("input").value == jp[x][y][0]){print();
	}
	else{document.getElementById("answer").innerHTML = "ERROR";
	}
	document.getElementById("input").value ="";
	document.getElementById("input").focus();
}

function keyin(k){
	if(k==13){answer();}
	if(k==16){tip();}
}