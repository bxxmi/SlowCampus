<template>
  <div class="product-list">
    <ProductItem
      v-for="item in itemListArray.slice(0,$store.state.auth.range)"
      :key="item.detailId"
      class="box"
      :item="item" />
  </div>
</template>

<script>
import ProductItem from '~/components/products/ProductItem.vue'

//호출된 항목의 개수
let count = 0

export default {
  components: {
    ProductItem,
  },
  computed: {
    itemList() {
      return this.$store.state.product.allProduct
    },
    itemListArray(){
      let result =[]
      for(let i=0; i<this.itemList.length;i++){
        result.push(this.itemList[i])
      }
      return result
    },
  },
  mounted() {
    this.$store.dispatch('product/getAllProduct')
  },
  updated: function () {

    this.$nextTick(function () {
      //intersection observer
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
            if(this.$store.state.auth.range < this.itemListArray.length){
              count += 1
              if(count%5 == 0){
                this.$store.commit('auth/setRange')
              }
            }
          } 
        })
      })

      document.querySelectorAll('.box').forEach((box) => io.observe(box))
    })
  }
}
</script>

<style lang="scss" scoped>

.product-list {
  display: flex;
  flex-direction: column;
  
  width: 70%;
  margin: 10px auto;

  .box{
    filter: blur(5px);
    transition: filter 1s;
    margin: 30px auto;
    min-height: 360px;
  }
  .box.visible {
    filter: blur(0)
  }
}
</style>
