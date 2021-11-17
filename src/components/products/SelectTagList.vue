<template>
  <div
    class="tag-area">
    <ul
      ref="tagList"
      class="tag-list"
      :class="{ 'full': isFull }">
      <SelectTagItem 
        v-for="item in itemList"
        :key="item"
        :item="item" />
      <span
        class="material-icons"
        @click="clickTagList">
        expand_more
      </span>
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
      isFull: false
    }
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
  },
  methods: {
    clickTagList() {
      this.isFull = !this.isFull
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-area {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .tag-list {
    position: relative;
    padding: 10px 30px 0 10px;
    border-radius: 7px;
    width:70%;
    height: 50px;
    overflow: hidden;
    margin: 0 auto;
    box-shadow: 2px 5px 8px #e6e6e6;
    background-color:#89cff0;

    .material-icons {
      position: absolute;
      top: 12px;
      right: 7px;
      padding: 5px;
      cursor: pointer;
      transition: .5s;
    }

    &.full {
      height: auto;
      overflow: visible;
      
      .material-icons {
        transform: rotate(180deg);
      }
    }
  }  
}
</style>
