<template>
  <div class="row justify-content-start h-100" style="align-content: center;">
    <div v-for="(url, marker) in markersURL" :key="marker + info.getMarker()">
      <div class="col selectbox" v-on:click="setAndQuit(marker,url)">
          <img class="infoicon m-2" :src="url" />
          <p>{{ marker }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'markerpicker',
  props: ['info', 'done'],
  data: () => ({}),
  computed: {
    markersURL() {
      return this.$store.getters.markersURL
    },
  },
  components: {},
  methods: {
      setAndQuit (marker,url) {
          this.info.setMarker(marker,url)
          this.done()
      },
  },
}
</script>

<style scoped></style>
