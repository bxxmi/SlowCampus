<template>
  <div class="card-area">
    <div class="order-logo">
      <p>주문하신 상품의 상세 내역입니다</p>
      <i class="fas fa-receipt"></i>
    </div>
    <ul class="order-info">
      <li class="order">
        <span class="title">강의명</span>
        <span>{{ item.title }}</span>
      </li>
      <li class="order">
        <span class="title">결제 금액</span>
        <span>{{ item.price }} 원</span>
      </li> 
      <li class="order">
        <span class="title">결제 시간</span>
        <span>{{ time }}</span>
      </li>
      <li
        v-if="cancel"
        class="order">
        <span class="title">주문 여부</span>
        <span>주문 취소</span>
      </li>
      <li
        v-else
        class="order">
        <span class="title">주문 여부</span>
        <span>주문 확정</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    time: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    },
    done: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-area {
  width: 450px;
  margin: 65px auto;
  .order-logo {
    width: 300px;
    height: 200px;
    text-align: center;
    margin: 0 auto 20px;
    display: block;
    p {
      margin-bottom: 40px;
      font-size: 13px;
      color: #888888;
    }
    .fa-receipt {
      font-size: 92px;
      color:#0D6EFD;
    }
  }
  .order-info {
    width: 350px;
    margin: 0 auto;
    .order {
      margin-bottom: 25px;
      font-size: 16px;
    }
    .title {
      margin-right: 20px;
      font-weight: 700;
    }
  }
}
</style>
