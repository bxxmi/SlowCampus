<template>
  <div class="section-area">
    <section>
      <div class="thumbnail">
        <img
          :src="productInfo.thumbnail"
          alt="thumbnail" />
      </div>
      <div class="product-info-list">
        <button
          class="btn like-btn"
          @click="clickLikeBtn">
          <i
            v-if="like"
            class="fas fa-heart"></i>
          <i
            v-else
            class="far fa-heart"></i>
        </button>
        <div class="product-tag">
          {{ productInfo.tags }}
        </div>
        <div class="product-title">
          {{ productInfo.title }}
        </div>
        <div class="product-description">
          {{ productInfo.description }}
        </div>
        <button class="btn buy-btn">
          구매하기
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      like: false
    }
  },
  computed: {
    productInfo() {
      return this.$store.state.product.productInfo
    }
  },
  created() {
    this.$store.dispatch('product/detailProduct', {
      id: this.$route.params.id
    })
  },
  methods: {
    clickLikeBtn() {
      this.like = !this.like
      localStorage.setItem(this.like, this.like)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  cursor: pointer;
}

.like-btn {
  background-color: transparent;
  margin-bottom: 10px;
}

.like {
  color: red;
}

.section-area {
  border: 1px solid red;
  width: 100%;
  height: 606px;
  box-sizing: border-box;
  padding: 100px 300px;
  section {
    border: 1px solid red;
    display: flex;
      min-width: 650px;
    .thumbnail {
      img {
      width: 400px;
      height: 400px;
      display: block;
      margin-right: 20px;
      }
    }
    .product-info-list {
      border: 1px solid red;
      width: 100%;
      .product-tag {
        width: 50px;
        height: 20px;
        background-color: #eaeaea;
        color: #444444;
        font-weight: 700;
        line-height: 15px;
        text-align: center;
        border-radius: 50px;
        font-size: 12px;
        margin-bottom: 20px;
      }
      .product-title {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 30px;
      }
      .product-description {
        color: #444444;
        margin-bottom: 30px;
      }
    }
  }
}

.buy-btn {
  border: 1px solid red;
}
</style>
