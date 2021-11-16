<template>
  <div>
    <input
      v-model="productName"
      type="text" 
      placeholder="보고싶은 강의를 찾아보세요 😋" 
      @keyup.enter="searchProduct()" />
    <button
      class="search-btn"
      @click="searchProduct">
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
  width: 350px;
  height: 40px;
  @include flex(center);
  margin: 50px auto;
  input {
    width: 300px;
<<<<<<< HEAD
    height: 100%;
    border: none;
    background-color: $color-bg;
    padding: 0;
    @include flex(center);
=======
    padding: 15px 20px;
    border-radius: 50px;
    border: none;
    background-color: #eaeaea;
    font-weight: 700;
  }
  .search-btn {
    border: none;
    background:transparent;
    cursor: pointer;
    color:#0D6EFD;
    margin-left: -50px;
>>>>>>> 90cee11b20a20cf3caf271fefea4bb9321010a0b
  }
  button{
    cursor: pointer;
    border: none;
    width: 50px;
    height: 100%;
    border: 1px solid $color-primary;
    background-color: $color-primary;
    @include flex(center);
  }

}
</style>
