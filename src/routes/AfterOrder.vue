<template>
  <div class="after-card">
    <span class="material-icons">
      check_circle_outline
    </span>
    <p class="after-msg">
      주문해 주셔서 감사합니다.
    </p>
  
    <div class="btn-group">
      <RouterLink
        to="/"
        class="btn">
        다른 상품 둘러보기
      </RouterLink>
      <RouterLink
        to="/myorder"
        class="btn">
        주문 내역 확인하기
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.after-card {
  position: relative;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 63vh;
  
  .after-msg {
    font-size: 50px;
    margin-bottom: 30px;
  }

  .btn-group {
    display: flex;
    flex-direction: row;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 50px;
      background-color: $color-blue;
      color: #fff;
      font-size: 20px;
      text-decoration: none;
      transition: 0.2s;
      border-radius: 8px;

      &:first-child {
        margin-right: 20px;
      }

      &:hover {
        opacity: .7;
      }
    }
  }

  .material-icons {
    font-size: 100px;
    color: $color-blue;
    margin-bottom: 30px;
  }
}
</style>
