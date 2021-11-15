<template>
  <div>
    <input
      v-model="productName"
      type="text" 
      placeholder="보고싶은 강의를 찾아보세요 😋" 
      @keyup.enter="searchProduct()" />
    <button @click="searchProduct">
      <span class="material-icons">
        search
      </span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: ''
    }
  },
  methods: {
    async searchProduct() {
      this.$store.dispatch('product/searchProduct', {
        productName: this.productName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 200px;
  }
}
</style>
