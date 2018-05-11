<template>
  <div class="footer">
    <router-link to='/home'>
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
    </router-link>
    <router-link to='/list'>
        <i class="iconfont icon-yewubaobiao"></i>
        <span>列表</span>
    </router-link>
    <router-link to='/collect'>
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
    </router-link>
    <router-link to='/add'>
        <i class="iconfont icon-icon"></i>
        <span>添加</span>
    </router-link>
  </div>
</template>
<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 50px;
  border-top: 1px solid #ccc;
  a {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: blue;
    &.router-link-active {
      color: red;
    }
  }
}
</style>

