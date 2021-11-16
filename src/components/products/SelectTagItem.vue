<template>
  <li
    class="tag-item"
    :class="{ blue: isBlue }"
    @click="searchTag">
    # {{ item.tags }}
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
      isBlue: false
    }
  },
  methods: {
    async searchTag() {
      this.isBlue = true
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
  margin: 0 10px 10px 0;
  text-align: center;
  background-color: white;
  border-radius: 50px;
  float: left;
  cursor: pointer;
  &:hover {
    border: 2px solid #0D6EFD;
    color: #0D6EFD;
  }
}

.blue {
  color: #0D6EFD;
  border: 2px solid #0D6EFD;
}
</style>
