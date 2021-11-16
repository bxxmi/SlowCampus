<template>
  <ul class="product-list">
    <ProductItem
      v-for="item in itemList"
      :key="item.detailId"
      :item="item" />
  </ul>
</template>

<script>
import ProductItem from '~/components/products/ProductItem.vue'

export default {
   components: {
    ProductItem
  },
  computed: {
    itemList() {
      return this.$store.state.product.allProduct
    }
  },
  mounted() {
    this.$store.dispatch('product/getAllProduct')
    window.addEventListener('scroll', this.onScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
