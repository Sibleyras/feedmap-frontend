<template>
  <div v-if="$store.getters.isAuthenticated">
    <router-link to="/"><h2>FEED MAP</h2></router-link>
    <h3>SuperAdmin Panel : {{ $store.getters.StateUser.username }}</h3>
    <h4>List of registered users:</h4>
    <listofusers v-on:refresh="refresh()" :userlist="userlist" />
    <h4>Add a new user:</h4>
    <div class="col-6 col-sm-5 col-md-4 col-lg-3 border">
      <newuserform v-on:refresh="refresh()" redirect="" />
    </div>
  </div>
</template>

<script>
import Listofusers from '../../components/listofusers.vue'
import Newuserform from '../../components/newuserform.vue'
export default {
  name: 'adminpanel',
  data: () => ({
    userlist: {},
  }),
  methods: {
    async refresh() {
      try {
        let res = await this.$http.get('/users')
        this.userlist = res.data.userlist
      } catch (err) {
        console.log(err)
        //this.$store.dispatch('retrieveUser')
      }
    },
  },
  mounted() {
    this.refresh()
  },
  components: { Listofusers, Newuserform },
}
</script>
