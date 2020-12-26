<template>
  <div>
    <tbody>
      <tr>
        <th v-for="k in keys" :key="k" class="border p-1">{{ k }}</th>
      </tr>
      <tr v-for="u in userlist" :key="JSON.stringify(u)" class="border">
        <td class="border-right pl-1">{{ u['id'] }}</td>
        <td class="border-right pl-1">
          <button type="button" v-b-modal.delmodal v-on:click="usertodelete = u" class="btn m-2 btn-danger">
            X
          </button>
        </td>
        <td class="border-right pl-1">{{ u['username'] }}</td>
        <td class="border-right pl-1">
          <button
            type="button"
            v-on:click="editorSwicth(u)"
            :class="'btn m-2 btn-' + (u['editor'] ? 'primary' : 'secondary')"
          >
            {{ u['editor'] ? 'Y' : 'N' }}
          </button>
        </td>
        <td class="border-right pl-1">{{ u['superadmin'] ? 'Y' : 'N' }}</td>
        <td class="border-right pl-1">{{ printableTime(new Date(u['last_login'])) }}</td>
      </tr>
    </tbody>
    <b-modal hide-footer hide-header ref="delmodal" id="delmodal">
      <p>
        Are you sure you want to delete user <b>{{ usertodelete ? usertodelete.username : '' }}</b
        >?
      </p>
      <div class="row">
        <button type="button" v-on:click="deleteUser(usertodelete)" class="btn m-2 btn-danger">
          Yes
        </button>
        <button type="button" v-on:click="toggleModal" class="btn m-2 btn-secondary">
          No
        </button>
      </div>
    </b-modal>
    <p v-if="backendfeedback" class="alert">{{ backendfeedback }}</p>
  </div>
</template>

<script>
export default {
  name: 'listofusers',
  props: ['userlist'],
  data: () => ({
    // eslint-disable-next-line
    keys: ['id', 'delete', 'username', 'editor', 'superadmin', 'last_login'],
    backendfeedback: null,
    usertodelete: null,
  }),
  methods: {
    printableTime(d) {
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
    },
    async editorSwicth(u) {
      let msg
      try {
        msg = await this.$http({
          url: '/user/editor/' + u.id,
          method: 'PUT',
        })
      } catch (err) {
        console.log(err)
      }
      this.$emit('refresh')
      this.backendfeedback = msg.data
    },
    async deleteUser(u) {
      let msg
      try {
        msg = await this.$http({
          url: '/user/' + u.id,
          method: 'DELETE',
        })
      } catch (err) {
        console.log(err)
      }
      this.$emit('refresh')
      this.toggleModal()
      this.backendfeedback = msg.data
    },
    toggleModal() {
      this.$refs.delmodal.hide()
    },
  },
  components: {},
}
</script>
