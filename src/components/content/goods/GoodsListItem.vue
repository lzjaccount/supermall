<template>
  <div class="goods-item">
    <a :href="goodsItem.link">
      <img :src="goodsItem.show.img" alt="" @load="imgLoad" />
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
  methods: {
    //监听图片加载决解better-scroll滚动问题
    imgLoad() {
      // console.log(this.$bus);
      //通过事件总线发送
      this.$bus.$emit("imgLoad");
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