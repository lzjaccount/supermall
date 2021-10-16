<template>
  <div class="bottom-nav">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomNav",
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.bottom-nav {
  display: flex;
  height: 49px;
  background-color: #fff;
}
.left,
.right {
  flex: 1;
}
.left {
  display: flex;
}
.left div {
  flex: 1;
  text-align: center;
  padding-top: 5px;
}

.right {
  display: flex;
}
.right div {
  flex: 1;
  text-align: center;
  line-height: 49px;
}
.icon {
  display: block;
  width: 22px;
  height: 22px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 0;
  background-size: 100%;
  margin: 0 auto;
}
.service {
  background-position: 0 -54px;
}
.shop {
  background-position: 0 -98px;
}
.cart {
  background-color: #ffe817;
  color: #333;
}
.buy {
  color: #fff;
  background-color: #f69;
}
</style>