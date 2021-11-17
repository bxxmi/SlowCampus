<template>
  <div class="cart-area">
    <div class="cart-title">
      <i class="fas fa-shopping-cart"></i>
      장바구니
    </div>
    <button
      type="button"
      @click="resetCart">
      전체 삭제
    </button>
    <div class="cart-subject">
      <div class="title">
        강의명
      </div>
      <div class="title">
        가격
      </div>
      <div class="title">
        삭제
      </div>
    </div>
    <div
      v-if="totalPrice!=='0'"
      class="payment">
      <CartItem
        v-for="item in cart"
        :key="item"
        :item="item" />
      <div class="buy-area">
        <div class="account-selector">
          <div class="total-price">
            <span>총 상품 금액 : </span>
            <strong>{{ totalPrice }}원</strong>
          </div>
          <div class="select-account">
            <select
              id="accountSelect"
              v-model="myAccountId"
              name="myAccount">
              <option value="">
                결제할 계좌를 골라주세요.
              </option>
              <option
                v-for="info in myAccountsNameIdNumberInfo"
                :key="info.name"
                :value="info.id">
                {{ info.name }} {{ info.accountNumber }}
              </option>
            </select>
          </div>
        </div>
        <div class="signiture">
          <label for="">이용약관에 동의합니까?</label>
          <input
            v-model="signiture"
            type="checkbox" />
        </div>
        <RouterLink
          class="btn"
          :to="href"
          @click="[buyProductAll(),resetCart()]">
          구매하기
        </RouterLink>
      </div>
    </div>
    <div
      v-else
      class="skeleton">
      장바구니가 비어있습니다.
    </div>
  </div>
</template>

<script>
import CartItem from '~/components/products/CartItem'
import authfunc from '~/store/authfunc.js'

export default {
  components: {
    CartItem
  },
  data() {
      return {
        signiture: false,
        myAccountId: ''
      }
  },
  computed: {
    cart() {
      return this.$store.state.product.cart
    },
    totalPrice() {
      return this.cart.reduce((acc,el) => acc + el.price, 0).toLocaleString()
    },
    myAccountsNameIdNumberInfo() {
      return this.$store.getters['account/myAccountsNameIdNumberInfo']
    },
    href() {
      if(this.signiture && this.myAccountId){
        return '/afterorder'
      }else {
        return '/order'
      }
    }
  },
  methods: {
    resetCart() {
      this.$store.commit('product/resetCart')
    },
    async buyProductAll() {
      if(this.signiture){
        for(let item of this.cart){
          await this.$store.dispatch('product/requestOrder',{
            username: this.$store.state.auth.APIheaderObj.username,
            authorization :'Bearer '+ authfunc.getCookie('accessToken'),
            productId: item.id,
            accountId: this.myAccountId
          })
        }     
      }
    },
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.cart-area {
  padding: 60px;
  .cart-title {
    font-size: 34px;
    margin-bottom: 30px;
  }
  button {
    float: right;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #0D6EFD;
    cursor: pointer;
    margin: 15px 100px;
  }
  .cart-subject {
    width: 80%;
    height: 40px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #ededed;
    clear: both;
    .title {
      font-size: 16px;
    }
  }
}

.buy-area {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  .total-price {
    margin-bottom: 20px;
    strong {
      font-size: 34px;
      font-weight: 700;
    }
  }
  .select-account {
    margin-bottom: 10px;
    select {
      width: 100%;
      height: 30px;
    }
  }
  .signiture {
    margin-bottom: 10px;
  }
  .btn {
    border: none;
    cursor: pointer;
    width: 120px;
    height: 40px;
    line-height: 40px;
    background-color: #0d6efd;
    color: #fff;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
  }
}



</style>
