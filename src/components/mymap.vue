<template>
  <l-map
    ref="mymap"
    class="mapContainer"
    :zoom="zoom"
    :center="center"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
    v-on:click="showFormPopup"
  >
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-tile-layer v-if="url2" :url="url2" :attribution="attribution2" />
    <l-tile-layer v-if="url3" :url="url3" :attribution="attribution3" />
    <l-tile-layer v-if="url4" :url="url4" :attribution="attribution4" />

    <div v-for="info of infolist" :key="info.getId() + feedmode">
      <l-marker
        :lat-lng="info.getLocation()"
        :icon="
          new myMarkerIcon({
            iconUrl: info.getMarkerURL(),
          })
        "
        v-on:click="setTarget(info)"
      >
        <l-popup v-if="!feedmode" :options="infopopup">
          <displayinfo :info="info" />
        </l-popup>
      </l-marker>
    </div>
    <l-marker
      ref="formMarker"
      v-if="showForm && $store.getters.editmode"
      v-on:ready="$refs.formMarker.mapObject.openPopup()"
      :lat-lng="newinfo.getLocation()"
      :icon="
        new myMarkerIcon({
          iconUrl: newinfo.getMarkerURL(),
        })
      "
    >
      <l-popup v-on:remove="hideFormPopup" :options="infopopup">
        <infoeditor :create="true" :info="newinfo" />
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import Vue from 'vue'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import displayinfo from '@/components/displayinfo.vue'
import infoeditor from '@/components/infoeditor.vue'
import 'leaflet/dist/leaflet.css'
import Info from '@/class/Info'

export default {
  name: 'Map',
  // feedmode:  boolean control whether we print the feed or not.
  // infolist:  the list of information to be printed on the map.
  // mapdim:    the value we must watch before triggering a resize of the map.
  // eslint-disable-next-line
  props: ['feedmode', 'infolist', 'mapdim'],
  data() {
    return {
      zoom: 11,
      center: L.latLng(35.704983, 139.560356),
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      url2: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png',
      attribution2:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url3: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
      attribution3:'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      url4:'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png',
      attribution4:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

      // set the style of icons.
      myMarkerIcon: L.Icon.extend({
        /* eslint-disable */
        options: {
          iconSize: [70, 70], // size of the icon
          shadowSize: [50, 50], // size of the shadow
          iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
          shadowAnchor: [10, -35], // the same for the shadow
          popupAnchor: [15, -30], // point from which the popup should open relative to the iconAnchor
        },
        /* eslint-enable */
      }),

      newinfo: new Info(
        { id: 0, marker: Object.keys(this.$store.getters.markersURL)[0], latitude: 0, longitude: 0 },
        this.$store.getters.markersURL,
      ),
      showForm: false,
    }
  },
  computed: {
    // Our popup style
    infopopup() {
      return {
        minWidth: window.innerWidth / 3,
        maxWidth: window.innerWidth / 2,
        maxHeight: (window.innerHeight * 5) / 6,
      }
    },
    targetinfo() {
      return this.$store.getters.targetinfo
    },
  },
  methods: {
    setTarget(info) {
      this.$store.commit('setTarget', info)
    },
    zoomUpdate(zoom) {
      this.zoom = zoom
    },
    centerUpdate(center) {
      this.center = center
    },
    showFormPopup(e) {
      this.newinfo.setLatLng(e.latlng)
      this.showForm = true
    },
    hideFormPopup(e) {
      this.showForm = false
    },
  },
  watch: {
    // Put the targetted information in the center.
    targetinfo(setTarget, oldtarget) {
      if (this.feedmode) this.center = setTarget.getLocation()
    },
    // Force the resizing of the map after a dimension change.
    mapdim(newval, oldval) {
      this.$refs.mymap.mapObject.invalidateSize()
    },
  },
  mounted() {},
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    displayinfo,
    infoeditor,
  },
}
/*
SEE: https://leaflet-extras.github.io/leaflet-providers/preview/

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var CartoDB_PositronOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var CartoDB_VoyagerOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var Stamen_TonerLines = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var Stamen_TonerHybrid = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

*/

/* My MapBox
      url:
        'https://api.mapbox.com/styles/v1/kigal/cki0make32fpr19pgcy0fo507/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2lnYWwiLCJhIjoiY2tpMGxzY2FnMWV5OTJxdGg3cThhYTFnbyJ9.ipn6vmJzk6ykZ81Gk9WLzw',
      attribution:
        'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
*/
</script>

<style scoped>
.mapContainer {
  width: 100%;
  height: 100%;
}
</style>