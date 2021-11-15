<template>
  <Header/>
  <MainSlide />
  <SearchProduct />
  <SelectTagBar />
  <ProductList />
</template>

<script>
import MainSlide from '~/components/MainSlide'
import SearchProduct from '~/components/SearchProduct'
import SelectTagBar from '~/components/SelectTagBar'
import ProductList from '~/components/ProductList'
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
