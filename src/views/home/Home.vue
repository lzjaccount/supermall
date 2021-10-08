<template>
  <div id="home">
    <nav-bar id="nav-home"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
      :pull-upload="true"
    >
      <home-swiper :banner="banner" />
      <recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      />
      <goods-list :goods-list="goods[currentIndex].list" />
    </scroll>
    <!-- 组件监听原生事件必须加native修饰符 -->
    <back-top @click.native="backclick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getMultiData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      keywords: [],
      dKeyword: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentIndex: "pop",
      isShow: true,
    };
  },
  created() {
    //获取首页更多数据
    this.getMultiData();
    //获取商品信息
    this.getHomeGoods("sell");
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    //监听图片加载决解better-scroll滚动问题
    this.$bus.$on("imgLoad", () => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  methods: {
    //事件监听相关事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = "pop";
          break;
        case 1:
          this.currentIndex = "new";
          break;
        case 2:
          this.currentIndex = "sell";
          break;
      }
    },
    backclick() {
      //返回顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    scroll(position) {
      this.isShow = position.y < -1000;
    },
    //网络请求相关事件
    getMultiData() {
      getMultiData().then((res) => {
        //console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.keywords = res.data.keywords.list;
        this.dKeyword = res.data.dKeyword.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
      //结束上拉加载更多，这样才能进行下一次下拉加载
    },
  },
  mounted() {},
};
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  /* vh是视口高度的意思  */
  height: 100vh;
}
#nav-home {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
.tab-control {
  position: sticky;
  top: 44px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>