let platform = new H.service.Platform({
    'apikey': 'nhn-0As3Iqcg-aSUWTPD62VghHO1G4T0bJD2yLQzgC8'
  });


function landmarkGeocode() {
  let title = document.querySelector('h1').textContent;
  var geocoder = platform.getGeocodingService(),
    landmarkGeocodingParameters = {
      searchtext: title,
      jsonattributes : 1
    };

  geocoder.search(
    landmarkGeocodingParameters,
    showMap,
    () => console.log(e)
  );
}

function showMap(result) {
    let location = result.response.view[0].result[0].place.locations[0].displayPosition;
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.latitude, 
                lng: location.longitude }
    });
  
    let marker = new H.map.Marker({ lat: location.latitude, 
                                    lng: location.longitude });
    map.addObject(marker);
  let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  let ui = H.ui.UI.createDefault(map, defaultLayers);

}

landmarkGeocode();