<template>
  <div class="product">
    <h1 class="product-title">
      {{ productTitle }}
    </h1>
    <div v-if="isDone">
      주문확정
    </div>
    <div v-if="isCanceled">
      주문취소
    </div>
    <div class="product-image">
      <img
        :src="productImage"
        :alt="productTitle" />
    </div>
    <strong class="product-price">{{ productPrice }}</strong>
    <span class="product-time-paid">{{ productTimePaid }}</span>
    <span class="product-id">{{ productId }}</span>
  </div>

  <div
    v-if="!(isDone||isCanceled)"
    class="btn-group">
    <button
      class="order-confirm"
      @click="cofirmOrder">
      주문 확정
    </button>
    <button
      class="order-cancle"
      @click="cancleOrder">
      주문 취소
    </button>
  </div>
</template>

<script>
import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      orderedItemInfo(){
        return this.item.product
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
        return this.item.timePaid
      },
      productId(){
        return this.orderedItemInfo.productId
      },
      detailId(){
        return this.item.detailId
      },
      isCanceled(){
        return this.item.isCanceled
      },
      isDone(){
        return this.item.done
      }
    },
    methods: {
      async cofirmOrder() {
        await this.$store.dispatch('product/confirmOrder',{
          username: store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
          detailId:this.detailId
        })
      },
      async cancleOrder() {
        await this.$store.dispatch('product/cancelOrder',{
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
