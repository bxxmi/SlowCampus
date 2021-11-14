<template>
  <h1>등록된 모든 제품 리스트</h1>
  <ul>
    <ProductItem
      v-for="item in $store.state.product.allProduct"
      :key="item.detailId"
      :item="item" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue'

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
