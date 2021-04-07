<template>
  <div class="hello">
<p style="font-size:26px;font-weight:700;color:#409eff;text-align:center;width:100px;margin:10px">
  <i @click="changeCollapse(isCollapse)" :class="isCollapse == true ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
</p>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-menu-item index="0">
    <i class="el-icon-truck"></i>
    <span slot="title">废品管理</span>
  </el-menu-item>
  <el-menu-item index="1">
    <i class="el-icon-document"></i>
    <span slot="title">文章管理</span>
  </el-menu-item>
    <el-menu-item index="2">
    <i class="el-icon-user"></i>
    <span slot="title">用户管理</span>
  </el-menu-item>
</el-menu>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      changeCollapse(flag){
        this.isCollapse = !flag;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
