<template>
  <div class="top">
    <AdminNav />
    <div class="bottom">
      <div class="create-item">
        <label>상품명</label>
        <input
          v-model="productName"
          type="text"
          placeholder="제품 명을 적어주세요." />
        <label>가격</label>
        <input
          v-model="productPrice"
          type="text"
          placeholder="제품 가격을 적어주세요." />
        <label>상세설명</label>
        <input
          v-model="productDescription"
          type="text"
          placeholder="제품에 대한 설명을 적어주세요." />
        <label>제품태그</label>
        <input
          v-model="productTag"
          type="text"
          placeholder="제품을 대표할 태그를 작성해주세요." />
        <label>썸네일</label>
        <input
          type="file"
          @change="selectThumbnail" />
        <label>상품 이미지</label>
        <input
          type="file"
          @change="selectDetailImage" />
        <button @click="addProduct">
          등 록
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from './AdminNav.vue'

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      productName: '',
      productPrice: '',
      productDescription: '',
      productTag: '',
      productThumbnail: '',
      productDetailImage: '',
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
      const product = [
        {
          title: this.productName,
          price: this.productPrice,
          description: this.productDescription,
          tags: this.productTag,
          thumbnailBase64: this.productThumbnail,
          photoBase64: this.productDetailImage,
        },
      ]
      await this.$store.dispatch('product/addProduct', product)
    },
  },
}
</script>

<style lang="scss" scoped>
.create-item {
  min-width: 300px;
  margin: 30px auto;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  input {
    margin-bottom: 10px;
    height: 38px;
    padding: 0 10px;
  }
  button {
    width: 100px;
    height: 40px;
    font-size: 16px;
    border: none;
    color: white;
    background-color: #0d6efd;
    border-radius: 10px;
    position: absolute;
    bottom: -30px;
    right: 50px;
  }
}
</style>
