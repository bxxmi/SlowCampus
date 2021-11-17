<template>
  <div class="slide-area">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :autoplay = "{
        delay: 5000,
        disableOnInteraction : true
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange">
      <swiper-slide>
        <img
          src="slide1.svg"
          alt="logo" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="slide2.svg"
          alt="logo" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="slide3.svg"
          alt="logo" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import {Autoplay} from 'swiper';

  // Import Swiper styles
  import 'swiper/css'
  import 'swiper/css/autoplay'

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
        modules:[Autoplay]
      }
    },
  }
</script>

<style lang="scss" scoped>
.slide-area {
  width: 100%;

  .swiper {
  width: 100%;
  height: 300px;
    .swiper-slide {
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}



</style>
