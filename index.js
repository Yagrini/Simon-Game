var on=false;
var T=false;
var strict=false;
var choix=false;
var turn=false;
var arr=[];
var rep=0;
var chec=0;
var arr1=[1,2,3];
var delai=1000;

function choosecolor(arg)
{
	if(arg<=1)  color = "#00ff05"; 
	else if(arg==2) color = "#ef4646";
	else if(arg==3) color = "#ffff00";
	else if(arg==4) color = "#0d4eff";
	return color;
}
function returncolor(arg){
	if(arg==1) color = "#009803"; 
	else if(arg==2) color = "#c10000";
	else if(arg==3) color = "#ffd335";
	else if(arg==4) color = "#0600c1";
	$("#div"+arg).css("background-color",color);
}
function game(){
	play();
	replay();
}
function play(){
	var i = Math.round(Math.random()*4);
	if(i<=1) i=1;
	arr.push(i);
}
function replay(){
	if(rep<arr.length)
	{
		if(arr.length>=10) delai=800;
		else if(arr.length>=12) delai=600;
		else if(arr.length>=15) delai=400;
		$("#div"+arr[rep]).css("background-color",choosecolor(arr[rep]));
		setTimeout('returncolor('+arr[rep]+')',delai*0.8);
		document.getElementById('sound'+arr[rep]).play();
		rep++;
		if(rep>=10) document.getElementById('score').value=rep;
		else document.getElementById('score').value='0'+rep;
		setTimeout(replay,delai);
	}
	else 
		{
			rep = 0;
			$("#noyau1").css("cursor","pointer");
			document.getElementById('score').value='00';
			turn = true;
		}
}
function check(arg){
	if(turn)
	{
		if(arg!==arr[chec]) 
			{
				document.getElementById('score').value='!!';
				document.getElementById('wrong').play();
				if(strict) 
					{
						setTimeout(recommancer,900);
						setTimeout(game,1000);
					}
				else 
					{
						turn = false;
						chec = 0;
						setTimeout(replay,1000);
					}
			}
		else 
		{
			document.getElementById('sound'+arr[chec]).play();
			chec++;
			if(chec>=10) document.getElementById('score').value=chec;
			else document.getElementById('score').value='0'+chec;
		}
		if(chec==arr.length && arr.length<20)
		{
			turn = false;
			chec = 0;
			$("#noyau1").css("cursor","default");
			setTimeout(game,1000);
		}
		if(chec==arr.length && arr.length>=20)
		{
			$('#winner').css('visibility','visible');
			$('#winner').css('animation-name','anime');
			$('#winner').css('animation-duration','4s');
			turn = false;
			$("#noyau1").css("cursor","default");
			setTimeout(recommancer,3000);
			setTimeout(game,3500);
		}
	}
}
function recommancer(){
 turn=false; arr=[]; rep=0; chec=0; $("#noyau1").css("cursor","default"); document.getElementById('score').value='--';
 $('#winner').css('visibility','hidden'); $('#winner').css('animation','none');
}

$(document).ready(function(){

$("#on").on("click",function(){
	if(!on)
	{
		$("#on").css("background-color","#3cb371");
		$("#off").css("background-color","black");
		T = true;
		setTimeout(game,1000);
		on=true;
	}
});
$("#off").click("click",function(){
	$("#off").css("background-color","#ba0000");
	$("#on").css("background-color","black");
	$("#strict").css("background-color",'#ffff66');
	recommancer();
	on=false;
	T = false;
});
$("#restart").on("click",function(){
	if(T)
	{
		recommancer();
		game();
	}
});
$("#strict").click("click",function(){
	if(T) 
		{
			if(!choix)
			{
				$("#strict").css("background-color",'#ef4646');
				strict = true;
				choix = true;
			}
			else 
			{
				$("#strict").css("background-color",'#ffff66');
				strict = false;
				choix = false;
			}
		}
});
$("#div1").mousedown(function(){
		if(turn) $("#div1").css("background-color",choosecolor(1));
 });
$("#div1").mouseup(function(){
		if(turn) $("#div1").css("background-color",returncolor(1));
});
$("#div2").mousedown(function(){
		if(turn) $("#div2").css("background-color",choosecolor(2));
});
$("#div2").mouseup(function(){
		if(turn) $("#div2").css("background-color",returncolor(2));
});
$("#div3").mousedown(function(){
		if(turn) $("#div3").css("background-color",choosecolor(3));
});
$("#div3").mouseup(function(){
		if(turn) $("#div3").css("background-color",returncolor(3));
});
$("#div4").mousedown(function(){
		if(turn) $("#div4").css("background-color",choosecolor(4));
});
$("#div4").mouseup(function(){
		if(turn) $("#div4").css("background-color",returncolor(4));
});
});

















