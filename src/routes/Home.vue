<template>
  <MainSlide />
  <SearchProduct/>
  <SelectTagList class='tag'/>
  <ProductList/>
</template>

<script>
import MainSlide from '~/components/MainSlide'
import SearchProduct from '~/components/products/SearchProduct'
import SelectTagList from '~/components/products/SelectTagList'
import ProductList from '~/components/products/ProductList'

export default {
  components: {
    MainSlide,
    SearchProduct,
    SelectTagList,
    ProductList
  },
}
</script>

<style lang="scss" scoped>

  .tag{
    position: sticky;
    top: 9%;
    z-index: 10;

    padding: 10px 0;

    overflow: hidden;
    background-color: $color-punch;
  }
</style>
