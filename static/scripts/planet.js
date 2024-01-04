//POPRAVIT
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
//

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


function redraw(planets) {
    context.clearRect(0,0,canvas.width, canvas.height);
    
    planets.forEach((planet) => {planet.draw(context)});

    animationRequest = requestAnimationFrame(() => {redraw(planets)});  
}

function stopDrawing() {
    cancelAnimationFrame(animationRequest);

    context.clearRect(0,0,canvas.width, canvas.height);
}