let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

console.log(canvas);

//canvas.style.background = "#ff8";

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = 1000;
canvas.height = 800;

context.fillStyle = "red";
context.fillRect(0, 0, 200, 200);

let xPos = 300, yPos = 300;
let dx = 2, dy = 2;

// let dAlpha = 2 * Math.PI / 720;
// let dBeta = 2 * Math.PI / 720;
// let Alpha = 0, Beta = 0;

class Planet {
    constructor(id) {
        this.id = id;
        this.distance = 50;
        this.radius = 10;
        this.dAlpha = 2 * Math.PI / 720;
        this.alpha = 0;
    }

    setDistance(distance) {
        this.distance = distance;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    draw(ctx) {
        const pos = this.getCurrentPosition();
        drawCircle(ctx, "black", pos.x, pos.y, this.radius);
    }

    updateAlpha() {
        alpha -= dAlpha;
        if (alpha == -2 * Math.PI)
            alpha = 0;
    }

    getCurrentPosition() {
        return {x : Math.cos(this.alpha) * this.distance, y : Math.sin(this.alpha) * this.distance};
    }
}

function drawCircle(context, color, x, y, radius) {
    context.strokeStyle = color;
    context.fillStyle = color; 
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.stroke();
    context.fill();
    context.closePath();   
}

function redrawSquare() {
    context.clearRect(0,0,canvas.width, canvas.height);
    
    //context.fillRect(400 + Math.cos(Alpha) * xPos, 300 + Math.sin(Alpha) * yPos, 200, 200);
    drawCircle(context, "red", 500 + Math.cos(Alpha) * 200, 400 + Math.sin(Alpha) * 200, 100);
    drawCircle(context, "green", 500 + Math.cos(Alpha) * 200 + Math.cos(Beta) * 150, 400 + Math.sin(Alpha) * 200 + Math.sin(Beta) * 150, 30);
    // drawCircle(context, "blue", 500 + Math.cos(Alpha) * 200 + Math.cos(Beta) * 150 + Math.cos(Alpha) * 60, 
    //             400 + Math.sin(Alpha) * 200 + Math.sin(Beta) * 150 + Math.sin(Alpha) * 60, 15);
    Alpha -= dAlpha;
    Beta -= dBeta;
    
    if (Alpha == -2 * Math.PI)
        Alpha = 0;

    if (Beta == -2 * Math.PI)
        Beta = 0;
    
    // xPos+=dx; yPos+=dy;
    
    // if (xPos == 800 || xPos == 0) {
    //     dx = -dx;
    // }
    
    // if (yPos == 600 || yPos == 0) {
    //     dy = -dy;
    // }

    

    requestAnimationFrame(redrawSquare);  
}

redrawSquare();




