const $mapBox1 = $("#map1")[0];
const $mapBox2 = $("#map2")[0];
const googleUrl =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrL26kHgHcE6O9YC-F7mbxCXhwscpSsdA&callback=initMap";

//ajax requests access to url, had to specify the data type
//for some reason, then if it succeeds (.then), initMap is called

$.ajax({ url: googleUrl, dataType: "jsonp" }).then(function () {
  //console.log("working??");
  initMaps();
});

//parameters for map are coordinates in form of object and zoom
//I'd like to mess around with these outside of objects to see
//what breaks so I can simplify things down the road
function initMaps() {
  const brooklyn = { lat: 40.650002, lng: -73.949997 };
  const coordinates = {
    center: brooklyn,
    zoom: 12,
  };
  //finally creates new map object with the render location
  //and then the two parameters mentioned above together
  //in a single object.
  const map1 = new google.maps.Map($mapBox1, coordinates);
  const map2 = new google.maps.Map($mapBox2, coordinates);
}
