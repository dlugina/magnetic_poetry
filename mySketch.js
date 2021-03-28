let magnet = { //magnet object, stores text value, location, and width
  text: '',
  X: 0,
	Y: 0,
	width: 0
};

let magnetArray=[]; //array of all magnets
let magnetSelected = false; //is a magnet being dragged
let magnetMovingObject; //currently dragged object
let magnetMoving = 0; //index of currently dragged object

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	//button and input for adding word
	inputAdd = createInput();
  inputAdd.position(10, 10);
	
	buttonAdd = createButton('add word');
  buttonAdd.position(inputAdd.x + 10 + inputAdd.width, 10);
  buttonAdd.mousePressed(generateMagnet);
	
	//button and input for searching word
	inputSearch = createInput();
	inputSearch.position(10,40);
	
	buttonSearch = createButton('search');
	buttonSearch.position(inputSearch.x + 10 + inputSearch.width, 40);
	buttonSearch.mousePressed(search);
	
	//button to clear canvas
	buttonClear = createButton('clear all');
	buttonClear.position(240, 10);
	buttonClear.mousePressed(clearBoard);

}

function keyPressed() {
	//enter with space and ENTER for new word
	if (inputAdd.value()==" "){
		inputAdd.value('');
	}
	if ((keyCode === ENTER || keyCode === 32) && inputAdd.value()!='') {
		 generateMagnet();
	}
	//enter with ENTER for search
	if (inputSearch.value()==" "){
		inputSearch.value('');
	}
	if (keyCode === ENTER && inputSearch.value()!='') {
			search();
	}
}

function generateMagnet(){
	//create new magnet and set to random location
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
	//draw trash bin
	textAlign(CENTER);
	fill(255,255,255);
	strokeWeight(2);
	rect(windowWidth-150, windowHeight-100,100,50);
	fill(0,0,0);
	textSize(25);
	strokeWeight(0);
  text("TRASH", windowWidth-100, windowHeight-67);
	
	//draw all magnets
	for(let i = 0; i < magnetArray.length; i++){	
		//drawing box
		strokeWeight(2);
		fill(255,255,255);
		stroke(0,0,0);
		rect(magnetArray[i].X-(magnetArray[i].width/2), magnetArray[i].Y -32, magnetArray[i].width, 44);
		//writing text
		strokeWeight(0);
		fill(0,0,0);
		textSize(32);
		text(magnetArray[i].text,magnetArray[i].X, magnetArray[i].Y);
	}
}

function mousePressed(){
	//checking if mouse is pressed in location of one of the magnets
	for(let i = magnetArray.length-1; i >= 0; i--){	//run from back to pick up magnets on top first
			if(mouseX> magnetArray[i].X-(magnetArray[i].width/2) && mouseX<magnetArray[i].X+(magnetArray[i].width/2)){
				if(mouseY > magnetArray[i].Y -32 && mouseY < magnetArray[i].Y +12){
					magnetSelected = true;
					//remove selected magnet and push on top to draw it on top
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
	//update location of dragging magnet
	if (magnetSelected){
		magnetArray[magnetMoving].X=mouseX;
		magnetArray[magnetMoving].Y=mouseY;
		draw();
		clear();
	}
}

function mouseReleased(){
	if (magnetSelected){
		//checking if magnet has been dragged over trash
		if(mouseX> windowWidth-150 && windowWidth-50){
				if(mouseY > windowHeight-100 && mouseY < windowHeight-50){
					magnetArray.splice(magnetMoving,1);
					clear();
				}
		}
		//magnet no longer being dragged
		magnetSelected = false;
	}
}

function clearBoard(){
	//clear magnet array
	magnetArray=[];
	clear();
}

function windowResized() {
	//moving magnets that fall outside window bounds back onto the screen
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
	if (inputSearch.value()!=''){
		inputSearch.value(inputSearch.value().replace(/\s+/g, '')); //remove white space from search string
		for(let i = 0; i < magnetArray.length; i++){	
			if(magnetArray[i].text==inputSearch.value()){
				//push found magnet to top of array and relocate to under the search bar
				magnetMovingObject = magnetArray[i];
				magnetArray.splice(i,1);
				magnetArray.push(magnetMovingObject);
				magnetArray[magnetArray.length-1].X=10+magnetArray[magnetArray.length-1].width/2;
				magnetArray[magnetArray.length-1].Y=100;
				clear();
				break;
			}
		}
		alert("Sorry! There is no magnet like that.")
		inputSearch.value('');
	}
}