<template>
  <login-form
    redirect="/home"
    :locale-selectable="true"
    :show-logo="true"
    logo="vue-crud-lg.png"
  ></login-form>
</template>

<script>

import LoginForm from '@/components/HelloWorld.vue'

export default {
  components: {
    LoginForm,
  },
}

</script>
