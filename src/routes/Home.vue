<template>
  <MainSlide />
  <SearchProduct />
  <SelectTagBar />
  <ProductList />
</template>

<script>
import MainSlide from '~/components/MainSlide'
import SearchProduct from '~/components/products/SearchProduct'
import SelectTagBar from '~/components/products/SelectTagBar'
import ProductList from '~/components/products/ProductList'

export default {
  components: {
    MainSlide,
    SearchProduct,
    SelectTagBar,
    ProductList
  }
}
</script>
