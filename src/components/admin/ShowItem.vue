<template>
  <EditProductModal
    v-if="isModalView"
    @close-modal="isModalView = false">
    <ModalContent :item="item" />
  </EditProductModal>
  <div class="product">
    <div class="product-area">
      <div class="product-image">
        <img
          ref="image"
          :src="item.thumbnail"
          alt="productImage" />
      </div>
      <div class="product-about">
        <div class="product-title">
          <h1 @click="isModalView = true">
            {{ item.title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProductModal from './EditProductModal.vue'
import ModalContent from './ModalContent.vue'

export default {
  components: {
    EditProductModal,
    ModalContent
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isModalView: false
    }
  },
  mounted() {
    const thumbnail = this.item.thumbnail
    if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/_variables.scss";

.product {
  border-radius: 15px;
  background-color: $color-bg;
  @include flex(flex-start);
  width: 80%;
  margin: 5%;
  position: relative;
  .product-area {
    width: 100%;
    padding: 20px;
    display: flex;
    position: relative;
    .product-image {
      margin-right: 40px;
      img {
        display: block;
        width: 100px;
        height: 60px;
      }
    }
  }
  .product-about {
    display: flex;
    align-items: center;
    .product-title {
      font-weight: 700;
      margin-right: 5px;
      font-size: $font-size-lg;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
