<template>
  <div id="home">
    <nav-bar id="nav-home"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banner" />
    <recommend-view :recommend="recommend" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getMultiData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
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
    };
  },
  created() {
    getMultiData().then((res) => {
      console.log(res);
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
      this.keywords = res.data.keywords.list;
      this.dKeyword = res.data.dKeyword.list;
    });
  },
};
</script>

<style>
#home {
  padding-top: 44px;
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
</style>