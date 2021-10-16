<template>
  <swiper class="detai-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <a href="javascript:;">
        <img :src="item" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetaiSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.detai-swiper {
  height: 300px;
  overflow: hidden;
}
</style>