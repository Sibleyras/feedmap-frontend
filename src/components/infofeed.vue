<template>
  <div>
    <div class="row no-gutters border" v-for="info of infolist" :key="info.id">
      <div class="p-1 mr-auto">
        <img class="infoicon" :src="$iconsURL + info.marker + '.png'" />
      </div>
      <div class="infodate p-1">
        <p> Il y a 2 jours</p>
      </div>
      <div class="col-12 p-1">
        {{ info.description }}
      </div>
      <div class="col-12">
        <img class="img-fluid imginfo" :src="info.image" />
      </div>
      <div class="infosrc row no-gutters overflow-hidden">
        <a :href="info.source">{{info.source}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infofeed',
  data: () => ({
    profile: true,
    lastndays: 14,
    infolist: [],
  }),
  computed: {},
  components: {},
  methods: {
    /* eslint-disable no-console */
    async retrieveInfos(days) {
      try {
        let response = await this.$http.get('/infos/days/' + days) //.then((response) => {
        this.infolist = response.data
        //})
        //for (r of response) {
        //  this.infolist.push(r)
        //}
        // this.infolist = await Vue.http.get('/infos/' + days).data
      } catch (err) {
        alert(err)
        console.log(err)
      }
    },
    async refreshList() {
      await this.retrieveInfos(this.lastndays)
    },
    /* eslint-enable no-console */
  },
  async mounted() {
    await this.refreshList()
  },
}
</script>

<style scoped>
.imginfo{
  max-height: 75vh;
}
</style>
