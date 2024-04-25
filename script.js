let obstacles = [];

let wideVideos = ['MyDadFinallyWinsVictoryRoyale.mp4', 'IBought250CURSEDAmazonProducts!.mp4', 'WeBuiltaWaterparkInOurHouse!.mp4', 'HavingaSTRICTTEACHERinMinecraft!.mp4'];
let tallVideos = ['GUESStheColor.mp4', 'WhatWouldYouDrawshortsviral.mp4', 'shittyYTad1.mp4']

var urlX;
var urlY;

var playerPosX;
var playerPosY;




class Obstacle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

let sillyList = ['a','b','c','d','e']
let sillyIndex = '-1'

let main = document.getElementById('main');

// console.log((sillyIndex > 0))

document.addEventListener("DOMContentLoaded", function(){

	// get URL Params
 	var queryString = window.location.search;
 	var urlParams = new URLSearchParams(queryString);
 	urlX = urlParams.get('x');
 	urlY = urlParams.get('y');

});

function setup() {
	createCanvas(windowWidth, windowHeight);
	document.getElementById('defaultCanvas0').style.display = 'block';
 	background(0,0,0);

 	if (urlX == "" || urlX == null || (urlX == '0' && urlY == '0')) {
 		if (urlX == '0' && urlY == '0') {
 			playerPosX = localStorage.getItem("X");
 			playerPosY = localStorage.getItem("Y");
 		} else {
 			playerPosX = width/2;
 			playerPosY = height/2;
 		}

 		// creates the maze around starting area
 		mondrian(6,15,15,width-30,(height-30)/3, (Math.abs(urlX) + Math.abs(urlY)) - 1);
 		mondrian(6,15,height - ((height-30)/3 +15),width-30,(height-30)/3, (Math.abs(urlX) + Math.abs(urlY)) - 1);
 		mondrian(6,15,15+(height-30)/3,(width-30)/3,(height-30)/3, (Math.abs(urlX) + Math.abs(urlY)) - 1);
 		mondrian(6,width - ((width-30)/3 +15),15+(height-30)/3,(width-30)/3,(height-30)/3, (Math.abs(urlX) + Math.abs(urlY)) - 1);

 		// creates start text
  		let escapeDiv = document.createElement("DIV");
 		escapeDiv.setAttribute('id', 'escapeDiv');
 		let escape = document.createElement("H1");
 		escape.innerText = 'ESCAPE THE ROT';
 		escape.classList.add('text');
 		escapeDiv.appendChild(escape);


 		main.appendChild(escapeDiv);
 	} else if ((Math.abs(urlX) + Math.abs(urlY)) > 9) {
 		playerPosX = localStorage.getItem("X");
 		playerPosY = localStorage.getItem("Y");

 		//create end text
 		let freeDiv = document.createElement("DIV");
 		freeDiv.setAttribute('id','freeDiv');
 		let free1 = document.createElement("H1");
 		free1.classList.add('text');
 		free1.innerText = 'YOU MADE IT';

 		let free2 = document.createElement("H1");
 		free2.classList.add('text');
 		free2.innerText = 'EXPERIENCE THE SILENCE';

 		let free3 = document.createElement("H1");
 		free3.classList.add('text');
 		free3.innerText = 'STAY AWHILE';

 		freeDiv.appendChild(free1);
 		freeDiv.appendChild(free2);
 		freeDiv.appendChild(free3);

 		main.appendChild(freeDiv);

 	} else {
 		playerPosX = localStorage.getItem("X");
 		playerPosY = localStorage.getItem("Y");
 		mondrian(6,15,15,width-30,height-30, (Math.abs(urlX) + Math.abs(urlY)) - 1);
 	}

 	// clear obstacles
 	obstacles = [];

 	document.getElementById('defaultCanvas0').style.display = 'block';
 	stroke(0);
 	strokeWeight(1);
 	// mondrian(6,15,15,width-30,height-30, (Math.abs(urlX) + Math.abs(urlY)) - 1);

 	player = new Sprite();
 	player.diameter = 20;
 	player.x = playerPosX;
 	player.y = playerPosY;
 	player.color = '#00d635';
 	player.stroke = '#008a22';
 	player.strokeWeight = 2;

 	barriersSetUp();
}

function draw() {
	// background(150);
	// fill(255,0,0);

	if (urlX == "" || urlX == null || (urlX == '0' && urlY == '0')) {
		// position the start text
		let edp = escapeDiv.getBoundingClientRect();
		escapeDiv.style.left = (width/2)-(edp.width/2) + 'px';
		escapeDiv.style.top = height/3 + 'px';

		escapeDiv.style.opacity = '' + Math.abs(sin(frameCount * 2)) + '';
	}

	if (Math.abs(urlX) + Math.abs(urlY) > 9) {
		// position the start text
		let fp = freeDiv.getBoundingClientRect();
		freeDiv.style.left = (width/2)-(fp.width/2) + 'px';
		freeDiv.style.top = height/3 + 'px';
	}

	background(0,0,0,128);
	playerMovement();
 	barrierColliders();
	// circle(playerPosX, playerPosY, 20);
	if (navigator.userActivation.isActive) {
		document.getElementsByTagName('VIDEO').muted = false;
	}
}

