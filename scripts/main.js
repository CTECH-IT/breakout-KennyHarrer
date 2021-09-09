const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

//https://stackoverflow.com/questions/36615592/canvas-inner-stroke

const fps = 60

var Game = {
    States:{
        TITLE:   0,
        PLAYING: 1,
        LEVELUP: 2,
        OVER:    3,
    },
    Levels:{
        1:{ //IMPORTANT: TileSize must be divisible by 480
            TileSize: 80,
            Colors: [] //white
        },
        2:{
            TileSize: 60,
            Colors: ["#4CBB17", "#006600", "#3FFF00", "#39FF14"] //green
        },
        3:{
            TileSize: 40,
            Colors: [] //yellow
        },
        4:{
            TileSize: 30,
            Colors: [] //red
        },
        5:{
            TileSize: 20,
            Colors: [true]//rainbow mode for the colors
        }
    },
    State:undefined,
    Paddle:undefined,
    Ball:undefined,
    Tiles:undefined,
    Level: undefined,
    TileZone: 150,
}

function createTiles(){ //TODO: Refactor this mess
    Game.Tiles = []
    const LevelData = Game.Levels[Game.Level]
    const TileSize = LevelData.TileSize
    const Colors = LevelData.Colors
    const TileAmount = (480/TileSize)-1
    const Padding = TileSize/2
    const TileHeight = TileSize/3
    const RowPadding = 5
    const Rows = Math.floor((Game.TileZone-Padding)/(RowPadding+TileHeight))
    for(r=0;r<Rows;r++){
        var x = Padding
        for(i=0;i<TileAmount;i++){
            Game.Tiles.push(new Tile(new vec2(x,Padding+(RowPadding*r)+(TileHeight*r)),TileSize,TileHeight,Colors[Math.floor(Math.random()*Colors.length)]))
            x+=TileSize
        }
    }
}

class Tile{
    constructor(pos,width,height,color){
        this.pos = pos
        this.width = width
        this.height = height
        this.color = color
    }
    getBounds(){
        return [new vec2(this.pos.x,this.pos.y), new vec2(this.pos.x+this.width,this.pos.y+this.height)]
    }
}

class Paddle{
    constructor(pos,width,height,speed,color){
        this.pos = pos
        this.width = width
        this.height = height
        this.speed = speed
        this.color = color!=undefined?color:"#ffffff"// if color is undefined use white
    }
    getBounds(){
        return [new vec2(this.pos.x,this.pos.y), new vec2(this.pos.x+this.width,this.pos.y+this.height)]
    }
    getCenter(){
        return new vec2(this.pos.x+(this.width/2),this.pos.y+(this.height/2))
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
    getBounds(){
        const squareSize = (this.size*1.4)*1.3141592653589793
        const one = new vec2(this.pos.x-(squareSize/2),this.pos.y-(squareSize/2))
        const two = new vec2(one.x+squareSize,one.y+squareSize)
        return [one,two]
    }
}
class vec2{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    add(vec2){
        this.x += vec2.x
        this.y += vec2.y
    }
}
class square{
    constructor(vec2,size,fill,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,size,size)
        ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
        if(fill) {
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.fill()
        }else{
            ctx.lineWidth = 2
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.stroke()
        }
        ctx.closePath()
    }
}
class rect{
    constructor(vec2,width,height,fill,color){
        ctx.beginPath();
        ctx.rect(vec2.x,vec2.y,width,height)

        if(fill) {
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.fill()
        }else{
            ctx.lineWidth = 2
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.stroke()
        }
        ctx.closePath()
    }
}
class circle{
    constructor(vec2,size,fill,color){
        ctx.beginPath();

        ctx.arc(vec2.x,vec2.y,size,0,Math.PI*2)
        if(fill) {
            ctx.fillStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.fill()
        }else{
            ctx.lineWidth = 2
            ctx.strokeStyle = color!=undefined?color:"#ffffff"// if color is undefined use white
            ctx.stroke()
        }
        ctx.closePath()
    }
}

function drawTiles(){
    for(tile of Game.Tiles){
        var color
        if(tile.color == true){
            color = "hsl("+Date.now()*0.07%360+",80%,50%)"
        }else{
            color = tile.color
        }
        new rect(tile.pos,tile.width,tile.height,false,color)
    }
}

var left = false
var right = false

document.addEventListener('keydown', function(key){
    if(key.code == "ArrowRight"){
        right = true
    }else if(key.code == "ArrowLeft"){
        left = true
    }
})

document.addEventListener('keyup', function(key){
    if(key.code == "ArrowRight"){
        right = false
    }else if(key.code == "ArrowLeft"){
        left = false
    }
})

function InitializeGame(){
    
    Game.State = Game.States.TITLE
    Game.Paddle = new Paddle(new vec2(5,canvas.height-25),100,15,5,"#e67e22")
    Game.Ball = new Ball(new vec2(30,240), new vec2(1,-1),10,1,"#e74c3c")
    Game.Level = 5
    createTiles()
    //drawLoop()
    Game.Interval = setInterval(drawLoop,1/fps)
}

