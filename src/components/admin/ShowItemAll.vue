<template>
  <div class="top">
    <AdminNav /> 
    <div class="bottom">
      <div class="all-item-area">
        <ShowItem 
          v-for="item in itemList"
          :key="item.detailId" 
          :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ShowItem from '~/components/admin/ShowItem.vue'
import AdminNav from '~/components/admin/AdminNav'

export default {
  components: {
    ShowItem,
    AdminNav
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
