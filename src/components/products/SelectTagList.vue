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
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  .tag-list {
    padding-top: 10px;
    padding-left: 10px ;
    border-radius: 7px;
    width:70%;
    margin: 0 auto;
    box-shadow: 2px 5px 8px #888888;
    background-color:#89cff0;
  }
}
</style>
