<template>
  <ul class="sales-list">
    <SoldItem 
      v-for="item in soldList"
      :key="item.detailId" 
      :item="item" />
  </ul>
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
    console.log(this.soldList)
  }  
}
</script>
