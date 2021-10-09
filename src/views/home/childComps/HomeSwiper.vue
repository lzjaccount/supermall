<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isemit: false,
    };
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 监听轮播图加载完成
    imgLoad() {
      //发射一次就可以了
      if (!this.isemit) {
        this.$emit("swiperImgLoad");
        this.isemit = true;
      }
    },
  },
};
</script>

<style>
</style>