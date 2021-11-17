<template>
  <div class="cart-area">
    <div class="cart-title">
      장바구니
    </div>
    <button
      type="button"
      @click="resetCart">
      전체 삭제
    </button>
    <div
      v-if="totalPrice!=='0'"
      class="payment">
      <CartItem
        v-for="item in cart"
        :key="item"
        :item="item" />
      <div class="account-selector">
        <label for="accountSelect">결제수단</label>
        <select
          id="accountSelect"
          v-model="myAccountId"
          name="myAccount">
          <option value="">
            결제 수단을 선택하세요.
          </option>
          <option
            v-for="info in myAccountsNameIdNumberInfo"
            :key="info.name"
            :value="info.id">
            {{ info.name }} {{ info.accountNumber }}
          </option>
        </select>
      </div>
      <strong class="totalPrice">총 상품 금액: {{ totalPrice }}원</strong>
      <div class="signiture">
        <label for="">이용약관에 동의합니까?</label>
        <input
          v-model="signiture"
          type="checkbox" />
      </div>
      <RouterLink
        to="/afterorder"
        @click="[buyProductAll(),resetCart()]">
        구매하기
      </RouterLink>
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
.cart-area {
  border: 1px solid red;
  padding: 60px;
  .cart-title {
    border: 1px solid blue;
    font-size: 34px;
    color: #cdcdcd;
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
    margin: 15px 0;
  }
}
</style>
