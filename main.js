const Canvas=document.getElementById("Canvas");
Canvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const objectCtx = Canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(Canvas.width/2,Canvas.width*0.9);

const N=100;
const junk=generateJunk(N);
let bestJunk=junk[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<junk.length;i++){
        junk[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(junk[i].brain,0.1);
        }
    }
}

const traffic=[
    new Object(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
    new Object(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
];

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestJunk.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateJunk(N){
    const junk=[];
    for(let i=1;i<=N;i++){
        junk.push(new Object(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return junk;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<junk.length;i++){
        junk[i].update(road.borders,traffic);
    }
    bestJunk=junk.find(
        c=>c.y==Math.min(
            ...junk.map(c=>c.y)
        ));

    Canvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    objectCtx.save();
    objectCtx.translate(0,-bestJunk.y+Canvas.height*0.7);

    road.draw(objectCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(objectCtx);
    }
    objectCtx.globalAlpha=0.2;
    for(let i=0;i<junk.length;i++){
        junk[i].draw(objectCtx);
    }
    objectCtx.globalAlpha=1;
    bestJunk.draw(objectCtx,true);

    objectCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestJunk.brain);
    requestAnimationFrame(animate);
}