<template>
  <div>
    <div
      v-for="info of infolist"
      :key="info.getId()"
      :id="'info' + info.getId()"
      v-bind:class="{ target: targetinfo === info }"
      v-on:click="setTarget(info)"
      v-on:dblclick="buildeditor()"
      class="row no-gutters border"
    >
      <displayinfo :info="info" />
    </div>
    <b-modal size="xl" hide-footer hide-header id="editoverlay" body-bg-variant="light">
      <div class="row justifify-content-around" style="align-items: flex-start;">
        <div class="col-11 col-sm-6" style="background-color: white;">
          <infoeditor :edit="true" :del="true" :info="targetinfo" />
        </div>
        <div class="d-none d-md-block col-md-1 col-lg-2" />
        <div class="d-none d-sm-block col-6 col-md-5 col-lg-4 border" style="background-color: white;">
          <displayinfo :info="targetinfo" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import displayinfo from '@/components/displayinfo.vue'
import Infoeditor from '@/components/infoeditor.vue'
import Displayinfo from './displayinfo.vue'
export default {
  name: 'infofeed',
  props: ['infolist'],
  data: () => ({
    showedit: false,
  }),
  computed: {
    targetinfo() {
      return this.$store.getters.targetinfo
    },
  },
  methods: {
    setTarget(info) {
      this.$store.commit('setTarget', info)
    },
    buildeditor() {
      if (this.$store.getters.editmode) this.$bvModal.show('editoverlay')
    },
  },
  watch: {
    targetinfo(setTarget, oldtarget) {
      document.getElementById('info' + setTarget.getId()).scrollIntoView()
    },
  },
  components: {
    displayinfo,
    Infoeditor,
  },
}
</script>

<style scoped>
.target {
  background-color: lightcyan;
}
</style>
