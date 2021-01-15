<template>
  <div>
    <form v-on:submit="login">
      <div class="form-group">
        <label for="usern">Username:</label>
        <input class="form-control" id="usern" type="text" name="username" placeholder="username" />
      </div>
      <div>
        <label for="pass">Password:</label>
        <input class="form-control" id="pass" type="password" name="password" placeholder="password" />
      </div>
      <div>
        <button type="submit" class="btn btn-primary m-2">Login</button>
        <button type="button" v-on:click="logout()" class="btn btn-danger m-2">Logout</button>
      </div>
    </form>
    <p v-if="alert" class="alert">{{ alert }}</p>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Login',
  data: () => ({
    alert: '',
  }),
  props: ['redirect'],
  methods: {
    async login(e) {
      e.preventDefault()
      let username = e.target.elements.usern.value
      let password = e.target.elements.pass.value
      let data = {
        username: username,
        password: password,
      }
      try {
        this.alert = await this.$store.dispatch('LogIn', data)
        if (!this.alert) router.push(this.redirect)
      } catch (err) {
        console.log('Cannot log in')
      }
    },
    async logout() {
      try {
        this.alert = await this.$store.dispatch('LogOut')
      } catch (err) {
        console.log('Cannot log out ' + err)
      }
    },
  },
}
</script>
