<template>
  <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
  </div>
</template>
<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  background-color: lightblue;
  text-align: center;
  font-weight: bold;
  i {
    position: absolute;
    left: 10px;
    font-size: 20px;
    font-weight: normal;
  }
}
</style>

