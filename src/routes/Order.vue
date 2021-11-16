<template>
  <h1 class="product-title">
    {{ productInfo.title }}
  </h1>
  <div class="product-image">
    <img
      :src="productInfo.image"
      :alt="productInfo.title" />
  </div>
  <strong class="product-price">{{ productInfo.price }}</strong>
  
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
  
  <div class="signiture">
    <label for="">이용약관에 동의합니까?</label>
    <input
      v-model="signiture"
      type="checkbox" />
  </div>
  
  <button
    type="button"
    @click="buyProduct">
    구매하기
  </button>
</template>

<script>
import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
  data() {
    return {
      myAccountId: '',
      signiture: false
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.product.productToOrderInfo
    },
    myAccountsNameIdNumberInfo() {
      return this.$store.getters['account/myAccountsNameIdNumberInfo']
    },
  },
  methods: {
    async buyProduct() {
      if(this.signiture){
        await store.dispatch('product/requestOrder',{
          username: store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
          productId: this.productInfo.id,
          accountId: this.myAccountId
        })
      }
    },
  }
}
</script>

