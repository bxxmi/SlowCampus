<template>
  <DetailOrderModal
    v-if="isModalView"
    @close-modal="isModalView = false">
    <ModalContent
      :item="orderedItemInfo"
      :time="productTimePaid"
      :cancel="isCanceled"
      :done="isDone" />
  </DetailOrderModal>
  <div class="product">
    <div class="product-image">
      <img
        ref="image"
        :src="productImage"
        :alt="productTitle" />
    </div>
    <div class="product-about">
      <h1
        class="product-title"
        @click="isModalView = true">
        {{ productTitle }}
      </h1>
      <strong class="product-price">{{ productPrice }}</strong>
      <span class="product-time-paid">{{ productTimePaid }}</span>
      <span class="product-id">{{ productId }}</span>
      <div
        v-if="isDone"
        class="done">
        주문확정
      </div>
      <div
        v-if="isCanceled"
        class="cancel">
        주문취소
      </div>
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
  </div>
</template>

<script>
import store from '~/store/'
import authfunc from '~/store/authfunc.js'
import DetailOrderModal from './DetailOrderModal.vue'
import ModalContent from './ModalContent.vue'

export default {
    components: {
      DetailOrderModal,
      ModalContent
    },
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        isModalView: false
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
    mounted() {
      const thumbnail = this.productImage
      if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
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
.product { 
  border:none;
  border-radius: 15px;
  background-color: $color-bg;
  @include flex(space-around);
  width: 80%;
  padding:20px;
  margin: 5%;
  .product-image {
    img{
      display: block;
      width:100px;}
  }
  .product-about {
    .product-title{

    }
    .product-price{

    }
    .product-time-paid{

    }
    .product-id {

    }
    .done{
      color: $color-success;
    }
    .cancel{
      color: $color-danger;
    }
  }
  .btn-group{ 
  display: flex;
  justify-content: center;
  flex-direction: column;

  .order-confirm{
    margin-bottom: 10px;
    @include order-btn($color-white, $color-primary);
        &:hover{
        @include order-btn($color-primary, $color-white);
        }
  }
  .order-cancle{
    @include order-btn($color-white, $color-primary);
        &:hover{
        @include order-btn($color-primary, $color-white);
        }
  }
}
}

</style>
