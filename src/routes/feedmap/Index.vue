<template>
  <div>
    <div class="row no-gutters">
      <div :class="'mapcanvas ' + mapcanvasclass">
        <mymap/>
      </div>
      <div v-if="feedmode" class="col-6 col-sm-5 col-md-4 col-lg-3 vh-100 overflow-auto">
        <infofeed/>
      </div>
          <button class="switchbutton btn btn-secondary"
    v-on:click="feedmode = !feedmode"> mode </button>
    </div>
  </div>
</template>

<script>
import Infofeed from '@/components/infofeed.vue'
import Mymap from '@/components/mymap.vue';

export default {
  name: 'app',
  data: () => ({
    profile: true,
    feedmode: false,
  }),
  computed: {
    mapcanvasclass: function () {
      return this.feedmode ? 'col-6 col-sm-7 col-md-8 col-lg-9' : 'col-12'
    },
  },
  components: {
    Infofeed,
    Mymap,
  },
   mounted() {
    this.feedmode = true;
  },
}
</script>
<style scoped>
.switchbutton {
    position: absolute;
    right: 20px;
    bottom: 2px;
    z-index: 10000;
}
.mapcanvas{
    height: 100vh;
    overflow: hidden;
}

.mapcanvas>div {
    width: 100%;
    height: 100%;
}
</style>
