<template>
  <div class="section-area">
    <section>
      <div class="thumbnail">
        <img
          ref="image"
          :src="productInfo.thumbnail"
          alt="thumbnail" />
      </div>
      <div class="info-area">
        <div class="product-info-list">
          <div class="product-tag">
            # {{ productInfo.tags }}
          </div>
          <div class="product-title">
            {{ productInfo.title }}
          </div>
          <div class="product-description">
            {{ productInfo.description }}
          </div>
        </div>
        <div class="btns-area">
          <RouterLink
            class="btn buy"
            to="/order"
            @click="[storeProductToBuyInfo(),loadAccountInfo()]">
            구매하기
          </RouterLink>
          <button
            class="btn cart"
            @click="addToCart">
            장바구니
          </button>
        </div>
      </div>
    </section>
  </div>
  
  <AddToCartModal
    :cart="cart"
    :incart="isInCart"
    @close="toggleModal" />
</template>

<script>
import store from '~/store/'
import authfunc from '~/store/authfunc.js'
import AddToCartModal from '~/components/products/AddToCartModal'

export default {
  components: {
    AddToCartModal
  },
  data() {
    return {
      cart: false,
      isInCart: false
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.product.productInfo
    }
  },
  created() {
    this.$store.dispatch('product/detailProduct', {
      id: this.$route.params.id
    })
  },
  mounted() {
    const thumbnail = this.productInfo.thumbnail
    if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
    }
  },
  methods: {
    addToCart() {
      if(!this.isInCart){
        this.$store.commit('product/addCart',{
        title: this.productInfo.title,
        image: this.productInfo.thumbnail, 
        id: this.productInfo.id, 
        price: this.productInfo.price
      })
      
      this.isInCart = true
      this.toggleModal()
      }else {
        alert('이미 추가한 상품입니다!')
      }
    },
    toggleModal(){
      this.cart = !this.cart
    },
    storeProductToBuyInfo() {
      this.$store.commit('product/resetProductToOrderInfo')
      this.$store.commit('product/setProductToOrderInfo',{
        title: this.productInfo.title,
        image: this.productInfo.thumbnail, 
        id: this.productInfo.id, 
        price: this.productInfo.price                               
      })
    },
    async loadAccountInfo() {
      this.$store.dispatch('account/checkBankListCanChoice',{
        username: store.state.auth.APIheaderObj.username,
        Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
      })
      this.$store.dispatch('account/checkAccountListandBalance',{
        username: store.state.auth.APIheaderObj.username,
        Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a { 
  text-decoration: none;
}

.section-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 67vh;
  box-sizing: border-box;
  section {
    display: flex;
    .thumbnail {
      img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        display: block;
        margin-right: 20px;
      }
    }
    .product-info-list {
      .product-tag {
        width: 50%;
        height: 25px;
        background-color: #eaeaea;
        color: #444444;
        font-weight: 700;
        line-height: 23px;
        text-align: center;
        border-radius: 50px;
        font-size: 12px;
        margin-bottom: 20px;
      }
      .product-title {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 30px;
        text-overflow: ellipsis;
      }
      .product-description {
        color: #444444;
        margin-bottom: 10px;
        text-overflow: ellipsis;
      }
    }
    .btns-area {
      display: flex;
      position: absolute;
      bottom: 0;
      .btn {
        border: none;
        cursor: pointer;
        width: 120px;
        height: 40px;
        background-color: #0d6efd;
        color: #fff;
        border-radius: 8px;
        font-size: 14px;
          &:hover {
          opacity: .5;
        }
        &.buy {
          text-align: center;
          line-height: 40px;
          margin-right: 30px;
        }
      }
    }
  }
  .info-area {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 400px;
  }
}
</style>
