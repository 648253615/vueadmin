<template>
  <el-header>
    <div class="el-header__logo">
      <img src="../../assets/logo.png" />
    </div>
    <div class="el-header__nav">
      <el-avatar
        :src="userInfo.avatar"
        icon="el-icon-user-solid"
        size="small"
      />
      <a href="javascript:;">{{ userInfo.username }}</a>
      <a href="javascript:;" @click="$emit('logout')">退出</a>
    </div>
  </el-header>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
