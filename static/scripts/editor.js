const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let animationRequest;

const planetList = [];
let planetNum = 0;

function addPlanet() {
    planetList.push(new Planet(50, 10, 2*Math.PI / 720, 0, 'white', false));
    planetNum++;
    setZeroAlpha();
    renderList();
    setListeners();
}

function setZeroAlpha() {
    planetList.forEach((planet) => {
        planet.alpha = 0 + planet.phase;
        planet.satellites.forEach((satellite) => {
            satellite.alpha = 0 + satellite.phase;
        })
    });
}

function renderList() {
    const container = document.getElementById('editor-planet-list');
    container.innerHTML = '';
    let count = 1;
    container.innerHTML = '';
    planetList.forEach((planet) => {
        let planetDiv = `<div class="planetDiv">
            <p class="planetCount">${count}</p>
            <input type="button" value="Delete planet" id="deletePlanetButton_${count}">
            <input type="range" min="0" max="600" value="${planet.distance}" id="distanceRange_${count}">
            <input type="range" min="1" max="100" value="${planet.radius}" id="radiusRange_${count}">
            <input type="range" min="180" max="2880" value="${Math.pow(planet.dAlpha, -1) * 2 * Math.PI}" id="dAlphaRange_${count}">
            <input type="button" value="Add satellite" id="addSatelliteButton_${count}">
        </div>`;
        count++;
        container.innerHTML += planetDiv;   
        renderSatelliteList(planet, container)
    }); 
}

function renderSatelliteList(planet, container) {
    let count = 1;
    planet.satellites.forEach( (satellite) => {
        let satelliteDiv = `<div class="satelliteDiv">
            <p class="planetCount">${count}</p>
            <input type="button" value="Delete satellite" id="deleteSatelliteButton_${count}">
            <input type="range" min="0" max="100" value="${satellite.distance}" id="satelliteDistanceRange_${count}">
            <input type="range" min="1" max="40" value="${satellite.radius}" id="satelliteRadiusRange_${count}">
            <input type="range" min="60" max="2880" value="${Math.pow(satellite.dAlpha, -1) * 2 * Math.PI}" id="satelliteAlphaRange_${count}">
        </div>`;
        count++;
        container.innerHTML += satelliteDiv;
    });
}

function setListeners() {
    for (let i = 0; i < planetNum; i++) {
        let deleteButton = document.getElementById(`deletePlanetButton_${i+1}`);
        deleteButton.addEventListener('click', (event) => {
            planetList.splice(i, 1);
            renderList();
            setListeners();
        });

        let distanceSlider = document.getElementById(`distanceRange_${i+1}`);
        distanceSlider.addEventListener('input',(event) => {
            planetList[i].setDistance(distanceSlider.value);
        });

        let radiusSlider = document.getElementById(`radiusRange_${i+1}`);
        radiusSlider.addEventListener('input',(event) => {
            planetList[i].radius = radiusSlider.value;
        });

        let dAlphaSlider = document.getElementById(`dAlphaRange_${i+1}`);
        dAlphaSlider.addEventListener('input', (event) => {
            planetList[i].dAlpha = 2 * Math.PI / dAlphaSlider.value;
            console.log(2 * Math.PI / dAlphaSlider.value);
        })

        let addSatelliteButton = document.getElementById(`addSatelliteButton_${i+1}`);
        addSatelliteButton.addEventListener('click', (event) => {
            planetList[i].satellites.push(new Planet(20, 3, 2*Math.PI / 720, 0, 'grey', false));
            setZeroAlpha();
            renderList();
            setListeners();
        })
    
        setSatelliteListeners(planetList[i]);
    }
}

function setSatelliteListeners(planet) {
    for (let i = 0; i < planet.satellites.length; i++) {
        let deleteButton = document.getElementById(`deleteSatelliteButton_${i+1}`);
        deleteButton.addEventListener('click', (event) => {
            planet.satellites.splice(i, 1);
            renderList();
            setListeners();
        });

        let distanceSlider = document.getElementById(`satelliteDistanceRange_${i+1}`);
        distanceSlider.addEventListener('input',(event) => {
            planet.satellites[i].setDistance(distanceSlider.value);
        });

        let radiusSlider = document.getElementById(`satelliteRadiusRange_${i+1}`);
        radiusSlider.addEventListener('input',(event) => {
            planet.satellites[i].radius = radiusSlider.value;
        });

        let dAlphaSlider = document.getElementById(`satelliteAlphaRange_${i+1}`);
        dAlphaSlider.addEventListener('input', (event) => {
            planet.satellites[i].dAlpha = 2 * Math.PI / dAlphaSlider.value;
            console.log(2 * Math.PI / dAlphaSlider.value);
        });
    }
}

redraw(planetList);