<template>
  <div id="detai">
    <detai-nav-bar class="detai-nav" @dtaiNavClick="navClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scroll">
      <detai-swiper :topImages="topImages" />
      <detai-base-info :goods="goods" />
      <detai-shop :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgload="imgload" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodsList="recommendInfo" ref="recommend" />
    </scroll>
    <detail-bottom-nav @addCart="addCart" />
    <!-- 组件监听原生事件必须加native修饰符 -->
    <back-top @click.native="backclick" v-show="isShow" />
    <!-- <toast :message="message" :isShow="toastIsShow" /> -->
  </div>
</template>

<script>
import DetaiNavBar from "./childComps/DetaiNavBar.vue";
import DetaiSwiper from "./childComps/DetaiSwiper.vue";
import DetaiBaseInfo from "./childComps/DetaiBaseInfo.vue";
import DetaiShop from "./childComps/DetaiShop";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomNav from "./childComps/DeatilBottomNav.vue";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
// import Toast from "components/common/toast/Toast";

import { debounce } from "common/utils";

import { backTop } from "common/mixin.js";
//将vuex中的actions里面的方法映射到这里
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detai",
  //mixins: [backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      offsetTopY: [0, 1000, 2000, 3000],
      timer1: null,
      currentIndex: 0,
      isShow: false,
      // message: "",
      // toastIsShow: false,
    };
  },
  components: {
    DetaiNavBar,
    DetaiSwiper,
    DetaiBaseInfo,
    DetaiShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomNav,
    GoodsList,
    BackTop,
    // Toast,
  },
  created() {
    //获取home传过来的id
    this.iid = this.$route.params.iid;
    //获取详情页信息
    getDetail(this.iid).then((res) => {
      //console.log(res);
      //获取轮播图
      this.topImages = res.result.itemInfo.topImages;
      //获取商品详细信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      //获取商家信息
      this.shop = new Shop(res.result.shopInfo);
      //商品图片
      this.detailInfo = res.result.detailInfo;
      //获取商品参数
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      //获取评论数据
      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0];
      }
    });
    //获取推荐数据
    getRecommend().then((res) => {
      //console.log(res);
      this.recommendInfo = res.data.list;
    });
  },
  mounted() {
    //防抖动
    let timer = null;
    //监听图片加载决解better-scroll滚动问题
    this.$bus.$on("detaiimgLoad", () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (this.$refs.scroll && this.$refs.scroll.scroll) {
          this.$refs.scroll.scroll.refresh();
        }

        //console.log(11);
      }, 100);
    });
  },
  methods: {
    //将vuex中的actions里面的方法映射到这里
    ...mapActions({
      add: "addCart",
    }),
    imgload() {
      //防抖动
      //监听图片加载决解better-scroll滚动问题
      if (this.timer1) clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        //刷新scroll，解决滚动问题
        this.$refs.scroll && this.$refs.scroll.scroll.refresh();
        //console.log(11);
        //获取nav对应的offsetTop
        this.offsetTopY = [];
        this.offsetTopY.push(0);
        this.offsetTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.offsetTopY.push(this.$refs.comment.$el.offsetTop - 44);
        this.offsetTopY.push(this.$refs.recommend.$el.offsetTop - 44);
        //console.log(this.offsetTopY);
      }, 300);
    },
    navClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.offsetTopY[index], 100);
    },
    scroll(position) {
      const y = -position.y;
      const length = this.offsetTopY.length;
      for (let i in this.offsetTopY) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            y >= this.offsetTopY[i] &&
            y < this.offsetTopY[i - 0 + 1]) ||
            (i == length - 1 && y >= this.offsetTopY[i]))
        ) {
          this.currentIndex = i;
          //console.log(this.currentIndex);
          this.$refs.nav.currentIndex = i;
        }
      }
      //返回顶部是否显示
      this.isShow = position.y < -1000;
    },
    backclick() {
      //返回顶部
      this.$refs.scroll.scroll.scrollTo(0, 0, 100);
    },
    addCart() {
      //console.log("加入购物车");
      //获取数据
      const good = {};
      // 2.对象信息
      good.iid = this.iid;
      good.imgURL = this.topImages[0];
      good.title = this.goods.title;
      good.desc = this.goods.desc;
      good.newPrice = this.goods.nowPrice;
      //提交mutations 将数据保存到vuex中
      //mutations尽量实现单一功能  这种复杂或者异步任务放在actions比较好
      //this.$store.commit("addCart", good);
      //让actins里面的addCart返回promise对象
      this.$store.dispatch("addCart", good).then((res) => {
        // this.message = res;
        // this.toastIsShow = true;
        // setTimeout(() => {
        //   this.message = "";
        //   this.toastIsShow = false;
        // }, 2000);
        //利用自己封装好的插件
        this.$toast.show(res);
      });

      //将vuex中的actions里面的方法映射到这里 这里和上面效果一样
      // this.add(good).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#detai {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detai-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>