function loseGame(){

    clearInterval(Game.Interval)
    ctx.clearRect(0,0,canvas.width,canvas.height) //not clearing for some reason?

}

function arrayRemoveValue(array, value){
    return array.filter( (curvalue) => {
        return value != curvalue
    })
}

function posWithinBounds(pos,bounds){
    const p = pos
    const Xmax = Math.max(bounds[0].x,bounds[1].x)
    const Ymax = Math.max(bounds[0].y,bounds[1].y)
    const Xmin = Math.min(bounds[0].x,bounds[1].x)
    const Ymin = Math.min(bounds[0].y,bounds[1].y)
    if (p.x > Xmin && p.x < Xmax && p.y > Ymin && p.y < Ymax) {
        return true
    }
    return false
}
function BoundsWithinBounds(boundsA,boundsB){

    const AXmax = Math.max(boundsA[0].x,boundsA[1].x)
    const AYmax = Math.max(boundsA[0].y,boundsA[1].y)
    const AXmin = Math.min(boundsA[0].x,boundsA[1].x)
    const AYmin = Math.min(boundsA[0].y,boundsA[1].y)

    const BXmax = Math.max(boundsB[0].x,boundsB[1].x)
    const BYmax = Math.max(boundsB[0].y,boundsB[1].y)
    const BXmin = Math.min(boundsB[0].x,boundsB[1].x)
    const BYmin = Math.min(boundsB[0].y,boundsB[1].y)

    var APositions = [new vec2(AXmin,AYmin), new vec2(AXmin,AYmax), new vec2(AXmax,AYmin), new vec2(AXmax,AYmax)]
    var BPositions = [new vec2(BXmin,BYmin), new vec2(BXmin,BYmax), new vec2(BXmax,BYmin), new vec2(BXmax,BYmax)]

    for(p of APositions){
        if (p.x > BXmin && p.x < BXmax && p.y > BYmin && p.y < BYmax) {
            return true
        }
    }

    for(p of BPositions){
        if (p.x > AXmin && p.x < AXmax && p.y > AYmin && p.y < AYmax) {
            return true
        }
    }

    return false

}


const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function ballCollisonCheck(){
    if(!Game.Tiles) return
    const offset = Game.Ball.directionOffset
    const p = Game.Ball.pos
    const pBounds = Game.Ball.getBounds()
    for(i=0;i<Game.Tiles.length;i++){
        const tile = Game.Tiles[i]
        const bounds = tile.getBounds()
        if(BoundsWithinBounds(pBounds,bounds)){
            Game.Ball.directionOffset = new vec2(offset.x*-1,offset.y*-1)
            Game.Tiles = arrayRemoveValue(Game.Tiles, tile)
            break
        }
    }

    if(BoundsWithinBounds(pBounds,Game.Paddle.getBounds())){
        const PaddleCenter = Game.Paddle.getCenter()
        const speed = Game.Ball.speed
        const x = clamp((p.x-PaddleCenter.x)*(speed/10),-(speed),(speed))
        Game.Ball.directionOffset = new vec2
        (x,-speed)
    }

}

function gameLogicLoop() {

    Game.Ball.pos.add(Game.Ball.directionOffset)

    ballCollisonCheck()

    //Bouncing off the walls!!
    if(Game.Ball.pos.y < Game.Ball.size*2){ //top
        const offset = Game.Ball.directionOffset
        Game.Ball.directionOffset = new vec2(offset.x,offset.y*-1)
    }

    if(Game.Ball.pos.x  < Game.Ball.size*2){ //left
        const offset = Game.Ball.directionOffset
        Game.Ball.directionOffset = new vec2(offset.x*-1,offset.y)
    }

    if(Game.Ball.pos.x > canvas.width-(Game.Ball.size*2)){ //right
        const offset = Game.Ball.directionOffset
        Game.Ball.directionOffset = new vec2(offset.x*-1,offset.y)
    }

    //Lose condition:
    if(Game.Ball.pos.y > canvas.height-Game.Ball.size){
        loseGame()
        return
    }

    //Move paddle

    if(left && Game.Paddle.pos.x > 2){
        Game.Paddle.pos.x += -1
    }
    
    if(right && Game.Paddle.pos.x < canvas.width-1-Game.Paddle.width){
        Game.Paddle.pos.x += 1
    }

}

function drawLoop(){
    //!DO NOT REMOVE!
    ctx.clearRect(0,0,canvas.width,canvas.height) //clear canvas


    gameLogicLoop()

    const ball = Game.Ball
    new circle(ball.pos,ball.size,false,ball.color)
    const paddle = Game.Paddle
    new rect(paddle.pos,paddle.width,paddle.height,false,paddle.color)

    drawTiles()

}



InitializeGame()