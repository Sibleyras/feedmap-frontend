<template>
  <div class="row justify-content-center pt-3">
    <div class="col-6 col-sm-5 col-md-4 col-lg-3 border">
      <router-link to="/"><h2>FEED MAP</h2></router-link>
      <h2 v-if="$store.getters.isAuthenticated">Bienvenue {{ $store.getters.StateUser.username }}</h2>
      <h2 v-else>Bonjour</h2>
      <login-form redirect="/" />
      <router-link to="/login/chgpass"><p>change your password</p></router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/loginform.vue'

export default {
  components: {
    LoginForm,
  },
}
</script>
