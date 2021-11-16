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
  width: 350px;
  height: 40px;
  @include flex(center);
  margin: 50px auto;
  input {
    width: 300px;
    height: 100%;
    border: none;
    background-color: $color-bg;
    padding: 0;
    @include flex(center);
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
