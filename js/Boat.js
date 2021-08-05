class Boat{
    constructor(x,y,width,height,boatAnimation){
        var options  = {
            restitution : 0.8,
            friction : 1.0,
            density : 1.0
        };

        this.speed = 0.05;
        this.body = Bodies.rectangle(x,y,width,height);
        this.width = width;
        this.height = height;
        this.boatPosition = y;
        this.image = boatAnimation;
        World.add(world,this.body);
        this.isBroken = false;
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed%this.image.length);
        
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image[index], 0, 0, this.width, this.height);
        pop();
        console.log(index);
    }

    remove(index){
        this.image = brokenBoatAnimation;
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        this.isBroken = true;
        setTimeout( ()=>{
            World.remove(world,boats[index].body);
            boats.splice(index,1);
        },2000)
        
    }

    animate(){
        this.speed += 0.05;
    }
}