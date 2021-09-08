const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const fps = 60

var Game = {
    States:{
        TITLE:   0,
        PLAYING: 1,
        OVER:    3,
    },
    State:undefined,
    Player:undefined,
    Ball:undefined,
    Squares:undefined,
}

function InitializeGame(){
    Game.State = Game.States.TITLE
    Game.Player = new Player(0,30,5)
    Game.Ball = new Ball()
    Game.Squares = [] // TODO: FIND POSITIONS FOR SQUARES
}

class Player{
    constructor(x,length,speed,color){
        this.x = x
        this.length = length
        this.speed = speed
        this.color = color!=undefined?color:"#ffffff"// if color is undefined use white
    }
    setLength(length){
        this.length = length
    }
    setColor(color){
        this.color = color!=undefined?color:"#ffffff"// if color is undefined use white
    }
    setX(x){
        this.x = x
    }
    setSpeed(speed){
        this.speed = speed
    }
}
class Ball{
    constructor(vec2Position,vec2DirectionOffset,size,speed,color){
        this.pos = vec2Position
        this.directionOffset = vec2DirectionOffset
        this.size = size
        this.speed = speed
        this.color = color 
    }
    setPos(pos){
        this.pos = pos
    }
    setSize(size){
        this.size = size
    }
    setOffset(offset){
        this.directionOffset = offset
    }
    setspeed(speed){
        this.speed = speed
    }
    setColor(color){
        this.col = color!=undefined?color:"#ffffff"// if color is undefined use white
    }
}
class vec2{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}
class square{
    constructor(vec2,size,fill,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,size,size)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        if(fill) {
            ctx.fill()
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }else{
            ctx.stroke()
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }
        ctx.closePath()
    }
}
class rect{
    constructor(vec2,width,height,fill,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,width,height)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        if(fill) {
            ctx.fill()
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }else{
            ctx.stroke()
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }
        ctx.closePath()
    }
}
class circle{
    constructor(vec2,size,fill,color){
        ctx.beginPath();
        ctx.arc()
        ctx.arc(vec2.x,vec2.y,size,0,Math.PI*2)
        if(fill) {
            ctx.fill()
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }else{
            ctx.stroke()
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        }
        ctx.closePath()
    }
}

setInterval(drawLoop,1/fps)

function drawLoop(){
    //!DO NOT REMOVE!
    ctx.clearRect(0,0,canvas.width,canvas.height) //clear canvas

    new square(new vec2(50,50), 30, false)

}