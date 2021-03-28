let magnet = {
  text: '',
  X: 0,
	Y: 0,
	width: 0
};

let magnetArray=[];
let magnetSelected = false;
let magnetMovingObject;
let magnetMoving = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	inputAdd = createInput();
  inputAdd.position(10, 10);
	
	inputSearch = createInput();
	inputSearch.position(10,40);
	
	buttonSearch = createButton('search');
	buttonSearch.position(inputSearch.x + 10 + inputSearch.width, 40);
	buttonSearch.mousePressed(search);
	
	buttonClear = createButton('clear all');
	buttonClear.position(240, 10);
	buttonClear.mousePressed(clearBoard);
	
	buttonAdd = createButton('add word');
  buttonAdd.position(inputAdd.x + 10 + inputAdd.width, 10);
  buttonAdd.mousePressed(generateMagnet);
}

function keyPressed() {
	if (inputAdd.value()==" "){
		inputAdd.value('');
	}
	if ((keyCode === ENTER || keyCode === 32) && inputAdd.value()!='') {
		 generateMagnet();
	}
	if (inputSearch.value()==" "){
		inputSearch.value('');
	}
	if (keyCode === ENTER && inputSearch.value()!='') {
			search();
	}
}

function generateMagnet(){
	if (inputAdd.value()!=''){
		let newMagnet = Object.create(magnet);
		newMagnet.text=inputAdd.value();
		newMagnet.X=random(windowWidth-200)+100;
		newMagnet.Y=random(windowHeight-200)+100;
		newMagnet.width=inputAdd.value().length*25;
		magnetArray.push(newMagnet);
	}
	inputAdd.value('');
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
					magnetMovingObject = magnetArray[i];
					magnetArray.splice(i,1);
					magnetArray.push(magnetMovingObject);
					magnetMoving = magnetArray.length-1;
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

function windowResized() {
	for(let i = 0; i < magnetArray.length; i++){	
		if(magnetArray[i].X>windowWidth){
			magnetArray[i].X=windowWidth;
		}
		if(magnetArray[i].Y>windowHeight){
			magnetArray[i].Y=windowHeight;
		}
	}
	resizeCanvas(windowWidth, windowHeight);
  clear();
}

function search(){
	inputSearch.value(inputSearch.value().replace(/\s+/g, ''));
	for(let i = 0; i < magnetArray.length; i++){	
		if(magnetArray[i].text==inputSearch.value()){
			magnetMovingObject = magnetArray[i];
			magnetArray.splice(i,1);
			magnetArray.push(magnetMovingObject);
			magnetArray[magnetArray.length-1].X=10+magnetArray[magnetArray.length-1].width/2;
			magnetArray[magnetArray.length-1].Y=100;
			clear();
			break;
		}
	}
	print("Sorry! There is no magnet like that.")
	inputSearch.value('');
}