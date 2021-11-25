<template>
  <div class="product">
    <div class="product-area">
      <div class="product-image">
        <img
          ref="image"
          :src="item.product.thumbnail"
          alt="productImage" />
      </div>
      <div class="product-about">
        <div class="product-title">
          <h1>
            {{ item.product.title }}
          </h1>
        </div>
        <span class="product-time-paid">판매 일자: {{ item.timePaid }}</span>
      </div>
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
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_variables.scss';

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
    .product-title {
      display: flex;
      align-items: center;
      font-weight: 700;
      margin-right: 5px;
    }
    .product-title{
      font-size: $font-size-lg;
      margin-bottom: 20px;
    }
    .product-time-paid {
      font-size: $font-size-m;
    }
  }
}
</style>
