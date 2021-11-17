<template>
  <nav class="my-page-nav">
    <RouterLink
      class="btn"
      to="/myinfo">
      정보 수정
    </RouterLink>
    <RouterLink
      class="btn"
      to="/myorder"
      @click="choiceOrder">
      주문 내역
    </RouterLink>
    <RouterLink
      class="btn"
      to="/myaccount"
      @click="choiceAccount">
      계좌 확인
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
  .border{ 
    width: 1px;
    background-color: $color-primary;
  }
</style>
