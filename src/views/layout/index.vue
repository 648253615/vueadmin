<template>
  <el-container direction="vertical">
    <Navbar @logout="logout" :userInfo="userInfo" />
    <el-container>
      <Sidebar :active="$route.path" :menus="menus" />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    menus() {
      const menus = [];
      this.$router.getRoutes().forEach(route => {
        if (route.meta && route.meta.title) {
          if (route.path.split("/").length === 2) {
            const children = [];
            route.children.forEach(routeItem => {
              if (routeItem.meta && routeItem.meta.title) {
                children.push({
                  index: route.path + "/" + routeItem.path,
                  title: routeItem.meta.title
                });
              }
            });
            menus.push({
              children,
              index: route.path,
              title: route.meta.title
            });
          }
        }
      });
      return menus;
    }
  },
  methods: {
    async logout() {
      const res = await this.$store.dispatch("logout");
      this.$message({
        message: res.message,
        type: res.code === 0 ? "success" : "error"
      });
      if (res.code === 0) {
        this.$router.replace("/login");
      }
    }
  }
};
</script>

<style lang="scss">
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
.el-header__logo {
  padding: 15px;
  img {
    height: 100%;
  }
}
.el-header__nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    margin: 0 5px;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
    text-decoration: none;
  }
}
.el-aside {
  .el-menu {
    height: 100%;
  }
}
.el-main {
  background-color: #f6f6f6;
}
</style>
