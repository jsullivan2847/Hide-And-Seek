//VARIABLES................................................
let markers = [];
let randomLocations = [];
const $deleteButton = $("#deleteBtn");
const $newLocationButton = $('#newLocation')
const $mapBox1 = $("#map1")[0];
const $streetView = $("#streetView")[0];
const googleUrl =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrL26kHgHcE6O9YC-F7mbxCXhwscpSsdA&callback=initMap";

//BUTTONS..................................................
$newLocationButton.on('click', function(){
  getRandomLocation();
  console.log(randomLocation)
  console.log(randomLocations)
  //console.log(randomLocation)
})

$deleteButton.on("click", function () {
  console.log("clicked");
  deleteMarker(marker);
});

//API CALL.................................................
$.ajax({ url: googleUrl, dataType: "jsonp" }).then(function () {
  initMaps(brooklyn);
});


//Testing Locations
//longitude and latitude range from 
//-90 to 90 Lat
//-180 to 180 long
const brooklyn = { lat: 40.650002, lng: -73.949997 };
const timesSquare = { lat: 40.758, lng: -73.9855 };



//parameters for map are coordinates (in the form of an object)
function initMaps(location) {
  //MAP 1......STREET VIEW.........................
  getRandomLocation();
  console.log(randomLocation)
  //map instantiation passing in DOM location and the actual *location*
  const map0 = new google.maps.Map($streetView, {
    center: brooklyn,
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: false,
  });
  //instantiates streetview settings
  const streetView =  new google.maps.StreetViewPanorama($streetView, {
    position: brooklyn,
    pov: {
      heading: 34,
      pitch: 10,
    },
  })
  //sets the map to streetview
  // map0.setStreetView(streetView);

  //MAP 2...............................................
  //instantiate map on the right
  const map1 = new google.maps.Map($mapBox1, {
    center: brooklyn,
    zoom: 12,
  });
  //adds a listener to the map for creating markers
  map1.addListener("click", function (e) {
    addMarker(e.latLng, map1);
  });
}



//adding each new marker to an array, and then each time a new 
//marker is made, deleteMarker() is called, emptying the array
//making it so you can only have 1 at a time
function addMarker(latLng, map) {
  marker = new google.maps.Marker({ 
    position: latLng, 
    map: map,
    draggable: true,
    title: 'drag me!',
   });
  deleteMarker();
  markers.push(marker);
  marker.setMap(map);
  console.log(markers)
}

function deleteMarker(marker){
  markers.forEach(function(marker){
    marker.setMap(null);
  })
  markers = [];
}

function getRandomLocation(){
  randomLocations = [];
  let randomLat = (Math.random() * (90-(-90) + 1) + (-90)).toFixed(6) * 1;
  let randomLong = (Math.random()* (180-(-180) + 1) + (-180)).toFixed(6) * 1;
  randomLocation = {lat: randomLat, lng: randomLong};
  randomLocations.push(randomLocation);

}

console.log(randomLocations)


