<template>
  <h1>제품상세정보</h1>
</template>

<script>
export default {
  created() {
    console.log(this.$route)
    this.$store.dispatch('product/detailProduct', {
      id: this.$route.params.id
    })
  }
}
</script>
