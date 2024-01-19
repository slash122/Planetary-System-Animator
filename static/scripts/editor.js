const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let animationRequest;

const planetList = window.planetList;


function addPlanet() {
    planetList.push(new Planet(50, 10, 2*Math.PI / 720, 0, '#ee2b2b', false));
    
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
    console.log(planetList);
    planetList.forEach( planet => {
        let planetDiv = `<div class="planetDiv">
            <label class="planetCount">Planet ${count}</label>
            <input type="button" value="Delete planet" class="delete-button" id="deletePlanetButton_${count}"><br>

            <div class="column-container">
                <div class="column">
                <label> Distance: </label>
                <input type="range" min="0" max="600" value="${planet.distance}" id="distanceRange_${count}"><br>

                <label> Radius: </label>
                <input type="range" min="1" max="100" value="${planet.radius}" id="radiusRange_${count}"><br>

                <label> dAlpha (1/sliderVal): </label>
                <input type="range" min="180" max="2880" value="${Math.pow(planet.dAlpha, -1) * 2 * Math.PI}" id="dAlphaRange_${count}"><br>
                </div>
                <div class="column">
                <label> Phase (0 to 2Pi): </label>
                <input type="range" min="0" max="6.28318" value="${planet.phase}" id="phaseRange_${count}"><br>

                <label> Color: </label>
                <input type="color" value="${planet.color}" id="colorPick_${count}"><br>

                <label> Has rings: </label>
                <input type="checkbox" id="hasRingsCheck_${count}" ${planet.hasRings ? 'checked' : ''}><br>
                </div>
            </div>

            <input type="button" value="Add satellite" id="addSatelliteButton_${count}">
        </div>`;
        container.innerHTML += planetDiv;   
        renderSatelliteList(planet, count, container)
        count++;
    }); 
}

function renderSatelliteList(planet, planetCount, container) {
    let count = 1;
    planet.satellites.forEach( (satellite) => {
        let satelliteDiv = `<div class="satelliteDiv">
            <label class="planetCount">Satellite ${count}</label>
            <input type="button" value="Delete satellite" class="delete-button" id="deleteSatelliteButton_${planetCount}_${count}"><br>

            <div class="column-container">
                <div class="column">
                <label> Distance: </label>
                <input type="range" min="0" max="600" value="${satellite.distance}" id="satelliteDistanceRange_${planetCount}_${count}"><br>

                <label> Radius: </label>
                <input type="range" min="1" max="100" value="${satellite.radius}" id="satelliteRadiusRange_${planetCount}_${count}"><br>

                <label> dAlpha (1/sliderVal): </label>
                <input type="range" min="180" max="2880" value="${Math.pow(satellite.dAlpha, -1) * 2 * Math.PI}" id="satelliteAlphaRange_${planetCount}_${count}"><br>
                </div>
                <div class="column">
                <label> Phase (0 to 2Pi): </label>
                <input type="range" min="0" max="6.28318" value="${satellite.phase}" id="satellitePhaseRange_${planetCount}_${count}"><br>

                <label> Color: </label>
                <input type="color" value="${satellite.color}" id="satelliteColorPick_${planetCount}_${count}"><br>

                <label> Has rings: </label>
                <input type="checkbox" id="satelliteHasRingsCheck_${planetCount}_${count}" ${satellite.hasRings ? 'checked' : ''}><br>
                </div>
            </div>
        </div>`;
        count++;
        container.innerHTML += satelliteDiv;
    });
}

function setListeners() {
    for (let i = 0; i < planetList.length; i++) {
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
            // console.log(2 * Math.PI / dAlphaSlider.value);
        })

        let phaseSlider = document.getElementById(`phaseRange_${i+1}`);
        phaseSlider.addEventListener('input', (event) => {
            planetList[i].phase = phaseSlider.value;
            setZeroAlpha();
        });

        let colorPick = document.getElementById(`colorPick_${i+1}`);
        colorPick.addEventListener('input', (event) => {
            planetList[i].color = colorPick.value;
        });

        let hasRingsCheck = document.getElementById(`hasRingsCheck_${i+1}`);
        hasRingsCheck.addEventListener('input', (event) => {
            planetList[i].hasRings = hasRingsCheck.checked;
        });

        let addSatelliteButton = document.getElementById(`addSatelliteButton_${i+1}`);
        addSatelliteButton.addEventListener('click', (event) => {
            planetList[i].satellites.push(new Planet(20, 3, 2*Math.PI / 720, 0, '#40d600', false));
            setZeroAlpha();
            renderList();
            setListeners();
        })
        
        setSatelliteListeners(planetList[i], i+1);
    }
}

function setSatelliteListeners(planet, planetCount) {
    for (let i = 0; i < planet.satellites.length; i++) {
        let deleteButton = document.getElementById(`deleteSatelliteButton_${planetCount}_${i+1}`);
        deleteButton.addEventListener('click', (event) => {
            planet.satellites.splice(i, 1);
            renderList();
            setListeners();
        });

        let distanceSlider = document.getElementById(`satelliteDistanceRange_${planetCount}_${i+1}`);
        distanceSlider.addEventListener('input',(event) => {
            planet.satellites[i].setDistance(distanceSlider.value);
        });

        let radiusSlider = document.getElementById(`satelliteRadiusRange_${planetCount}_${i+1}`);
        radiusSlider.addEventListener('input',(event) => {
            planet.satellites[i].radius = radiusSlider.value;
        });

        let dAlphaSlider = document.getElementById(`satelliteAlphaRange_${planetCount}_${i+1}`);
        dAlphaSlider.addEventListener('input', (event) => {
            planet.satellites[i].dAlpha = 2 * Math.PI / dAlphaSlider.value;
            console.log(2 * Math.PI / dAlphaSlider.value);
        });

        let phaseSlider = document.getElementById(`satellitePhaseRange_${planetCount}_${i+1}`);
        phaseSlider.addEventListener('input', (event) => {
            planet.satellites[i].phase = phaseSlider.value;
            setZeroAlpha();
        });

        let colorPick = document.getElementById(`satelliteColorPick_${planetCount}_${i+1}`);
        colorPick.addEventListener('input', (event) => {
            planet.satellites[i].color = colorPick.value;
        });

        let hasRingsCheck = document.getElementById(`satelliteHasRingsCheck_${planetCount}_${i+1}`);
        hasRingsCheck.addEventListener('input', (event) => {
            planet.satellites[i].hasRings = hasRingsCheck.checked;
        });
    }
}

renderList();
setListeners();

redraw(planetList);