function mondrian(level, x, y, w, h, d) {
	if (level == 1) {
		fill('#00d635')
		rect(35,35, w - 40, h - 40);
		// eval('let obstacle' + obstacles.length + ' = new Sprite();')
		// console.log(obstacles[obstacles.length - 1]);


		if (Math.floor(Math.random() * 10) > d){
			// create section of mondrian
			let newBlock = document.createElement("DIV");
			newBlock.style.left = x + 'px';
			newBlock.style.top = y + 'px';
			newBlock.style.width = w + 'px';
			newBlock.style.height = h + 'px';
			newBlock.classList.add('block');

			// create the block you see
			let newObstacle = document.createElement("DIV");
			newObstacle.classList.add('obstacle');
			newBlock.appendChild(newObstacle);

			// adds the video and stuff
			let newVideo = document.createElement("VIDEO");
			if (w > h) {
				let vidPick = wideVideos[Math.floor(Math.random() * wideVideos.length)];
				newVideo.src = vidPick;
			} else {
				let vidPick = tallVideos[Math.floor(Math.random() * tallVideos.length)];
				newVideo.src = vidPick;
			}
			newVideo.style.width = '100%';
			newVideo.style.height = '100%';
			newVideo.style.objectFit = 'cover';
			newObstacle.appendChild(newVideo);
			newVideo.autoplay = true;
			newVideo.muted = true;
			newVideo.loop = true;
			newVideo.load();

			// creates p5play object
			obstacles.push(new Sprite());
			let currentObstacle = obstacles[obstacles.length - 1]
			currentObstacle.collider = 'static';
			currentObstacle.color = '#00d635';
			currentObstacle.stroke = '#008a22';
			currentObstacle.x = x + 20 + ((w - 40)/2);
			currentObstacle.y = y + 20 + ((h - 40)/2);
			currentObstacle.w = w - 40;
			currentObstacle.h = h - 40;

			
			main.appendChild(newBlock);
		}

	} else {
		let fraction = round(random(1,4))/5;
		// console.log(fraction)

		if (w > h) {
			if (h < 140) {
				mondrian(1, x, y, w, h, d);
			} else {
				push();
				if ((w * fraction) < 140 || (w - (w * fraction)) < 140) {
					mondrian(1, x, y, w, h, d);
				} else {
					mondrian(level - 1, x, y, w * fraction, h, d);
					translate(w * fraction, 0);
					mondrian(level - 1, x + (w * fraction), y, w - (w * fraction), h, d);
				}
				pop();
			}
		} else {
			if (w < 140) {
				mondrian(1, x, y, w, h, d);
			} else {
				push();
				if ((h * fraction) < 140 || (h - (h * fraction)) < 140) {
					mondrian(1, x, y, w, h, d);
				} else {
					mondrian(level - 1, x, y, w, h * fraction, d);
					translate(0, h * fraction);
					mondrian(level - 1, x, y + (h * fraction), w, h - (h * fraction), d);
				}
				pop();
			}
		}
	}
}

function playerMovement() {

	if (keyIsPressed === true && keyCode === LEFT_ARROW) {
		player.vel.x = -5;
	} else if (keyIsPressed === true && keyCode === RIGHT_ARROW) {
		player.vel.x = 5;
	} else {
		player.vel.x= 0;
	}

	if (keyIsPressed === true && keyCode === UP_ARROW) {
		player.vel.y = -5;
	} else if (keyIsPressed === true && keyCode === DOWN_ARROW) {
		player.vel.y = 5;
	} else {
		player.vel.y = 0;
	}
}

function barriersSetUp() {
	topCollider = new Sprite();
	topCollider.collider = 'static';
	topCollider.x = width/2
	topCollider.y = -30;
	topCollider.w = width;
	topCollider.h = 10;

	bottomCollider = new Sprite();
	bottomCollider.collider = 'static';
	bottomCollider.x = width/2
	bottomCollider.y = height + 30;
	bottomCollider.w = width;
	bottomCollider.h = 10;

	leftCollider = new Sprite();
	leftCollider.collider = 'static';
	leftCollider.x = -30
	leftCollider.y = height/2;
	leftCollider.w = 10;
	leftCollider.h = height;

	rightCollider = new Sprite();
	rightCollider.collider = 'static';
	rightCollider.x = width + 30;
	rightCollider.y = height/2;
	rightCollider.w = 10;
	rightCollider.h = height;
}

function barrierColliders() {

	if (player.collided(topCollider)) {
		localStorage.setItem("X", player.x);
		localStorage.setItem("Y", height - 15);
		if (urlX == "" || urlX == null) {
			window.location.replace('index.html?x=0&y=1');
		} else {
			window.location.replace('index.html?x=' + urlX + '&y=' + (Number(urlY) + 1));
		}
	}

	if (player.collided(bottomCollider)) {
		localStorage.setItem("X", player.x);
		localStorage.setItem("Y", 15);
		if (urlX == "" || urlX == null) {
			window.location.replace('index.html?x=0&y=-1');
		} else {
			window.location.replace('index.html?x=' + urlX + '&y=' + (Number(urlY) - 1));
		}
	}

	if (player.collided(leftCollider)) {
		localStorage.setItem("X", width - 15);
		localStorage.setItem("Y", player.y);
		if (urlX == "" || urlX == null) {
			window.location.replace('index.html?x=-1&y=0');
		} else {
			window.location.replace('index.html?x=' + (Number(urlX) - 1) + '&y=' + urlY);
		}
	}

	if (player.collided(rightCollider)) {
		localStorage.setItem("X", 15);
		localStorage.setItem("Y", player.y);
		if (urlX == "" || urlX == null) {
			window.location.replace('index.html?x=1&y=0');
		} else {
			window.location.replace('index.html?x=' + (Number(urlX) + 1) + '&y=' + urlY);
		}
	}
}