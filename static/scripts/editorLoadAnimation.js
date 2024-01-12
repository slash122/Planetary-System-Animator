window.planetList = [];
//let planetNum;

function addLoadedPlanets( loadedData) {
    loadedData.forEach(planet => {
        const readyPlanet = new Planet(planet.distance, planet.radius, planet.dAlpha, planet.phase, planet.color, planet.hasRings);
        
        planet.satellites.forEach(satellite => {
            readyPlanet.satellites.push(new Planet(satellite.distance, satellite.radius, satellite.dAlpha,
                                                    satellite.phase, satellite.color, satellite.hasRings));
        }); 
        
        window.planetList.push(readyPlanet);
    });
}

$.ajax({
    url: '/editor/loadAnimation?animationIdx=' + toRender,
    method: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
        addLoadedPlanets(data);
    },  
    error: function(jqXHR, textStatus, errorThrown) {
    // Handle errors
    console.error('Error:', textStatus, errorThrown);
    }
});
    