<template>
  <nav class="my-page-nav">
    <RouterLink
      class="btn"
      to="/salesList">
      판매 내역
    </RouterLink>
    <RouterLink
      class="btn"
      to="/createProduct">
      제품 추가
    </RouterLink>
    <RouterLink
      class="btn"
      to="/myaccount"
      @click="choiceAccount">
      제품 수정
    </RouterLink>
  </nav>
  <div class="border"></div>
</template>

<style lang="scss">
.my-page-nav{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  .btn{
    margin-top: 30px;
    
    @include main-btn($color-white, $color-primary);
    &:hover{
    @include main-btn($color-primary, $color-white);
    }
  }
}

.border { 
  width: 1px;
  background-color: $color-primary;
}
</style>
