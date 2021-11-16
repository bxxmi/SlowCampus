<template>
  <nav class="my-page-nav">
    <RouterLink to="/myinfo">
      정보 수정
    </RouterLink>
    <RouterLink
      to="/myorder"
      @click="choiceOrder">
      주문 내역
    </RouterLink>
    <RouterLink
      to="/myaccount"
      @click="choiceAccount">
      계좌 확인
    </RouterLink>
  </nav>
</template>
