<template>
  <div class="goods-item" @click="itemClick">
    <a href="javascript:;">
      <img v-lazy="showImg" alt="" @load="imgLoad" />
      <p class="title">{{ goodsItem.title }}</p>
      <div>
        <span class="price">{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.cfav }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    //监听图片加载决解better-scroll滚动问题
    imgLoad() {
      // console.log(this.$bus);
      //通过事件总线发送
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("homeimgLoad");
      } else if (this.$route.path.indexOf("/detai") !== -1) {
        this.$bus.$emit("detaiimgLoad");
      }
    },
    itemClick() {
      this.$router.push("/detai/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  text-align: center;
  padding: 3px;
}
.goods-item a {
  display: block;
}
.goods-item img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 8px;
}
.goods-item .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  color: var(--color-high-text);
  margin-right: 21px;
}
.collect {
  position: relative;
}
.collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>