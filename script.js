const $mapBox = $("#map")[0];
const googleUrl =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrL26kHgHcE6O9YC-F7mbxCXhwscpSsdA&callback=initMap";

$.ajax({url: googleUrl, dataType: 'jsonp'}).then(function () {
  //console.log("working??");
  initMap();
});

function initMap() {
  const brooklyn = { lat: 40.650002, lng: -73.949997 };
  const coordinates = {
    center: brooklyn,
    zoom: 12,
  };
  //const mapBox = $("div");
  const map = new google.maps.Map($mapBox,coordinates);
}
