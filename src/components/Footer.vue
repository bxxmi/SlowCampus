<template>
  <footer>
    <div class="person">
      <span>김예림</span>
      <span>박영찬</span>
      <Logo />
      <span>이태지</span>
      <span>김보미</span>
    </div>
    <div class="copy-right">
      &copy;{{ new Date().getFullYear() }}Fast Campus KDT Team-slow
    </div>
  </footer>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
 footer {
   padding: 2%;
   background: $color-bg;
   display:block;
   .person{
     @include flex(space-around);
     span {
      font-size: $font-size-lg;
      }
   }
   .copy-right{
     padding-top: 10px;
     @include flex(center);
   }
   
 }
</style>
