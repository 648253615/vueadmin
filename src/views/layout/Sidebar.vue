<template>
  <el-aside width="200px">
    <el-menu :default-active="active" unique-opened router>
      <template v-for="menu in menus" :key="menu.index">
        <el-submenu :index="menu.index" v-if="menu.children.length">
          <template #title>{{ menu.title }}</template>
          <template v-for="menuItem in menu.children" :key="menuItem.index">
            <el-menu-item :index="menuItem.index">{{
              menuItem.title
            }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="menu.index" v-else>{{ menu.title }}</el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: ""
    },
    menus: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
