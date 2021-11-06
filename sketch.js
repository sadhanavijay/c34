const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine,world;
var fruit,ground;

var fruit_con1,fruit_con_2;

var rope1,rope2;

var bg_img,food,rabbit;

var button1,button2;
var bunny,blink,eat,sad;
var mute_btn;

var bk_song, cut_sound,sad_sound,eating_sound,air;

//Declare variable for star  & starImage
var emptyStar,star1,star2,star,stars,starD;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('egg.png');
  snake = loadImage('snake.png');
  star_img = loadImage('star.png');
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  eat = loadAnimation("eating.png","snake.png");
  sad = loadAnimation("sad.png","snake.png");

  //Load star Image
  emptyStar = loadAnimation("empty.png");
  star1 = loadAnimation("one_star.png");
  star2=loadAnimation("stars.png");
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  eat.frameDelay = 20;

  snake = createSprite(200,height-80,100,100);
  snake.scale = 0.9;

  snake.addAnimation('eating',eat);
  snake.addAnimation('crying',sad);

  //Create sprite to displaystar
  starD = createSprite(50,20,30,30);
  starD.scale=0.2;
  starD.addAnimation('empty',emptyStar);
  starD.addAnimation('one',star1);
  starD.addAnimation('two',star2);
  starD.changeAnimation('empty');

  //Add animation to starsprite
 

  //create sprite for star 
  star = createSprite(320,50,20,20);
  //Add image to star sprite
  star.addImage(star_img);
  star.scale=0.02;
  //Add image to star2
  stars=createSprite(50,330,20,20);
  stars.addImage(star_img);
  stars.scale=0.02;
  //Create a blower and add image
  blower=createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,snake,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    snake.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    snake.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
  }
  //Write condition to check whether fruit and star collided or not
  //if collided than change the animation to one
  if(collide(fruit,star,20)==true){
     star.visible=false;
     starD.changeAnimation('one');
   }



  //Write condition to check whether fruit and star2 collided or not
   //if collided than change the animation to two
   if(collide(fruit,stars,40)==true){
    stars.visible=false;
    starD.changeAnimation('two');
  }



}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}


