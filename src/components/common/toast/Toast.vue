<template>
  <div class="toast" v-show="isShow">
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // isShow: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, time = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, time);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 4px;
  z-index: 999;
}
</style>