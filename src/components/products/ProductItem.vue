<template>
  <li
    class="product-item">
    <RouterLink
      :to="`${href}/${id}`">
      <div class="product-image">
        <img
          ref="image"
          :src="item.thumbnail"
          alt="thumbnail" />
      </div>
      <p>{{ item.title }}</p>
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      href: '/productDetail',
      id: this.item.id
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
a {
  text-decoration: none;
  color: black;
  font-weight: 700;
  &:visited {
    color: black;
  }
}

.product-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  overflow: hidden;
  .product-image {
    width: 600px;
    height: 300px;
    display: block;
    object-fit: cover;
    overflow: hidden;
    
    img {
      position: relative;
      bottom: 100px;
      display: block;
      width: 100%;
    }
  }
  p {
    padding: 20px 30px;
  }
}
</style>
