<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button
        @click.native="allCheck"
        :checked="$store.state.isAllCheck"
      />
      <span>全选</span>
    </div>
    <div class="price">合计：￥{{ allPrice }}</div>
    <div class="counter" @click="click">去计算({{ checkNum }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    allPrice() {
      return this.$store.state.goods
        .filter((item) => item.checked == true)
        .reduce((prevalue, value) => {
          return prevalue + value.newPrice * value.count;
        }, 0)
        .toFixed(2);
    },
    checkNum() {
      return this.$store.state.goods.filter((item) => item.checked == true)
        .length;
    },
  },
  methods: {
    allCheck() {
      //this.$store.state.isAllCheck = !this.$store.state.isAllCheck;
      this.$store.commit("changeAllCheck", !this.$store.state.isAllCheck);
      //点击全选按钮 统一修改其他按钮状态
      //   this.$store.state.goods.forEach((item) => {
      //     item.checked = this.$store.state.isAllCheck;
      //   });
      this.$store.commit("changeCheck", this.$store.state.isAllCheck);
    },
    click() {
      let a = this.$store.state.goods.some((item) => {
        return item.checked == true;
      });
      if (!a) {
        this.$toast.show("请选择商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 44px;
  background-color: #fff;
}
.check-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
}
.price {
  flex: 1;
  line-height: 44px;
  margin-left: 40px;
}
.counter {
  width: 120px;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 44px;
}
</style>