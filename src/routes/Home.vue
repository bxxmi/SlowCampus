<template>
  <Header />
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
import Header from '~/components/Header'

export default {
  components: {
    Header,
    MainSlide,
    SearchProduct,
    SelectTagBar,
    ProductList
  }
}
</script>
