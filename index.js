
const canvas=document.querySelector('canvas');
const innerwidth=window.innerWidth;
const innerheight=window.innerHeight;

canvas.width=innerwidth-10;
canvas.height=innerheight-10;
var c=canvas.getContext('2d');



function randomIntreger(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//pythagorous theorem
function getDistance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}




function  Star(x,y,radious){
    this.x=x;
    this.velocity={
        x:(Math.random()-0.5)*20,
        y:3
    }
    // this.dy=dy;
    // this.dx=dx;
    this.gravity=1;
    this.friction=0.6;
    this.y=y;
    this.radious=radious;
    this.color='white';
}
Star.prototype.draw=function(){
    c.save();
    c.beginPath();
    c.arc(this.x, this.y,this.radious,0,360,false);
    c.fillStyle=this.color;
    c.shadowColor='#E3EAEf';
    c.shadowBlur=20;
    c.fill();
    c.restore();
}
Star.prototype.update=function(){
    this.draw();
    if(this.y+this.radious+this.velocity.y>canvas.height-groundHeight){
        this.velocity.y=-this.velocity.y*this.friction;
        //creating the ministars
        this.shatter();
    }
    else{
        this.velocity.y+=this.gravity;
    }
    this.x+=this.velocity.x;
    this.y+=this.velocity.y;
}
Star.prototype.shatter=function(){

    this.radious-=3;
    for(var i=0;i<8;i++){
        ministar.push(new Ministars(this.x,this.y,2))
    }
}


//creating the mini stars thst appears after the star hitting the ground
function Ministars(x,y,radious){
    Star.call(this,x,y,radious)
    this.x=x;
    this.velocity={
        x:randomIntreger(-5,5),
        y:randomIntreger(-15,15)
    }
    // this.dy=dy;
    // this.dx=dx;
    this.opacity=1;
    this.gravity=0.3;
    this.friction=0.8
    this.y=y;
    this.radious=radious;
    this.timeToLeave=100;
}
Ministars.prototype.draw=function(){
    c.save();
    c.beginPath();
    c.arc(this.x, this.y,this.radious,0,360,false);
    c.fillStyle=`rgba(227,234,239,${this.opacity})`;
    c.shadowColor='#E3EAEf';
    c.shadowBlur=20;
    c.fill();
    c.restore();
}
Ministars.prototype.update=function(){
    this.draw();
    if(this.y+this.radious+this.velocity.y>canvas.height-groundHeight){
        this.velocity.y=-this.velocity.y*this.friction;
    }
    else{
        this.velocity.y+=this.gravity;
    }
    this.x+=this.velocity.x;
    this.y+=this.velocity.y;
    this.timeToLeave-=1;
    this.opacity-=1/this.timeToLeave;
}

//creating mountain ranges--
function createMountainRange(mountAmt,height,color){
    for(var i=0;i<mountAmt;i++){
        const mountainWidth=canvas.width/mountAmt;
        c.beginPath();
        c.moveTo(i*mountainWidth,canvas.height);
        c.lineTo(i*mountainWidth+mountainWidth+325,canvas.height);
        c.lineTo(i*mountainWidth+mountainWidth/2,canvas.height-height);
        c.lineTo(i*mountainWidth-325,canvas.height);
        c.fillStyle=color;
        c.fill();
        c.closePath();
    }
}



//creating background gradient
const backgroundGradient=c.createLinearGradient(0,0,0,canvas.height);
backgroundGradient.addColorStop(0,"#171e26");
backgroundGradient.addColorStop(1,"#3f586b");


var ministar=[];
var starArr=[];
var backgroundStars=[];
let ticker=0;
let randomSpwanRate=75;
let groundHeight=75;
// for(var i=0;i<1;i++){
//     var x=Math.random()*(innerwidth-40)+20;
//     var y=20;
//     // var dx=(Math.random()-0.5);
//     // var dy=(Math.random()-0.5);
//     // var dx=4;
//     // var dy=4;
//     // var radious=randomIntreger(40,50);
//     var radious=30;
//     starArr.push(new Star(x,y,radious));
// }
for(var i=0;i<150;i++){
    var x=randomIntreger(0,canvas.width);
    var y=randomIntreger(0,canvas.height);
    var radious=randomIntreger(1,3);
    backgroundStars.push(new Star(x,y,radious));
}


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle=backgroundGradient;
    c.fillRect(0,0,innerwidth,innerheight);
    for(var i=0;i<backgroundStars.length;i++){
        backgroundStars[i].draw();
    }
    createMountainRange(1,canvas.height-100,'#384551');
    createMountainRange(2,canvas.height-150,'#2B3843');
    createMountainRange(3,canvas.height-300,'#26333E');
    c.fillStyle='#182028';
    c.fillRect(0,canvas.height-groundHeight,canvas.width,groundHeight);
    for(var i=0;i<starArr.length;i++){
        starArr[i].update();
        if(starArr[i].radious==0){
            starArr.splice(i,1);
        }
    }
    for(var i=0;i<ministar.length;i++){
        ministar[i].update();
        if(ministar[i].timeToLeave==0){
            ministar.splice(i,1);
        }
    }
    ticker++;
    if(ticker% randomSpwanRate==0){
        let x=randomIntreger(0,canvas.width);
        starArr.push(new Star(x,-100,9));
        randomSpwanRate=randomIntreger(75,200);
    }
}

animate();

