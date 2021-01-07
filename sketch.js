//Create variables here
var chageGameState, readGameState;
var gameState = "dummy";
var dogSad,
  dogImg1,
  foodCount = 20;
var addFood, feed;
var lastFed = 0;
function preload() {
  dogSad = loadImage("images/Dog.png");
  dogHappy = loadImage("images/happy dog.png");
  milkImage = loadImage("images/milk.png");
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
  garden = loadImage("Images/Garden.png");
  washroom = loadImage("Images/Wash Room.png");
  bedroom = loadImage("Images/Bed Room.png");
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(700, 350);
  dog.addImage(dogSad);
  milk = createSprite(620, 370);
  milk.addImage(milkImage);
  food1 = new Food();
  milk.scale = 0.08;

  dog.scale = 0.15;
  database = firebase.database();
  foodref = database.ref("food");
  foodref.on("value", readStock);

  readGameStateref = database.ref("gameState");
  readGameStateref.on("value", function (data) {
    readGameState = data.val();
  });

  addFood = createButton("Add Milk");
  feed = createButton("Feed dog");
  addFood.position(260, 60);
  feed.position(470, 60);

  addFood.mousePressed(addMilk);
  feed.mousePressed(feedMilk);
}

function draw() {
  background("purple");

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);

  stroke("Red");
  text("Food remaining : " + foodCount, 170, 200);
  textSize(23);
  text("Note: Press Space Key To Feed Drago Milk!", 200, 600);
  //food1.display()
  if (gameState != "hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  timeref = database.ref("time");
  timeref.on("value", readTime);
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 60);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 60);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 60);
  }
  currentTime = hour();
  console.log("lastfed"+lastFed)
  if (currentTime == lastFed + 1) {
    food1.garden();
    gameState = "playing";
    updateState(gameState);
  } else if (currentTime == lastFed + 2) {
    food1.bedroom();
    gameState = "sleeping";
    updateState(gameState);
  } else if (currentTime > lastFed + 2 || currentTime < lastFed + 4) {
    food1.washroom();
    gameState = "bathing";
    updateState(gameState);
  } else {
   food1.display();
    gameState = "hungry";
    updateState(gameState);
  }
}
function addMilk() {
  dog.addImage(dogHappy);
  foodCount++;
  database.ref("/").update({
    food: foodCount,
  });
}

function feedMilk() {
  foodCount--;
  if (foodCount < 0) {
    foodCount = 0;
  }
  food1.updateFood(foodCount);
  database.ref("/").update({
    food: foodCount,
    time: hour(),
  });
}
function readTime(data) {
  lastFed = data.val();
}

function readStock(data) {
  foodCount = data.val();
  food1.updateFood(foodCount);
}

function updateState(state) {
  database.ref("/").update({
    gameState: state,
  });
}
