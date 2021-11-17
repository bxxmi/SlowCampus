<template>
  <div class="cart-info">
    <div class="product-info">
      <div class="product-image">
        <img
          ref="image"
          :src="item.image"
          :alt="item.title" />
      </div>
      <div class="product-title">
        {{ item.title }}
      </div>
      <div class="product-price">
        <strong>{{ item.price ? item.price : 0 }}원</strong>
      </div>
      <button
        type="button"
        @click="removeAtCart">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      item: {
          type: Object,
          default: () => ({})
      }
  },
  mounted() {
    const thumbnail = this.item.image
    if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
    }
  },
  methods: {
    removeAtCart() {
      alert('장바구니에서 삭제하시겠습니까?')
      this.$store.commit('product/removeCart',this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-info {
  margin-bottom: 30px;
  .product-info {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .product-image{
      margin-right: 40px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .product-title {
      width: 110px;
      font-size: 18px;
      line-height: 100px;
      margin-right: 85px;
    }
    .product-price {
      font-size: 18px;
      line-height: 100px;
      margin-right: 340px;
    }
    button {
      font-size: 18px;
      color: #444444;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
