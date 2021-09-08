const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const fps = 60

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
class Square{
    constructor(vec2,size,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,size,size)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        ctx.fill()
        ctx.closePath()
    }
}
class Rect{
    constructor(vec2,width,height,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,width,height)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        ctx.fill()
        ctx.closePath()
    }
}
class Circle{
    constructor(vec2,size,color){
        ctx.beginPath();
        ctx.arc()
        ctx.arc(vec2.x,vec2.y,size,0,Math.PI*2)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        ctx.fill()
        ctx.closePath()
    }
}

setInterval(drawLoop,1/fps)

function drawLoop(){
    //!DO NOT REMOVE!
    ctx.clearRect(0,0,canvas.width,canvas.height) //clear canvas

    new Square(new vec2(50,50), 30)

}