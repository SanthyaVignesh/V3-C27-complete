class Ground{
    constructor(x,y,width,height){
        var options = {
            isStatic : true
        }

        this.width = width;
        this.height = height;
        this.body = Matter.Bodies.rectangle(x,y,this.width,this.height);
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        fill("brown");
        rectMode(CENTER);
        rect(pos.x,pos.y,this.width,this.height);
        pop();
    }
}