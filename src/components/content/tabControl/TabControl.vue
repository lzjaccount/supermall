<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      @click="itemclick(index)"
      :class="{ isactive: index == currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      //向父组件发射事件传输数据
      this.$emit("tabClick", index);
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
span {
  padding: 5px;
}
.isactive {
  color: var(--color-tint);
}
.isactive span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>