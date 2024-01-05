const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let animationRequest;

function mainAnimation() {
    console.log(canvas);

    // canvas.width = 1000;
    // canvas.height = 850;

    const planets = [];
    
    planets.push(new Planet(0, 40, 0, 0, 'yellow', false)); //Solnce
    planets.push(new Planet(55, 3, 2*Math.PI / 200, 0, '#8B0000', false)); //Merkurij
    planets.push(new Planet(66, 4, 2*Math.PI / 400, 0, '#FFF3D7', false)); //Venera
    planets.push(new Planet(94, 7, 2*Math.PI / 600, 0, '#2585FF', false)); //Zemlya
    planets[planets.length - 1].addSatellite(new Planet(15, 2, 2*Math.PI / 180, 0, 'grey', false));  //Luna
    planets.push(new Planet(120, 5, 2*Math.PI / 800, 0, '#E17800', false)); // Mars
    planets.push(new Planet(200, 24, 2*Math.PI / 1800, 0, '#FFB460', false)); //Jupiter
    planets.push(new Planet(265, 14, 2*Math.PI / 2200, -Math.PI/2, '#FFE3A4', true)); //Saturn
    planets.push(new Planet(310, 10, 2*Math.PI / 3200, Math.PI/3, '#00A5A0', false)); //Uran
    planets.push(new Planet(330, 8, 2*Math.PI / 4000, Math.PI/2, '#005AB4', false)); //Neptun
    planets.push(new Planet(400, 2, 2*Math.PI / 6500, Math.PI, '#A59166', false)); //Pluton 

    //let test = new Planet(20, 3, 2*Math.PI / 180, 0, 'blue', false);
    
    console.log(planets);
    redraw(planets);
}

window.onload = mainAnimation;