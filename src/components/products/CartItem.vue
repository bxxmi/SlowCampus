<template>
  <div>
    <h1 class="product-title">
      {{ item.title }}
    </h1>
    <div class="product-image">
      <img
        :src="item.image"
        :alt="item.title" />
    </div>
    <strong class="product-price">{{ item.price }}</strong>

    <button
      type="button"
      @click="removeAtCart">
      삭제하기
    </button>
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
    methods: {
     removeAtCart() {
        this.$store.commit('product/removeCart',this.item.id)
      },
    }
}
</script>
