<template>
  <SoldItem 
    v-for="item in soldList"
    :key="item.detailId" 
    :item="item" />
</template>

<script>
import SoldItem from '~/components/admin/SoldItem'

export default {
  components: {
    SoldItem
  },
  computed: {
    soldList() {
      return this.$store.state.product.soldProduct
    }
  },
  mounted() {
    this.$store.dispatch('product/soldProductList')
  }  
}
</script>
