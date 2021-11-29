<template>
  <div class="card-area">
    <ul class="item-info">
      <li class="item">
        <p class="title">
          상품명
        </p>
        <input
          v-model="productName"
          type="text" />
      </li>
      <li class="item">
        <p class="title">
          가격
        </p>
        <input
          v-model="productPrice"
          type="text" />
      </li> 
      <li class="item">
        <p class="title">
          상세설명
        </p>
        <input
          v-model="productDescription"
          type="text" />
      </li>
      <li class="item">
        <p class="title">
          제품태그
        </p>
        <input
          v-model="productTag"
          type="text" />
      </li>
      <li class="item">
        <p class="title">
          썸네일
        </p>
        <input
          type="file"
          @change="EditThumbnail" />
      </li>
      <li class="item">
        <p class="title">
          이미지
        </p>
        <input
          type="file"
          @change="EditDetailImage" />
      </li>
    </ul>
    <button @click="editProduct()">
      수 정
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      productName: this.item.title,
      productPrice: this.item.price,
      productDescription: this.item.description,
      productTag: this.item.tags,
      productThumbnail: this.item.thumbnail,
      productDetailImage: this.item.photo
    }
  },
  mounted() {
    console.log(this.item)
  },
  methods: {
      EditThumbnail(event) {
        const { files } = event.target
        for (const file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.addEventListener('load', () => {
            this.productThumbnail = reader.result
          })
        }
      },
      EditDetailImage(event) {
        const { files } = event.target
        for (const file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.addEventListener('load', () => {
            this.productDetailImage = reader.result
          })
        }
      },
      async editProduct() {
        const product = [
          {
            id: this.item.id,
            title: this.productName,
            price: this.productPrice,
            description: this.productDescription,
            tags: this.productTag,
            thumbnailBase64: this.productThumbnail,
            photoBase64: this.productDetailImage,
          },
        ]
        await this.$store.dispatch('product/editProduct', product)
      },
    },
}
</script>

<style lang="scss" scoped>
.card-area {
  width: 450px;
  margin: 65px auto;
  .item-info {
    width: 350px;
    margin: 0 auto;
    border: 1px solid red;
    .item {
      margin-bottom: 25px;
      font-size: 16px;
    }
    .title {
      margin-right: 20px;
      font-weight: 700;
    }
  }
}
</style>
