<template>
  <div class="top">
    <MyPageNav /> 
    <div class="bottom">
      <OrderedItem
        v-for="item in orderedList"
        :key="item.detailId"
        :item="item" />
    </div>
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

<style lang="scss">
  .top{
    display:flex;
    border: 1px solid $color-secondary;
    border-radius: 15px;
    box-shadow: 0 1px 5px rgba(0 0 0 / 50%);
    width: 90%;
    padding: 5% 0;
    margin: 50px auto;
    .bottom{
      width: 80%;
    }
  }
  
</style>
