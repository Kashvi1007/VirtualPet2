//variables 
var database;
var dog, dogImg, happyDog;
var foodS = 20;
var lastFed = 0;
var currentTime = 0;
var foodObj = null;
var feedButton, addButton;
var gameState;
var fed = 0;

//load images
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  washroomImg = loadImage("images/WashRoom.png");
  bedroomImg = loadImage("images/BedRoom.png");
  gardenImg = loadImage("images/Garden.png");
}


function setup() {

  //canvas
  createCanvas(600, 800);

  //database
  database = firebase.database();

  //button to feed the dog
  feedButton = createButton("Feed the dog");
  feedButton.position(700, 95);
  feedButton.mousePressed(feedDog);

  //button to add food for the dog
  addButton = createButton("Add food");
  addButton.position(800, 95);
  addButton.mousePressed(addFood);

  //create foodObj
  foodObj = new Food();

  //create dog
  dog = createSprite(490, 280);
  dog.scale = 0.3;
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDog);

  //gameState
  gameState = "HUNGRY";
}


function draw() {  

  //background
  background(46, 139, 87);

  getCurrentTime();

  if(gameState === "SATIATED"){
    feedButton.hide();
    addButton.hide();
    dog.addImage("dog2", happyDog);
    dog.x = 300; 
    dog.y = 300;
  }else if(currentTime === lastFed + 1){
    garden();
    gameState = "PLAYING";
    updateGameState(gameState);
  }else if((currentTime >= lastFed + 2) &&(currentTime <= lastFed + 4)){
 
    updateGameState(gameState);
  }
  //display last fed
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }

   //draw all sprites
  drawSprites();

  //display food stock
  fill(245, 245, 220);
  textSize(20);
  text("Food Stock : " + foodS, 30, 40);

}


//increment foodS, updateFoodStock using foodS
function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}


//change dog image, deduct foodS, updateFoodStock using foodS, set lastFed
function feedDog(){
  if((foodS > 0) && (gameState === "HUNGRY")){
    dog.changeAnimation("dog2", happyDog);
    foodS--;
    foodObj.updateFoodStock(foodS);
    lastFed = hour();
    foodObj.updateLastFed(lastFed);
    satiate();
  }
}

function satiate(){
  if((lastFed === currentTime)){
    fed++;
    if(fed >= 10){
      gameState = "SATIATED";
      updateGameState(gameState);
    }
  }
}

//update gamestate in database
function updateGameState(state){
  database.ref("/").update({GameState: state});
}


//get present time from system
function getCurrentTime(){
  currentTime = hour();
}

