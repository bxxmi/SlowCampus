<template>
  <MyPageNav /> 
  <div>
    <OrderedItem
      v-for="item in orderedList"
      :key="item.detailId"
      :item="item" />
  </div>
</template>

<script>
import OrderedItem from '~/components/myPage/OrderedItem'
import MyPageNav from '~/components/myPage/MyPageNav'
import authfunc from '../../store/authfunc'

export default {
  components: {
    OrderedItem,
    MyPageNav
  },
  computed: {
    orderedList() {
      return this.$store.state.product.purchasedProductList
    }
  },
  created() {
    this.loadallBuyInfo()
  },
  methods: {
    async loadallBuyInfo() {
      await this.$store.dispatch('product/allBuyInfo',{
          username: this.$store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
    }
  }
}
</script>
