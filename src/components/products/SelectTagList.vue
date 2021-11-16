<template>
  <div class="tag-area">
    <ul class="tag-list">
      <SelectTagItem 
        v-for="item in itemList"
        :key="item"
        :item="item" />
    </ul>
  </div>
</template>

<script>
import SelectTagItem from './SelectTagItem.vue'

export default {
  components: {
    SelectTagItem
  },
  computed: {
    itemList() {
      const tagList = this.$store.state.product.allProduct
      const newArray = []

      tagList.forEach((tag) => {
        if (!newArray.includes(tag.tags)) {
          newArray.push(tag.tags)
        }
      })
      return newArray
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-area {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  .tag-list {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
