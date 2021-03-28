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
	
	buttonClear = createButton('clear all');
	buttonClear.position(240, 10);
	buttonClear.mousePressed(clearBoard);
	
	button = createButton('add word');
  button.position(input.x + 10 + input.width, 10);
  button.mousePressed(generateMagnet);
}

function keyPressed() {
	if (input.value()==" "){
		input.value('');
	}
	if ((keyCode === ENTER || keyCode === 32) && input.value()!='' && input.value()!=' ') {
		generateMagnet();
	} 
}

function generateMagnet(){
	if (input.value()!=''){
		let newMagnet = Object.create(magnet);
		newMagnet.text=input.value();
		newMagnet.X=random(windowWidth-200)+100;
		newMagnet.Y=random(windowHeight-200)+100;
		newMagnet.width=input.value().length*25;
		magnetArray.push(newMagnet);
	}
	input.value('');
}

function draw() {
	
	textAlign(CENTER);
	fill(255,255,255);
	strokeWeight(2);
	rect(windowWidth-150, windowHeight-100,100,50);
	fill(0,0,0);
	textSize(25);
	strokeWeight(0);
  text("TRASH", windowWidth-100, windowHeight-67);
	
	for(let i = 0; i < magnetArray.length; i++){	
		strokeWeight(2);
		fill(255,255,255);
		stroke(0,0,0);
		rect(magnetArray[i].X-(magnetArray[i].width/2), magnetArray[i].Y -32, magnetArray[i].width, 44);
		strokeWeight(0);
		fill(0,0,0);
		textSize(32);
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
		if(mouseX> windowWidth-150 && windowWidth-50){
				if(mouseY > windowHeight-100 && mouseY < windowHeight-50){
					magnetArray.splice(magnetMoving,1);
					clear();
				}
		}
		magnetSelected = false;
	}
}

function clearBoard(){
	magnetArray=[];
	clear();
}