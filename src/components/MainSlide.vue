<template>
  <div class="slide-area">
    <swiper
      @swiper="onSwiper"
      @slide-change="onSlideChange">
      <swiper-slide>
        <img
          src="bg-g.svg"
          alt="logo" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="bg-b.svg"
          alt="logo" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="bg-p.svg"
          alt="logo" />
      </swiper-slide>
      ...
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue'

  // Import Swiper styles
  import 'swiper/css'

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper)
      }
      const onSlideChange = () => {
        console.log('slide change')
      }
      return {
        onSwiper,
        onSlideChange,
      }
    },
  }
</script>

<style lang="scss" scoped>
.slide-area {
  width: 100%;
  height: 330px;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  .swiper {
  width: 100%;
  height: 100%;
    .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}



</style>
