<template>
  <MainSlide />
  <SearchProduct />
  <SelectTagList />
  <ProductList />
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
  }
}
</script>
