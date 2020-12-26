<template>
  <div v-on:keyup.enter="$store.commit('switchEditMode')">
    <div class="row no-gutters">
      <div :class="'mapcanvas ' + mapcanvasclass">
        <mymap ref="mymap" :mapdim="mapcanvasclass" :feedmode="feedmode" :infolist="infolist" />
      </div>
      <div v-if="feedmode" class="infofeed col-6 col-sm-5 col-md-4 col-lg-3 vh-100 overflow-auto">
        <infofeed :infolist="infolist" />
      </div>
      <button class="switchbutton btn btn-secondary" v-on:click="feedmode = !feedmode">mode</button>
      <div v-if="$store.getters.editmode" class="authdisclaimer">
        <router-link style="color: inherit;" to="/login" v-if="$store.getters.editmode">{{ $store.getters.StateUser.username }}</router-link>
        <br>
        <router-link style="color: inherit;" to="/admin" v-if="$store.getters.superadmin">AdminPanel</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Infofeed from '@/components/infofeed.vue'
import Mymap from '@/components/mymap.vue'
import Info from '@/class/Info.js'

export default {
  name: 'app',
  data: () => ({
    profile: true,
    feedmode: false,
    infolist: [],
  }),
  computed: {
    mapcanvasclass: function() {
      return this.feedmode ? 'col-6 col-sm-7 col-md-8 col-lg-9' : 'col-12'
    },
    retrieveTime: function() {
      return this.$store.getters.retrieveTime
    },
  },
  methods: {
    refresh() {
      this.infolist = this.$store.getters.infolist
    },
  },
  watch: {
    retrieveTime(newval, oldval) {
      this.refresh()
    },
  },
  components: {
    Infofeed,
    Mymap,
  },
  mounted() {
    this.feedmode = true
    this.$store.dispatch('retrieveInfos')
    this.$store.dispatch('retrieveUser')
  },
}
</script>

<style scoped>
.mapcanvas {
  height: 100vh;
  overflow: hidden;
}

.mapcanvas > div {
  width: 100%;
  height: 100%;
}
.infofeed {
  scroll-behavior: smooth;
}
.switchbutton {
  position: absolute;
  right: 20px;
  bottom: 2px;
  z-index: 10000;
}
.authdisclaimer {
  position: absolute;
  left: 20px;
  top: 2px;
  z-index: 10000;
  color: white;
  background-color: darkred;
}
</style>
