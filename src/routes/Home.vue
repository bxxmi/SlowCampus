<template>
  <h1>Home page..</h1>
  <h2>{{ getAccesstoken }}</h2>
  <button v-on:click="setAccesstoken()">test</button>
</template>

<script>

export default {
  computed: {
    getAccesstoken() {
      return this.$store.state.token.data
    }
  },
  methods: {
    setAccesstoken(){
      this.$store.commit('token/set','test2')
    }
  }
}

</script>
