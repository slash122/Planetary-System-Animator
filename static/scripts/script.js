let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

console.log(canvas);

canvas.width = 1000;
canvas.height = 850;

context.fillStyle = "red";
context.fillRect(0, 0, 200, 200);

let xPos = 300, yPos = 300;
let dx = 2, dy = 2;


class Planet {
    constructor(id, distance, radius) {
        this.id = id;
        this.distance = distance;
        this.radius = radius;
        this.dAlpha = 2 * Math.PI / 720;
        this.alpha = 0;
        this.satellites = [];
    }

    setDistance(distance) {
        this.distance = distance;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    draw(ctx) {
        const pos = this.getCurrentPosition();
        
        drawOrbit(ctx, 500, 400, this.distance);
        drawCircle(ctx, "black", 500 + pos.x, 400 + pos.y, this.radius);
        
        this.updateAlpha();
        this.drawSatellites(ctx);
    }

    drawSatellites(ctx) {
        this.satellites.forEach((satellite) => {
            const sPos = satellite.getCurrentPosition();
            const pos = this.getCurrentPosition();
            
            drawOrbit(ctx, 500 + pos.x, 400 + pos.y, satellite.distance);
            drawCircle(ctx, "blue", 500 + pos.x + sPos.x, 400 + pos.y + sPos.y, satellite.radius);
            
            satellite.updateAlpha();
        })
    }

    updateAlpha() {
        this.alpha -= this.dAlpha;
        if ( Math.abs(this.alpha + 2  * Math.PI) < 0.001 ) {
            this.alpha = 0;
        }
    }

    getCurrentPosition() {
        return {x : Math.cos(this.alpha) * this.distance, y : Math.sin(this.alpha) * this.distance};
    }

    addSatellite(satellite) {
        this.satellites.push(satellite);
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

function drawOrbit(context, x, y, distance) {
    context.strokeStyle = "black";
    context.beginPath();
    context.arc(x, y, distance, 0, 2 * Math.PI, true);
    context.stroke();
    context.closePath();
}

const planets = [new Planet(1, 40, 10), new Planet(2, 100, 5), new Planet(3, 200, 20)];
planets[1].dAlpha = 2*Math.PI / 600;
planets[2].dAlpha = 2*Math.PI / 1000; 

let test = new Planet(10, 20, 3);
test.dAlpha = 2 * Math.PI / 180;
planets[0].addSatellite(test);

function redraw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    
    planets.forEach((planet) => {planet.draw(context)});

    requestAnimationFrame(redraw);  
}
redraw();




