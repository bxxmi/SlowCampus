<template>
  <!-- <div>{{ itemList }}</div> -->
  <ul>
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
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  text-align: center;
}
</style>
