<template>
  <li class="product-item">
    <RouterLink
      :to="`${href}/${id}`">
      <img
        :src="item.thumbnail"
        alt="thumbnail" />
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
  img {
  width: 600px;
  height: 300px;
  display: block;
  }
  p {
    padding: 20px 30px;
  }
}
</style>
