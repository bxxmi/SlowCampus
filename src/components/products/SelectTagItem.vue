<template>
  <li
    class="tag-item"
    @click="searchTag">
    {{ item.tags }}
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
  methods: {
    async searchTag() {
       this.$store.dispatch('product/searchTag', {
        tagName: this.item.tags
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-item {
      border: 2px solid #ededed;
      padding: 8px 15px;
      margin-right: 10px;
      text-align: center;
      background-color: white;
      border-radius: 50px;
    }
</style>
