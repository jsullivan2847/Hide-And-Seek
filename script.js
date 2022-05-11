//VARIABLES................................................
const flag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
//storing answers and locations
let markers = [];
let answer = [];
let randomLocations = [];
const allScores = []
//JQuery DOM element references
const $score = $('#score');
const $tryAgainButton = $('<button id="newLocation"></button>').text('Try Again?')
const $resultsDiv = $('#results')
const $results = $("#latlng");
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
  deleteMarker();
});
createButton();

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
    center: randomLocations[0],
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: false,
  });
  addMarker(randomLocations[0], map0, "secret location", answer, false);
  //for some reason I can't get the variables out of this array item
  //as of right now I'm needing to store them in a new one in order to get
  //the coordinates to print out the way I want them to 
  answerLocation = answer[0];
  theAnswer = answerLocation.getPosition().toString();
  //console.log(theAnswer)

  //instantiates streetview settings
  const streetView = new google.maps.StreetViewPanorama($streetView, {
    position: randomLocations[0],
    pov: {
      heading: 34,
      pitch: 10,
    },
  });
  // sets the map to streetview
  map0.getStreetView(streetView);

  //Change Map View BUTTON
  // $mapView.change(function () {
  //   if (this.checked) {
  //     streetView.setVisible(false);
  //   } else if (!this.checked) {
  //     streetView.setVisible(true);
  //   }
  // });

  //MAP 2...............................................
  //instantiate map on the right
  const map1 = new google.maps.Map($mapBox1, {
    center: map0.center,
    zoom: 12,
  });
  //adds a listener to the map for user creating markers
  map1.addListener("click", function (e) {
    //deletes marker every time you make a new one - only 1 answer
    deleteMarker();
    //adds your marker
    let answerReveal = addMarker(e.latLng, map1, "Your Answer", markers, true);
    //adds marker identical to streetview location to your map
    let yourMarker = addMarker(randomLocations[0], map1, "secret location", answer, false, flag);
    //turns your marker into an object literal containing your latlng 
    //coordinates and turns those to a string to display them 
    //(I don't know why its the only way)
    const userChoice = markers[0].getPosition().toString();
    convertStrings(userChoice);
    //console.log(points);
    //displays results * 69.2 the amount of miles between latitude coordinates
    displayResults(points * 69.2);
  });
}

//adding each new marker to an array, and then each time a new
//marker is made, deleteMarker() is called, emptying the array
//making it so you can only have 1 at a time
function addMarker(latLng, map, title, array, draggableChoice, icon) {
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: draggableChoice,
    title: `${title}`,
    icon: icon
  });
  if (marker != undefined) {
    array.push(marker);
    marker.setMap(map);
  }
}

function deleteMarker() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers = [];
}

//turns your latlng coordinates in string form to number.
//combines them, and then returns the difference. If the amount is negative,
//it turns it positive
const convertStrings = function (userChoice) {
  const comma = ",";
  const userLatLng = userChoice.split(comma);
  const answerLatLng = theAnswer.split(comma);
  const userNums = userLatLng.map(function (string) {
    return Number(string.replace("(", "").replace(")", ""));
  });

  const answerNums = answerLatLng.map(function (string) {
    return Number(string.replace("(", "").replace(")", ""));
  });

  const userFinal = userNums.reduce(function (lat, lng) {
    return lat + lng;
  });

  const answerFinal = answerNums.reduce(function (lat, lng) {
    return lat + lng;
  });

  let total = answerFinal - userFinal;
  if (total < 0) {
    total = total * -1;
  }
  return (points = total.toFixed(6) * 1);
};

function displayResults(distance) {
  $results.text(
    `Your guess was ${distance.toFixed(4)} miles away from the answer`
  );
  let finalScore = 0;
  allScores.unshift(distance);
  allScores.forEach(function(score){
    finalScore += score;
  })
  //console.log(finalScore);
  $score.text(`${finalScore.toFixed(4)}`)
  createButton();
  
}
function createButton(){
//New Location
$resultsDiv.append($tryAgainButton);
$tryAgainButton.on("click", function () {
  // let answer = [];
  // getRandomLocation();
  // const map0 = new google.maps.Map($streetView, {
  //   center: randomLocations[0],
  //   zoom: 12,
  //   disableDefaultUI: true,
  //   zoomControl: false,
  // });
  // const streetView = new google.maps.StreetViewPanorama($streetView, {
  //   position: randomLocations[0],
  //   pov: {
  //     heading: 34,
  //     pitch: 10,
  //   },
  // });
  // map0.getStreetView(streetView);
  // addMarker(randomLocations[0], map1, "secret location", answer, false, flag);
  // answerLocation = answer[0];
  // theAnswer = answerLocation.getPosition().toString();
  // console.log(theAnswer)
  // deleteMarker();
  initMaps();
});

}

