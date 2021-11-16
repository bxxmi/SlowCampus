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
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    itemList() {
      return this.$store.state.product.allProduct
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
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
