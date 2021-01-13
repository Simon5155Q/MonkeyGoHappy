
var monkey , monkey_running, ground, obstacle, banana, jungle, playButton, gameOver, continueButton;
var bananaImage, obstacleImage, jungleImage, playButtonImage, gameOverImage, continueButtonImage;
var foodGroup, obstacleGroup, playButtonGroup;
var score;
var life = 3;
var PLAY = 1;
var END = 0;
var START = 2;
var highScore = 0;
var gameState = START;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
  playButtonImage = loadImage("PLAY V2.jpg");
  gameOverImage = loadImage("game_over_PNG42.png");
  continueButtonImage = loadImage("continue.png");
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(50,500,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  jungle = createSprite(300,300,50,50);
  jungle.addImage(jungleImage);
  jungle.depth = 0.5;
  jungle.x = jungle.width /2;
  
  ground = createSprite(300,535,600,10);
  score = 0;
  playButton = createSprite(300,200,10,10);
      playButton.addImage(playButtonImage);

  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  background(220);
  if (score > highScore ) {
    highScore = score; 
   }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  monkey.debug = false;
  monkey.setCollider("circle",0,0,250);
  
  ground.visible = false;
  if(monkey.isTouching(foodGroup)){
      score = score + 1;
      foodGroup.destroyEach();
      monkey.scale = monkey.scale + 0.03;
    }
    if (jungle.x < 200){
      jungle.x = jungle.width/2;
    }

    if(gameState === START){
      if(mousePressedOver(playButton)){
        gameState = PLAY;
        playButton.destroy();
      }
    }
  
  if(gameState === PLAY){
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    
    
   jungle.velocityX = -6;
   
  
    
    
    monkey.velocityY = monkey.velocityY + 0.8
    spawnBanana();
    spawnObstacles();
    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      life = life - 1;
       
    }
    if(life === 0){
      gameState = END;
    }
    
  }
  
    if (gameState === END) {
      console.log("End")
     
      monkey.velocityY = 0;
      jungle.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }
  

  drawSprites();
  textSize(20);
  stroke("blue");
  fill("blue");
  text("Score: "+ score, 500,50);
  textSize(20);
  stroke("red");
  fill("red");
  text("Life: "+ life, 440,50);
  textSize(20);
  stroke("green");
  fill("green");
  text("HighScore: "+ highScore, 450,70);
  
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   obstacle = createSprite(400,500,10,40);
   obstacle.depth = 0.6;
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -6;
    obstacle.lifetime = 134;
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 90 === 0){
   banana = createSprite(400,400,10,40);
   banana.depth = 0.6;
   banana.y = Math.round(random(350,400));
   banana.addImage(bananaImage);
   banana.velocityX = -6;
    banana.lifetime = 134;
   banana.scale = 0.1;
   foodGroup.add(banana);
 }
  
}






