<template>
  <div class="shop">
    <div class="logo">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="message">
      <div class="sell">
        <span>
          {{ Math.floor(shop.sells / 10000) + "万" }}<br />
          总销量
        </span>
        <span>
          {{ shop.goodsCount }}<br />
          全部宝贝
        </span>
      </div>
      <div class="evaluate">
        <div v-for="(item, index) in shop.score" :key="index" class="eva-item">
          <span>{{ item.name }}</span>
          <span :class="{ green: item.score < 5 }" class="red">{{
            item.score
          }}</span>
          <span :class="{ green: item.score < 5 }" class="red">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="enter">
      <div>进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetaiShop",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.shop {
  /* height: 500px; */
  padding: 30px 10px 0;
}
.logo {
  font-size: 20px;
  margin-bottom: 30px;
}
.logo img {
  height: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
.message {
  display: flex;
}
.sell {
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding-right: 10px;
  border-right: 1px solid #ccc;
}
.sell span {
  height: 60px;
  color: black;
  font-size: 18px;
  text-align: center;
}
.evaluate {
  flex: 1;
  color: black;
  padding-left: 10px;
}
.eva-item {
  display: flex;
  justify-content: space-between;
}
.green {
  color: green !important;
}
.red {
  color: red;
}
.enter {
  margin-top: 20px;
}
.enter div {
  width: 130px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  text-align: center;
  background-color: #ccc;
  border-radius: 10px;
}
</style>