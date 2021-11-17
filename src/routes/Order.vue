<template>
  <div class="product-card">
    <div class="product-info">
      <div class="product-image">
        <img
          :src="productInfo.image"
          :alt="productInfo.title" />
      </div>

      <div class="product-description">
        <h1 class="product-title">
          {{ productInfo.title }}
        </h1>
  
        <strong class="product-price">{{ productInfo.price.toLocaleString() }} 원</strong>
  
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
      </div>
    </div>

    <RouterLink
      to="/afterorder"
      class="buy-btn"
      @click="buyProduct">
      구매하기
    </RouterLink>
  </div>
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
  created() {
    this.loadMyAccount()
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
    async loadMyAccount() {
        await this.$store.dispatch('account/checkBankListCanChoice',{
          username: this.$store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        await this.$store.dispatch('account/checkAccountListandBalance',{
          username: this.$store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        this.navChoice = 'account'
      }
  }
}
</script>

<style lang="scss" scoped>
  .product-info {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
  
    .product-image {
      width: 200px;
      height: 200px;
      margin-right: 20px;
      border-radius: 4px;
      object-fit: cover;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .product-description {
      padding: 20px;

      > * {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .product-title {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }

  .product-price {
    display: block;
    font-size: 14px;
    font-weight: 700;
  }

  label {
    margin-right: 10px;
    font-size: 12px;
  }

  select {
    background-color: #DDD;
    color: #7d7d7d;
    border: 0;
    border-radius: 2px;
  }

  .buy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    background-color: $color-blue;
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    border-radius: 4px;

    &:hover {
      opacity: .7;
    }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 64vh;
  }
</style>
