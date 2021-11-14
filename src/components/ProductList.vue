<template>
  <ul>
    <ProductItem
      v-for="item in $store.state.product.allProduct"
      :key="item.detailId"
      :item="item" />
  </ul>
</template>

<script>
import ProductItem from '~/components/ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  computed: {
    itemList() {
      return this.$store.dispatch('product/getAllProduct')
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  text-align: center;
}
</style>
