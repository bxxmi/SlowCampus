<template>
  <div>
    <OrderedItem
      v-for="item in orderedList"
      :key="item.detailId"
      :item="item" />
  </div>
</template>

<script>
import OrderedItem from '~/components/myPage/OrderedItem'

export default {
  components: {
    OrderedItem
  },
  computed: {
    orderedList() {
      return this.$store.state.product.purchasedProductList
    }
  }
}
</script>
