<template>
  <div>
    <OrderedItem
      v-for="orderedItem in orderedList"
      :key="orderedItem.detailId"
      ordered-item="orderedItem" />
  </div>
</template>

<script>
export default {
  computed: {
    orderList() {
      return this.$store.state.product.purchasedProductList
    }
  }
}
</script>
