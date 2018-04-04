//JavaScript Document
//贪吃蛇
var int = 20;	//每一步的步长（调节后须对总体尺寸重新计算，慎调！）
var timer;
var timer_time = 200;
var code = 39;	//初始键值
var snake;
var head;
var score;
var U,D,L,R = true;
var na = 3; // 1,2,3,4分别代表初始方向←,↑,→,↓
var food = document.getElementsByClassName("food")[0];
var btn = document.getElementsByClassName("btn")[0];
var wrapper = document.getElementsByClassName("wrapper")[0];
var area = document.getElementsByClassName("area")[0];
var loser = document.getElementById("loser");
//点击开始
btn.onclick = function () {
	btn.style.display = "none"
	start();
}
//初始化
function initial() {
	// snake.style.display = "none";
	loser.style.display = "none";
	food.style.display = "none";
	btn.style.display = "";
	snake = [[5,2,"head"],[4,2,"body"],[3,2,"body"]];
}
//加载随机食物
function foodr() {
	//食物随机分布
	food.style.top = rand() * int + "px";
	food.style.left = rand() * int + "px";
}
//渲染蛇
function snaker() {
	for(var i = 0;i < snake.length;i ++){
		var snaker = document.createElement("div");
		snaker.style.width = int + "px";
		snaker.style.height = int + "px";
		snaker.style.position = "absolute";
		snaker.style.fontSize = 26 + "px";
		snaker.style.lineHeight = 20 + "px";
		snaker.style.boxSizing = "border-box";
		snaker.style.left = snake[i][0] * int + "px";
		snaker.style.top = snake[i][1] * int + "px";
		snaker.setAttribute("class","snaker");
		snaker.setAttribute("node_dot",i)
		if(snake[i][2] == "head") {
			snaker.innerHTML = "♧";
			snaker.style.transform = "rotateZ(90deg)";
		}else {snaker.style.backgroundColor = "black";}
		area.appendChild(snaker);
		// console.log("turely");
	}
}
//移除蛇
function dele() {
	// for(var i = 0;i < snake.length;i ++) {
	// 	area.removeChild(document.getElementsByClassName("snaker")[i]);
	// }
	var snaked = document.querySelectorAll(".snaker");
	// console.log(snaked.length);
	for(var i = 0;i < snaked.length; i ++) {
		snaked[i].parentNode.removeChild(snaked[i]);
	}		
}
function rtime() {
	timer = setTimeout(move,timer_time);
}
//游戏开始
function start() {
	//食物和蛇显示
	// snake.style.display = "";
	food.style.display = "";
	//食物随机出现
	foodr();
	//蛇头的初始位置
	snaker();
	// snake.style.top = 2 * int + "px";
	// snake.style.left = 5 * int + "px";
	//计时器开始计时
	// timer = setInterval(move, timer_time);
	rtime();
}
//游戏结束
function fina() {
	clearInterval(timer);
	dele();
	food.style.display = "none";
	loser.style.display = "";
	score();
}
function move() {
	// console.log("1");
	rtime();
	var snakedi = document.getElementsByClassName("snaker");
	// console.log(snakedi);
	for(var i = snake.length - 1;i > 0; i --) {
		snake[i][0] = snake[i - 1][0];
		snake[i][1] = snake[i - 1][1];
	}
	// snake[0][0] += 1;
	switch (na) {
		case 1:
			snake[0][0] -= 1;
			break;
		case 2:
			snake[0][1] -= 1;
			break;
		case 3:
			snake[0][0] += 1;
			break;
		case 4:
			snake[0][1] += 1;
			// document.getElementsByClassName("snaker")[0].style.transform = "rotateZ(180deg)";
			break;
	}
	dele();
	snaker();
	switch (na) {
		case 1:
			snakedi[0].style.transform = "rotateZ(270deg)";
			break;
		case 2:
			snakedi[0].style.transform = "rotateZ(0deg)";
			break;
		case 3:
			snakedi[0].style.transform = "rotateZ(90deg)";
			break;
		case 4:
			snakedi[0].style.transform = "rotateZ(180deg)";
			break;
	}
	addbody();
	direct();
	judge();
}
//获取随机数
function rand(x) {
	x = Math.floor(Math.random() * 25);
	return x;
}
//给蛇添加身体
function addbody() {
	head = document.querySelector(".snaker");
	if(parseInt(food.style.left) == parseInt(head.style.left) && parseInt(food.style.top) == parseInt(head.style.top)) {
		// console.log("+1");
		snake.push([2,2,"body"]);
		timer_time -= 5;
		foodr();
	}
}
//方向控制
function direct() {
	switch(code) {	//让四个if相互关联
		case 37:
			if(L) {
				na = 1;
				R = false;
				U = true;
				D = true;
			}else {
				console.log("方向锁定");
			}
			break;
		case 38:
			if(U) {
				na = 2;
				R = true;
				L = true;
				D = false;
			}else {
				console.log("方向锁定");
			}
			break;
		case 39:
			if(R) {
				na = 3;
				L = false;
				U = true;
				D = true;
			}else {
				console.log("方向锁定");
			}
			break;
		case 40:
			if(D) {
				na = 4;
				R = true;
				U = false;
				L = true;
			}else {
				console.log("方向锁定");
			}
			break;
		case 32:
			clearInterval(timer);
	}
}
//获取键值
document.onkeydown = function(e){
	// console.log(e.keyCode);
	return code = e.keyCode;
}
//判断游戏是否结束
function judge() {
	var headL = parseInt(head.style.left),
		headT = parseInt(head.style.top);
	var snaked = document.querySelectorAll(".snaker");
	if(headL < 0 || headL > 480 || headT < 0 || headT > 480) {
		fina();
	}
	// console.log(snaked);
	// console.log("L" + headL);
	// console.log("T" + headT);
	for(var i = 1; i < snaked.length;i ++) {
		// console.log(snaked[i].style.left);
		// console.log(snaked[i].style.top);
		if(headL == parseInt(snaked[i].style.left) && headT == parseInt(snaked[i].style.top)) {
			
			fina();
		}
	}
}
//分数显示
function score() {
	score = snake.length - 3;
	document.getElementById("score").innerHTML = "分数：" + score;
}
window.onload = initial();