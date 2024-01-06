window.planetList = [];
//let planetNum;

function addLoadedPlanets( loadedData) {
    loadedData.forEach(planet => {
        window.planetList.push(new Planet(planet.distance, planet.radius, planet.dAlpha, 
                            planet.phase, planet.color, planet.hasRings));
    });
}

$.ajax({
    url: '/editor/loadAnimation?animationIdx=' + toRender,
    method: 'GET',
    dataType: 'json',
    async: false, //PIZDEC PIZDEC PIZDEC PIZDEC PIZDEC 5 chasow projebal
    success: function(data) {
        addLoadedPlanets(data);
    },  
    error: function(jqXHR, textStatus, errorThrown) {
    // Handle errors
    console.error('Error:', textStatus, errorThrown);
    }
});
    