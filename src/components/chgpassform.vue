<template>
  <div>
    <form v-on:submit="chgpassword">
      <div class="form-group">
        <label for="usern">Username:</label>
        <input class="form-control" id="usern" type="text" name="username" placeholder="username" />
      </div>
      <div>
        <label for="pass">Password:</label>
        <input class="form-control" id="pass" type="password" name="password" placeholder="password" />
      </div>
      <div>
        <label for="pass">New Password:</label>
        <input class="form-control" id="newpass" type="password" name="newpass" placeholder="new password" />
      </div>
      <div>
        <label for="pass">Again New Password:</label>
        <input class="form-control" id="newpass2" type="password" name="newpass2" placeholder="new password" />
      </div>
      <div class="p-2">
        <button type="submit" class="btn btn-primary">Change</button>
      </div>
    </form>
    <p v-if="backendfeedback" class="alert">{{ backendfeedback }}</p>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'chgpassword',
  data: () => ({
    backendfeedback: '',
  }),
  props: ['redirect'],
  methods: {
    async chgpassword(e) {
      e.preventDefault()
      let data = {
        username: e.target.elements.usern.value,
        password: e.target.elements.pass.value,
        newpass: e.target.elements.newpass.value,
        newpass2: e.target.elements.newpass2.value,
      }
      let msg
      try {
        msg = await this.$http({
          url: '/login/chgpwd',
          method: 'PUT',
          data: data,
        })
        if (msg.data === 'success'){
            this.logout()
            router.push(this.redirect)
        }
      } catch (err) {
        console.log(err)
      }
      this.backendfeedback = msg.data
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
