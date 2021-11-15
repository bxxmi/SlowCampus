<template>
  <div>
    <input
      v-model="itemName" />
    <button @click="searchProduct(productName)">
      <span class="material-icons">
        search
      </span>
    </button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      itemName: ''
    }
    
  },
  method: {
    async searchProduct(productName) {
      console.log(productName)
      let { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2'
        },
        data: {
          'searchText': productName
        }
      })
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  height: 70px;
  background-color: salmon;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
