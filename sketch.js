var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var gobI, aobI, bg;

var aobGroup, gobGroup;


function preload(){
  trex_running =   loadImage("mazikeen.png");
//  trex_collided = loadAnimation("trex_collided.png");
bg = loadImage("backgroung.jpg")
  
  groundImage = loadImage("ground2.png");
 
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  gobI = loadImage("obstacle.png");
aobI = loadImage("arrow.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(95,180,20,50);
  
  trex.addImage(trex_running);
 // trex.addAnimation("collided", trex_collided);
  trex.scale = 0.3;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  gobGroup = new Group ();
  aobGroup  = new Group ();
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("white");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
   // trex.changeAnimation("running", trex_running);
    
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
   groundObstacles();
   airObstacles();
  
   if(aobGroup.isTouching(trex)|| gobGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
   aobGroup.setVelocityXEach(0);
    gobGroup.setVelocityXEach(0);
    
    //change the trex animation
   // trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
   gobGroup.setLifetimeEach(-1);
    aobGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
 // obstaclesGroup.destroyEach();
 // cloudsGroup.destroyEach();
  score = 0;
}


function groundObstacles(){
  if(frameCount%95 == 0){
var gob = createSprite(600,445,10,40)
 gob.addImage(gobI)
 gob.scale = 0.3
  gob.velocityX = -2;
  gob.lifetime = 300; 
  gobGroup.add(gob);
  console.log("ground")
  }
 }
 
 function airObstacles(){
     if(frameCount%125 ===0){
        var  aob = createSprite(600,80,40,10)
         aob.addImage(aobI)
         aob.scale = 0.1;
         aob.y = Math.round(random(250,450))
         aob.velocityX = -2;
         aob.lifetime = 300; 
         aobGroup.add(aob);
         console.log("air")
     }
 }
