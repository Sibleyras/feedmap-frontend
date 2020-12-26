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
        'https://api.mapbox.com/styles/v1/kigal/cki0make32fpr19pgcy0fo507/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2lnYWwiLCJhIjoiY2tpMGxzY2FnMWV5OTJxdGg3cThhYTFnbyJ9.ipn6vmJzk6ykZ81Gk9WLzw',
      attribution:
        'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

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
</script>

<style scoped>
.mapContainer {
  width: 100%;
  height: 100%;
}
</style>
