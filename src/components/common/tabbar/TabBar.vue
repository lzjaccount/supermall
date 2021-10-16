<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background-color: #f6f6f6;
  text-align: center;
  box-shadow: 0px -1px 1px rgb(100, 100, 100, 0.2);
}
</style>