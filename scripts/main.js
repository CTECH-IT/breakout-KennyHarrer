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
    Game.Player = new Player()
    Game.Ball = new Ball()
    Game.Squares = [] // TODO: FIND POSITIONS FOR SQUARES
}

class Player{
    constructor(x,length,color){
        this.xCoord = x
        this.platformLength = length
        this.color = color!=undefined?color:"#ffffff"// if color is undefined use white
    }
    get X(){
        return this.xCoord
    }
    get length(){
        return this.platformLength
    }
    setLength(length){
        this.platformLength = length
    }
    setColor(color){
        this.color = color!=undefined?color:"#ffffff"// if color is undefined use white
    }

    
}
class Ball{
    constructor(){

    }
}

class vec2{
    constructor(x,y){
        this.xCoord = x
        this.yCoord = y
    }
    get x(){
        return this.xCoord
    }
    get y(){
        return this.yCoord
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