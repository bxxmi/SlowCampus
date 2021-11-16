<template>
  <div class="section-area">
    <section>
      <div class="thumbnail">
        <img
          ref="image"
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
          # {{ productInfo.tags }}
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
  mounted() {
    const thumbnail = this.productInfo.thumbnail
    if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
    }
  },
  methods: {
    clickLikeBtn() {
      this.like = !this.like
      console.log(this.like)
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

.section-area {
  width: 100%;
  height: 606px;
  box-sizing: border-box;
  padding: 100px 300px;
  section {
    display: flex;
      min-width: 650px;
    .thumbnail {
      img {
      width: 400px;
      height: 400px;
      object-fit: cover;
      display: block;
      margin-right: 20px;
      }
    }
    .product-info-list {
      .product-tag {
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

.fa-heart {
  font-size: 24px;
}

.fas.fa-heart {
  color: #FE1694;
}

.far.fa-heart {
  color: #eaeaea
}
</style>
