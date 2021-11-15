<template>
  <div class="product">
    <h1 class="product-title">
      {{ productTitle }}
    </h1>
    <div class="product-image">
      <img
        :src="productImage"
        :alt="productTitle" />
    </div>
    <strong class="product-price">{{ productPrice }}</strong>
    <span class="product-time-paid">{{ productTimePaid }}</span>
    <span class="product-id">{{ productId }}</span>
  </div>

  <button
    class="order-confirm"
    @click="confirmOrder">
    주문 확정
  </button>
  <button
    class="order-cancle"
    @click="cancleOrder">
    주문 취소
  </button>
</template>

<script>
import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
    props: {
      orderedItem: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      orderedItemInfo(){
        return this.orderedItem.product
      },
      productTitle(){
        return this.orderedItemInfo.title
      },
      productPrice(){
        return this.orderedItemInfo.price
      },
      productImage(){
        return this.orderedItemInfo.thumbnail
      },
      productTimePaid(){
        return this.orderedItem.timePaid
      },
      productId(){
        return this.orderedItemInfo.productId
      },
      detailId(){
        return this.orderedItem.detailId
      },
      //done하고 isCancle이 뭐지?
    },
    methods: {
      cofirmOrder() {
        this.$store.dispatch('product/confirmOrder',{
          username: store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
          detailId:this.detailId
        })
      },
      cancleOrder() {
        this.$store.dispatch('product/cancelOrder',{
          username: store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
          detailId:this.detailId
        })
      }
    }
}
</script>

<style lang="scss" scoped>
img {
  display: block;
}
</style>
