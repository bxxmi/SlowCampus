<template>
  <h1>관리자 제품 등록 페이지</h1>
  <input
    v-model="productName"
    type="text"
    placeholder="상품명" />
  <input
    v-model="productPrice"
    type="text"
    placeholder="가격" />
  <input
    v-model="productDescription"
    type="text"
    placeholder="상세설명" />
  <input
    v-model="productTag"
    type="text"
    placeholder="제품태그" />
  <button @click="addProduct">
    등록
  </button>
</template>

<script>
export default {
  data() {
    return {
      productName: '',
      productPrice: '',
      productDescription: '',
      productTag: ''
    }
  },
  methods: {
    // fix? 뭔가 코드가 아쉬운데 다르게 변경할 수는 없을까 고민해보자
    async addProduct() {
      const product = [{
        'title': this.productName,
        'price': this.productPrice,
        'description': this.productDescription,
        'tags': this.productTag
      }]

      await this.$store.dispatch('product/addProduct', product)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
