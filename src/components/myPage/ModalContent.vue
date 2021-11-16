<template>
  <div class="content-area">
    <img
      ref="image"
      :src="item.thumbnail"
      alt="thumbnail" />
    <p>강의명 : {{ item.title }}</p>
    <p>결제 금액 : {{ item.price }}원</p> 
    <p>결제 시간 : {{ time }}</p>
    <p v-if="cancel">
      주문 여부 : 주문 취소
    </p>
    <p v-else>
      주문 여부 : 주문 확정
    </p>
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
  },
  mounted() {
    const thumbnail = this.item.thumbnail
    if (!thumbnail) {
      this.$refs.image.src = 'https://image.pngaaa.com/465/115465-middle.png'
    }
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 100px;
}
</style>
