<template>
  <div class="app__inner">
    <Header />
    <div class="main">
      <RouterView  />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style lang="scss" scoped>
.app__inner {
  font-size: $font-size-m;
  line-height: 1.4;
  font-family: 'Noto Sans KR', sans-serif;
  color: $color-font;
}
.main{
  margin-top:10%;
}
</style>
