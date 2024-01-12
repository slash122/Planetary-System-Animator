//POPRAVIT
// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");
//

class Planet {
    constructor(distance, radius, dAlpha, phase, color, hasRings) {
        this.distance = distance;
        this.radius = radius;
        this.dAlpha = dAlpha;//2 * Math.PI / 720;
        this.phase = phase;
        this.color = color;
        this.hasRings = hasRings;
        
        this.alpha = 0 + phase;
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

        if (this.hasRings === true){
            drawRings(ctx, this.color, 500 + pos.x, 400 + pos.y, this.radius);
        }

        drawCircle(ctx, this.color, 500 + pos.x, 400 + pos.y, this.radius);
        
        
        this.drawSatellites(ctx);
        this.updateAlpha();
    }

    drawSatellites(ctx) {
        this.satellites.forEach((satellite) => {
            const sPos = satellite.getCurrentPosition();
            const pos = this.getCurrentPosition();
            
            drawOrbit(ctx, 500 + pos.x, 400 + pos.y, satellite.distance);
            drawCircle(ctx, satellite.color, 500 + pos.x + sPos.x, 400 + pos.y + sPos.y, satellite.radius);
            
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

    serialize() {
        let serializedSatellites = [];
        this.satellites.forEach(satellite => {
            serializedSatellites.push({distance: satellite.distance, radius: satellite.radius, dAlpha: satellite.dAlpha, 
                phase: satellite.phase, color: satellite.color, hasRings: satellite.hasRings});
        });
        return {distance: this.distance, radius: this.radius, dAlpha: this.dAlpha, 
            phase: this.phase, color: this.color, hasRings: this.hasRings, satellites: serializedSatellites};
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
    context.strokeStyle = "white";
    context.beginPath();
    context.arc(x, y, distance, 0, 2 * Math.PI, true);
    context.stroke();
    context.closePath();
}

function drawRings(context, color, x, y, radius) {
    ringsThickness = radius / 4; 
    drawCircle(context, color, x, y, radius * 1.3 + ringsThickness);
    drawCircle(context, '#030014', x, y, radius * 1.3); //PIZDECOWY KOSTYL
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