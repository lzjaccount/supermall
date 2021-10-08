<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import Pullup from "@better-scroll/pull-up";
// BScroll.use(Pullup);
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //probeType等于0或1表示比监听滚动，2监听滚动，不监听惯性滚动，3都监听
    //这里不要用document.querySelector('.wrapper')获取元素，如果其他地方也有这个类名就不明确了
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: true,
    });
    //监听滚动
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    //上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //time设置默认300毫秒
      this.scroll.scrollTo(x, y, time);
    },
    finishPull() {
      this.scroll.finishPullUp();
    },
  },
};
</script>

<style scoped>
</style>