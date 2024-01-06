window.planetList = [];
window.planetNum;

function addLoadedPlanets( loadedData) {
    loadedData.forEach(planet => {
        planetList.push(new Planet(planet.distance, planet.radius, planet.dAlpha, 
                            planet.phase, planet.color, planet.hasRings));
    });
    planetNum = planetList.length;
}

$.ajax({
    url: '/editor/loadAnimation?animationIdx=' + toRender,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        addLoadedPlanets(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
    // Handle errors
    console.error('Error:', textStatus, errorThrown);
    }
});
    