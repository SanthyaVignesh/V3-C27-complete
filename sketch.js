const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground, tower,cannon,ground,cannonBall;
var backgroundImg;
var balls = [];
var boat,boats = [];

var brokenBoatAnimation = [];
var brokenBoatSpritedata,brokenBoatSpriteSheet;
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

function preload(){
    backgroundImg = loadImage("./assets/background.gif");
    boatSpritedata = loadJSON("./assets/boatSailing/ship-sailing.json");
    boatSpritesheet = loadImage("./assets/boatSailing/ship-sailing.png");
    brokenBoatSpriteSheet = loadImage("./assets/boatSailing/sinkingBoat.png");
    brokenBoatSpritedata = loadJSON("./assets/boatSailing/sinkingBoat.json");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();

    world = engine.world;
        
    tower = new Tower(150, 350, 160, 310);
    cannon = new Cannon(155, 130, 220, 150, -PI/4);
    //ground = new Ground(580,height - 20,1800,20);
    cannonBall = new CannonBall(cannon.x,cannon.y);

    var boatFrames = boatSpritedata.frames;

    for(var i =0 ;i<boatFrames.length; i++){
        var pos = boatFrames[i].position;
        var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
        boatAnimation.push(img);
    }    

    var brokenBoatFrames = brokenBoatSpritedata.frames;

    for(var i=0; i<brokenBoatFrames.length; i++){
        var pos = brokenBoatFrames[i].position;
        var img = brokenBoatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
        brokenBoatAnimation.push(img);
    }
}

function draw(){
    background(189);
    Engine.update(engine);

    image(backgroundImg,0,0,width,height);

    showBoats();

    for(var i = 0; i<balls.length; i++){
        showCannonBalls(balls[i],i);
        for(var j = 0 ; j<boats.length ; j++){
            if(balls[i]!== undefined && boats[j]!== undefined){
                var collision = Matter.SAT.collides(balls[i].body,boats[j].body);
                //console.log(collision);
                if(collision.collided){
                    boats[j].remove(j);
                    Matter.World.remove(world,balls[i].body);
                    balls.splice(i,1);
                    i--;
                }
            }
        }
    }
   

    
    tower.display();
    cannon.display();
    
   
}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        cannonBall = new CannonBall(cannon.x,cannon.y);
        Matter.Body.setAngle(cannonBall.body, cannon.angle);
        balls.push(cannonBall);
    }
}


function keyReleased(){
    if(keyCode === DOWN_ARROW){ 
        balls[balls.length-1].shoot();
    }
}


function showCannonBalls(ball, index){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height-50){
        World.remove(world,ball.body);
        balls.splice(index,1);
    }
}

function showBoats(){
    if(boats.length > 0){
        if(boats.length < 4 && boats[boats.length-1].body.position.x< width-400){
            var positions = [-200,-170,-150,-120];
            var position = random(positions);
            boat = new Boat(width, height + position,200,200 , boatAnimation); 
            boats.push(boat);      
        }
      
        for(var i =0 ; i < boats.length ; i++){
            boats[i].display(); 
            boats[i].animate();
            Matter.Body.setVelocity(boats[i].body,{x: -0.9, y : 0 });
            Matter.Body.setPosition(boats[i].body, {x : boats[i].body.position.x, y:boats[i].boatPosition})
        }
    }
    else{
        
        boat = new Boat(width,height - 100,200,200 , boatAnimation);
        
        boats.push(boat);
    }

   
}