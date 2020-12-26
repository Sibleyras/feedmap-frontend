<template>
  <div>
    <form v-on:submit="addUser">
      <div class="form-group">
        <label for="usern">Username:</label>
        <input class="form-control" id="usern" type="text" name="username" placeholder="username" />
      </div>
      <div>
        <label for="pass">Password:</label>
        <input class="form-control" id="pass" type="password" name="password" placeholder="password" />
      </div>
      <div>
        <button type="submit" class="btn btn-primary m-2">Add</button>
      </div>
    </form>
    <p v-if="backendfeedback" class="alert">{{ backendfeedback }}</p>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'newuserform',
  data: () => ({
    backendfeedback: '',
  }),
  props: ['redirect'],
  methods: {
    async addUser(e) {
      e.preventDefault()
      let username = e.target.elements.usern.value
      let password = e.target.elements.pass.value
      let data = {
        username: username,
        password: password,
      }
      try {
        this.backendfeedback = (await this.$http.post('/user', data)).data
        if(this.redirect) router.push(this.redirect)
        else this.$emit('refresh')
      } catch (err) {
        console.log('Cannot Add User')
      }
    },
  },
}
</script>