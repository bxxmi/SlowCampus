<template>
  <footer>
    <div class="person">
      <span>김예림</span>
      <span>박영찬</span>
      <RouterLink
        to="/"
        class="logo">
        <img src="logo.svg" />
      </RouterLink>
      <span>이태지</span>
      <span>김보미</span>
    </div>
    <hr />
    <div class="copy-right">
      &copy;{{ new Date().getFullYear() }}Fast Campus KDT Team-slow
    </div>
  </footer>
</template>

<style lang="scss" scoped>
 footer {
   padding: 2%;
   background: $color-footer;
   display:block;
   .person{
     @include flex(space-around);
     span {
      font-size: $font-size-m;
      }
      img{width: 50px;}
   }
   .copy-right{
     padding-top: 10px;
     font-size: $font-size-sm;
     @include flex(center);
   }
   
 }
</style>
