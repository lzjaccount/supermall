<template>
  <div id="home">
    <nav-bar id="nav-home"><div slot="center">购物街</div></nav-bar>
    <!-- 用于实现tab-control上吸 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control2"
      @tabClick="tabClick"
      ref="tabControl2"
      v-show="isfixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
      :pull-upload="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl1"
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
      isShow: false,
      tabControlOffsetTop: 0,
      isfixed: false,
    };
  },
  created() {
    //获取首页更多数据
    this.getMultiData();
    //获取商品信息
    this.getHomeGoods("sell");
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backclick() {
      //返回顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    scroll(position) {
      //判断返回顶部是否显示
      this.isShow = position.y < -1000;
      this.isfixed = position.y < -this.tabControlOffsetTop;
    },
    loadmore() {
      this.getHomeGoods(this.currentIndex);
    },
    swiperImgLoad() {
      //不能直接获取tabControl的offsetTop，因为图片没加载成功会影响offsetTop
      //一旦轮播图加载完，获取tabControl的offsetTop，因为轮播图是影响最大的因素
      //$el用于获取组件中的dom元素
      this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop;
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
        //结束上拉加载更多，这样才能进行下一次下拉加载
        this.$refs.scroll && this.$refs.scroll.finishPull();
      });
    },
  },
  mounted() {
    //防抖动
    let timer = null;
    //监听图片加载决解better-scroll滚动问题
    this.$bus.$on("homeimgLoad", () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.$refs.scroll.scroll.refresh();
        // console.log(11);
      }, 100);
    });
  },
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

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control2 {
  position: relative;
  z-index: 9;
}
</style>