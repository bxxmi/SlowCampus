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
    <div class="product-area">
      <div class="product-image">
        <img
          ref="image"
          :src="productImage"
          :alt="productTitle" />
      </div>
      <div class="product-about">
        <div class="product-top">
          <h1
            class="product-title"
            @click="isModalView = true">
            {{ productTitle }}
          </h1>
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
        <strong class="product-price">{{ productPrice }}</strong>
        <span class="product-time-paid">구매 일자: {{ productTimePaid }}</span>
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
        const price = this.orderedItemInfo.price
        
        if(price) {
          return price.toLocaleString() + ' 원'
        }else {
          return '0 원'
        }
      },
      productImage(){
        return this.orderedItemInfo.thumbnail
      },
      productTimePaid(){
        const timeTemp = this.item.timePaid.split('T')

        let date = timeTemp[0].split('-')
        let hms = timeTemp[1].split('.')[0].split(':')

        hms[0] = hms[0] > 12 ? `오후 ${hms[0] - 12}` : `오전 ${hms[0]}`

        return `${date[0]}년 ${date[1]}월 ${date[2]}일, ${hms[0]}시 ${hms[1]}분`
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
@import '~/scss/_variables.scss';

.product {
  border-radius: 15px;
  background-color: $color-bg;
  @include flex(flex-start);
  width: 80%;
  margin: 5%;
  position: relative;
  .product-area {
    width: 100%;
    padding: 20px;
    display: flex;
    position: relative;
    .product-image {
    margin-right: 40px;
    img {
      display: block;
      width:100px;
    }
  }
  }

  .product-about {
    .product-top {
      display: flex;
      align-items: center;
    }
    .product-title{
      font-weight: 700;
      cursor: pointer;
      margin-right: 5px;

      &:hover {
        text-decoration: underline;
      }
    }
    .product-price {
      display: block;
      font-size: 13px;
    }
    .product-time-paid {
      font-size: $font-size-m;
    .product-title{
      font-size: $font-size-lg;
    }
  }
 }
 .done{
    font-size: 10px;
    color: $color-success;
  }
  .cancel{
    font-size: 10px;
    color: $color-danger;
  }

  .btn-group{ 
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;

  .order-confirm{
    margin-bottom: 10px;
    cursor: pointer;
    @include order-btn($color-white, $color-primary);
        &:hover{
        @include order-btn($color-primary, $color-white);
        }
  }
  .order-cancle{
    cursor: pointer;
    @include order-btn($color-white, $color-primary);
        &:hover{
        @include order-btn($color-primary, $color-white);
        }
    }
  }
}
</style>
