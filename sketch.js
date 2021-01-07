var ground,player,playerA,bananaI,foodGroup,obstacleI,obstacleGroup,background1,backImage;
var score
var gameState;

function preload() {
  playerA = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaI = loadImage("banana.png");
  obstacleI = loadImage("stone.png");
  backImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400, 400);
  background1 = createSprite(200,200,400,400);
  background1.addImage(backImage);
  background1.velocityX = -4;
  background1.scale = 0.9;
  player = createSprite(80,360,20,20);
  player.addAnimation("monkey",playerA);
  player.scale = 0.1;
  ground = createSprite(200,390,400,10);
  ground.visible = false;
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  score = 0;
  gameState = "play";
}

function draw() {
  background(220);
  if (gameState == "play") {
  food();
  obstacles();
  player.collide(ground);
  if (background1.x < 0) {
    background1.x = 200;
  }
  if (keyDown("space")&&player.y>=345.09) {
    player.velocityY = -10;
  }
  player.velocityY = player.velocityY+0.4;
  if (foodGroup.isTouching(player)) {
    score = score+2;
    foodGroup.destroyEach();
  }
  switch(score) {
    case 10: player.scale = 0.11;
      break;
    case 20: player.scale = 0.12;
      break;
    case 30: player.scale = 0.13;
      break;
    default: break;
  }
    if (obstacleGroup.isTouching(player)) {
    gameState = "end";
    background1.velocityX = 0;
    player.destroy();
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
      player.scale = 0.1;
}
  }
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  if (gameState == "end") {
    stroke("orange");
     textSize(40);
     fill("orange");
    text("GAME OVER",80,200);
  }
}
function food() {
  if (frameCount % 100 == 0) {
    var banana = createSprite(400,random(240,280),20,20);
    banana.scale = 0.05;
    banana.addImage("b",bananaI);
    banana.velocityX = -4;
    banana.lifetime = 136;
    foodGroup.add(banana);
  }
}
function obstacles() {
  if (frameCount % 120 == 0) {
    var obstacle = createSprite(400,360,20,20);
    obstacle.scale = 0.1;
    obstacle.addImage(obstacleI);
    obstacle.velocityX = -4;
    obstacle.lifetime = 136;
    obstacleGroup.add(obstacle);
  }
}