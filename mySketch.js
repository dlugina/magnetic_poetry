//magnetArray[i].X-(magnetArray[i].width/2), magnetArray[i].Y -32 top left
//magnetArray[i].X-(magnetArray[i].width/2), magnetArray[i].Y +12 bottom left
//magnetArray[i].X+(magnetArray[i].width/2), magnetArray[i].Y -32 top right
//magnetArray[i].X+(magnetArray[i].width/2), magnetArray[i].Y +12 bottom right

let magnet = {
  text: '',
  X: 0,
	Y: 0,
	width: 0
};

let magnetArray=[];
let magnetSelected = false;
let magnetMoving = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	input = createInput();
  input.position(10, 10);
	
	button = createButton('add word');
  button.position(input.x + 10 + input.width, 10);
  button.mousePressed(generateMagnet);
}

function generateMagnet(){
	const name = input.value();
	let newMagnet = Object.create(magnet);
	newMagnet.text=input.value();
	newMagnet.X=random(windowWidth);
	newMagnet.Y=random(windowHeight);
	newMagnet.width=input.value().length*25;
	magnetArray.push(newMagnet);
}

function draw() {
	for(let i = 0; i < magnetArray.length; i++){	
		strokeWeight(2);
		fill(255,255,255);
		stroke(0,0,0);
		rect(magnetArray[i].X-(magnetArray[i].width/2), magnetArray[i].Y -32, magnetArray[i].width, 44);
		fill(0);
		strokeWeight(0);
		textSize(32);
		textAlign(CENTER);
		text(magnetArray[i].text,magnetArray[i].X, magnetArray[i].Y);
	}
}

function mousePressed(){
	for(let i = magnetArray.length-1; i >= 0; i--){	
			if(mouseX> magnetArray[i].X-(magnetArray[i].width/2) && mouseX<magnetArray[i].X+(magnetArray[i].width/2)){
				if(mouseY > magnetArray[i].Y -32 && mouseY < magnetArray[i].Y +12){
					magnetSelected = true;
					magnetMoving = i;
					break;
				}
			}
	}
}

function mouseDragged() {
	if (magnetSelected){
		magnetArray[magnetMoving].X=mouseX;
		magnetArray[magnetMoving].Y=mouseY;
		draw();
		clear();
	}
}

function mouseReleased(){
	if (magnetSelected){
		magnetSelected = false;
	}
}
