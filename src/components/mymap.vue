<template>
  <div id="mapContainer">
  </div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
export default {
 name: "Map",
 data() {
   return{
     // eslint-disable-next-line
     center: [35.704983, 139.560356],
   }
},
 methods: {
   setupLeafletMap: function () {
     const mapDiv = L.map("mapContainer").setView(this.center, 13);
     L.tileLayer(
       "https://api.mapbox.com/styles/v1/kigal/cki0make32fpr19pgcy0fo507/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: "mapbox/streets-v11",
         accessToken:"pk.eyJ1Ijoia2lnYWwiLCJhIjoiY2tpMGxzY2FnMWV5OTJxdGg3cThhYTFnbyJ9.ipn6vmJzk6ykZ81Gk9WLzw",
       },
     ).addTo(mapDiv);
   },
 },
 mounted() {
   this.setupLeafletMap();
 },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
