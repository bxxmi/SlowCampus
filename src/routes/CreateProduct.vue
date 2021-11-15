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
  <input
    type="file"
    @change="selectThumbnail" />
  <input
    type="file"
    @change="selectDetailImage" />
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
      productTag: '',
      productThumbnail: '',
      productDetailImage: ''
    }
  },
  methods: {
    selectThumbnail(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.productThumbnail = reader.result
        })
      }
    },
    selectDetailImage(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.productDetailImage = reader.result
        })
      }
    },
    async addProduct() {
      const product = [{
        'title': this.productName,
        'price': this.productPrice,
        'description': this.productDescription,
        'tags': this.productTag,
        'thumbnailBase64': this.productThumbnail,
        'photoBase64': this.productDetailImage
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
