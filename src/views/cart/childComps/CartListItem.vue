<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick" :checked="good.checked" />
    </div>
    <div class="item-img">
      <img :src="good.imgURL" alt="" />
    </div>
    <div class="item-title">
      <div class="title1">{{ good.title }}</div>
      <div class="desc">商品描述: {{ good.desc }}</div>
      <div class="bottom">
        <div class="price">￥{{ good.newPrice }}</div>
        <div class="count">x{{ good.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      //修改状态
      this.good.checked = !this.good.checked;
      //每次点击都判断是否全部的按钮是选中状态，是就把全选按钮选中
      let isAllCheck = this.$store.state.goods.some((item) => {
        return item.checked == false;
      });
      //console.log(isAllCheck);
      if (!isAllCheck) {
        this.$store.commit("changeAllCheck", true);
      } else {
        this.$store.commit("changeAllCheck", false);
      }
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
.item-img {
  width: 20%;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 10px;
}
.item-title {
  padding: 0 5px 0 10px;
  overflow: hidden;
}
.title1,
.desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title1 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
.desc {
  margin-bottom: 20px;
}
.price {
  font-size: 20px;
  float: left;
  color: rgb(255, 106, 0);
}
.count {
  float: right;
  font-size: 20px;
  color: #000;
}
</style>