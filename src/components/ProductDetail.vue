<template>
  <nav>
    네비게이션
  </nav>
  <div class="section-area">
    <section>
      <div class="thumbnail">
        {{ productInfo.thumbnail }}
      </div>
      <div class="product-info-list">
        <div class="like-btn">
          <i class="far fa-heart"></i>
        </div>
        <div class="product-tag">
          {{ productInfo.tags }}
        </div>
        <div class="product-title">
          {{ productInfo.title }}
        </div>
        <div class="product-description">
          {{ productInfo.description }}
        </div>
        <button>구매하기</button>
      </div>
    </section>
  </div>
  <footer>
    푸터
  </footer>
</template>

<script>
export default {
  computed: {
    productInfo() {
      return this.$store.state.product.productInfo
    }
  },
  created() {
    this.$store.dispatch('product/detailProduct', {
      id: this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 200px;
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
</style>
