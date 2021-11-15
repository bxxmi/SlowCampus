<template>
  <div class="tag-area">
    <ul class="tag-list">
      <SelectTagItem 
        v-for="item in itemList"
        :key="item.detailId"
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
      return this.$store.state.product.allProduct
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
  margin-bottom: 30px;
  .tag-list {
    display: flex;
  }
}
</style>
