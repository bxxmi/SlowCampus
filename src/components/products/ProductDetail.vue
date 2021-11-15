<template>
  <nav>
    네비게이션
  </nav>
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
  <footer>
    푸터
  </footer>
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
}

.like {
  color: red;
}

nav {
  width: 100%;
  height: 80px;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-area {
  border: 1px solid red;
  width: 100%;
  height: 606px;
  box-sizing: border-box;
  padding: 100px;
  section {
    border: 1px solid red;
  }
}

footer {
  width: 100%;
  height: 80px;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail {
  img {
    width: 400px;
    height: 400px;
  }
}
</style>
