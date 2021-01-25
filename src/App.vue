<template>
  <router-view />
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #b4c7d0;
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 5px;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  color: #303133;
  background-color: #fff;
}
.el-card {
  .el-table {
    .el-avatar {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  .el-drawer__body {
    display: flex;
    flex-direction: column;
  }
  .el-drawer__form {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
  .el-drawer__foot {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-top: 1px solid #eee;
    .el-button {
      width: 49%;
    }
  }
}
</style>
