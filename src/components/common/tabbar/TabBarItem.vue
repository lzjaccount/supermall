<template>
  <div class="tabbar-item" @click="itemclick">
    <div v-if="!isActive"><slot name="tab-icon"></slot></div>
    <div v-else><slot name="tab-icon-active"></slot></div>
    <div :style="text_style"><slot name="tab-text"></slot></div>
    <!-- <img src="../../assets/img/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  computed: {
    isActive() {
      return this.$route.path == this.path;
    },
    text_style() {
      return this.isActive ? { color: this.font_color } : {};
    },
  },
  props: {
    path: String,
    font_color: {
      type: String,
      default: "deeppink",
    },
  },
  methods: {
    itemclick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style>
.tabbar-item {
  flex: 1;
}
.tabbar-item img {
  width: 24px;
  vertical-align: middle;
  margin-top: 3px;
}
</style>