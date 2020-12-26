<template>
  <div class="row no-gutters overflow-hidden">
    <div class="row no-gutters justify-content-between flex-grow-1">
      <div class="p-1 col-auto">
        <img class="infoicon" :src="info.getMarkerURL()" />
      </div>
      <div class="infodate p-1 col">
        <p>{{ info.printTimediff() }}</p>
      </div>
    </div>
    <div class="col-12 p-1 infodesc">
      {{ info.getDescription() }}
    </div>
    <div v-if="info.hasImage()" class="col-12">
      <img class="img-fluid imginfo" :src="info.getImageURL()" />
    </div>
    <div class="col-12 infosrc">
        <a :href="info.getSourceURL()">{{ info.getSourceURL() }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'displayinfo',
  props: ['info'],
  data: () => ({}),
  computed: {},
  components: {},
}
</script>

<style scoped>
.imginfo {
  max-height: 75vh;
}
.infodate {
  color: maroon;
  text-align: right;
  font-size: medium;
}
.infodesc {
  text-align: justify;
  font-size: large;
}
.infosrc {
  text-align: left;
  font-size: x-small;
  word-wrap: break-word;
}
a {
  color: grey;
}
</style>
