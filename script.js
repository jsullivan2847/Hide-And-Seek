//VARIABLES................................................
//storing answers and locations
let markers = [];
let answer = [];
let randomLocations = [];
//JQuery DOM element references
const $deleteButton = $("#deleteBtn");
const $newLocationButton = $("#newLocation");
const $mapView = $("#mapView");
const $mapBox1 = $("#map1")[0];
const $streetView = $("#streetView")[0];
const googleUrl =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrL26kHgHcE6O9YC-F7mbxCXhwscpSsdA&callback=initMap";

  //API CALL.................................................
$.ajax({ url: googleUrl, dataType: "jsonp" }).then(function () {
  initMaps(brooklyn);
});

//BUTTONS..................................................
//Delete Marker
$deleteButton.on("click", function () {
  deleteMarker(marker);
});
//New Location
$newLocationButton.on("click", function () {
  getRandomLocation();
  const map0 = new google.maps.Map($streetView, {
    center: randomLocation,
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: false,
  });
  const streetView = new google.maps.StreetViewPanorama($streetView, {
    position: randomLocation,
    pov: {
      heading: 34,
      pitch: 10,
    },
  });
  map0.getStreetView(streetView);
  addMarker(randomLocation, map0);
  console.log(randomLocation);
});

//Testing Locations
//longitude and latitude range from
//-90 to 90 Lat
//-180 to 180 long
const brooklyn = { lat: 40.650002, lng: -73.949997 };
const gr = { lat: 42.963795, lng: -85.670006 };
const timesSquare = { lat: 40.758, lng: -73.9855 };

function getRandomLocation() {
  //Right now it's set up to only give you locations in
  //Brooklyn Queens and Manhattan
  randomLocations = [];
  let randomLat = (Math.random() * (40.75 - 40.59) + 40.59).toFixed(6) * 1;
  let randomLong = (Math.random() * (-74 - -73.89) + -73.89).toFixed(6) * 1;
  randomLocation = { lat: randomLat, lng: randomLong };
  randomLocations.push(randomLocation);
}

//parameters for map are coordinates (in the form of an object)
function initMaps(location) {
  //MAP 1......STREET VIEW................................
  getRandomLocation();

  //map instantiation passing in DOM location and the actual *location*
  const map0 = new google.maps.Map($streetView, {
    center: randomLocation,
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: false,
  });
  addMarker(randomLocation, map0, "secret location", answer, false);
  //for some reason I can't get the variables out of this array item
  answerLocation = answer[0];
  theAnswer = answerLocation.position
  console.log("what im looking for", theAnswer)
  console.log("secret location is ", answerLocation.toString());
  //console.log('marker',map0.center)

  //instantiates streetview settings
  const streetView = new google.maps.StreetViewPanorama($streetView, {
    position: randomLocation,
    pov: {
      heading: 34,
      pitch: 10,
    },
  });
  // sets the map to streetview
  map0.getStreetView(streetView);

  //Change Map View
  $mapView.change(function () {
    if (this.checked) {
      streetView.setVisible(false);
      //console.log(streetView.setVisible())
    } else if (!this.checked) {
      streetView.setVisible(true);
    }
  });

  //MAP 2...............................................
  //instantiate map on the right
  const map1 = new google.maps.Map($mapBox1, {
    center: map0.center,
    zoom: 12,
  });
  //adds a listener to the map for creating markers
  map1.addListener("click", function (e) {
    deleteMarker();
    addMarker(e.latLng, map1, "Your Answer", markers, true);
    console.log("answers array is at ", answer.length);
    console.log("markers array is at ", markers.length);
    let yourAnswer = markers[0].position.toString();
    console.log("answer location: ", answerLocation.toString() )
    console.log("your answer is ", parseInt(yourAnswer));
  });
}

//adding each new marker to an array, and then each time a new
//marker is made, deleteMarker() is called, emptying the array
//making it so you can only have 1 at a time
function addMarker(latLng, map, title, array, draggableChoice) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: draggableChoice,
    title: `${title}`,
  });
  array.push(marker);
  marker.setMap(map);
}

function deleteMarker() {
  markers.forEach(function(marker){
    marker.setMap(null)
  });
  markers = [];
}
