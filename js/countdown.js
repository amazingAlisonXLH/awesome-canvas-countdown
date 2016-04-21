/* author: AlisonXLH */

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var radius = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//倒计时截止到某个绝对时间
// const endTime = new Date(2015, 3, 30, 04, 30, 07);

// 倒计时截止时间为1小时之后
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#FD1D1D","#FC6415","#E8F81C","#2EF00E","#18F3A6","#1487EE","#D50EF9","#13776C","#FC3DBC","#F4E888"];

window.onload = function(){

	// 屏幕自适应
	// WINDOW_WIDTH = document.documentElement.clientWidth;
	// WINDOW_HEIGHT = document.documentElement.clientHeight;
	// MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	// MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	// radius = Math.round(WINDOW_WIDTH*4/5/108)-1;

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(function(){
		render(context);
		update();
	}, 50)
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);
	// var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds(); //显示当前时间
	return ret>0?ret:0;
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var
		nextHour = parseInt(nextShowTimeSeconds/3600),
		nextMinute = parseInt((nextShowTimeSeconds-nextHour*3600)/60),
		nextSecond = nextShowTimeSeconds%60;
	var
		curHour = parseInt(curShowTimeSeconds/3600),
		curMinute = parseInt((curShowTimeSeconds-curHour*3600)/60),
		curSecond = curShowTimeSeconds%60;
	if(curSecond != nextSecond){
		if(parseInt(curHour/10) != parseInt(nextHour/10)){
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour/10));
		}
		if(parseInt(curHour%10) != parseInt(nextHour%10)){
			addBalls(MARGIN_LEFT+15*(radius+1), MARGIN_TOP, parseInt(curHour%10));
		}

		if(parseInt(curMinute/10) != parseInt(nextMinute/10)){
			addBalls(MARGIN_LEFT+39*(radius+1), MARGIN_TOP, parseInt(curMinute/10));
		}
		if(parseInt(curMinute%10) != parseInt(nextMinute%10)){
			addBalls(MARGIN_LEFT+54*(radius+1), MARGIN_TOP, parseInt(curMinute%10));
		}

		if(parseInt(curSecond/10) != parseInt(nextSecond/10)){
			addBalls(MARGIN_LEFT+78*(radius+1), MARGIN_TOP, parseInt(curSecond/10));
		}
		if(parseInt(curSecond%10) != parseInt(nextSecond%10)){
			addBalls(MARGIN_LEFT+93*(radius+1), MARGIN_TOP, parseInt(curSecond%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
		updateBalls();
}

function updateBalls(){
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT-100){
			balls[i].y = WINDOW_HEIGHT-100;
			balls[i].vy = -balls[i].vy*0.65;
		}
	}
	var cnt = 0;
	for(var i=0; i<balls.length; i++){
		if(balls[i].x+radius>0 && balls[i].x-radius<WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length>Math.min(300, cnt)){
		balls.pop();
	}
	// console.log(balls.length);
}

function addBalls(x, y, num){
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aball = {
					x: x+j*2*(radius+1)+(radius+1),
					y: y+i*2*(radius+1)+(radius+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy: -5,
					color: colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aball);
			}

		}
	}

}


function render(cxt){
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //对绘制上下文进行刷新
	var
		hour = parseInt(curShowTimeSeconds/3600),
		minute = parseInt((curShowTimeSeconds-hour*3600)/60),
		second = curShowTimeSeconds%60;
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour/10), cxt);
	renderDigit(MARGIN_LEFT+15*(radius+1), MARGIN_TOP, parseInt(hour%10), cxt);
	renderDigit(MARGIN_LEFT+30*(radius+1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT+39*(radius+1), MARGIN_TOP, parseInt(minute/10), cxt);
	renderDigit(MARGIN_LEFT+54*(radius+1), MARGIN_TOP, parseInt(minute%10), cxt);
	renderDigit(MARGIN_LEFT+69*(radius+1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT+78*(radius+1), MARGIN_TOP, parseInt(second/10), cxt);
	renderDigit(MARGIN_LEFT+93*(radius+1), MARGIN_TOP, parseInt(second%10), cxt);

	for(var i=0; i<balls.length; i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, radius, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt){
	cxt.fillStyle = "#DD1E22";
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1), y+i*2*(radius+1)+(radius+1), radius, 0, 2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}

}
