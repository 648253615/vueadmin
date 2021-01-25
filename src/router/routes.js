import Layout from "@/views/layout";

const routes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index")
  },
  {
    name: "home",
    path: "/home",
    component: Layout,
    meta: {
      title: "处理中心"
    },
    children: [
      {
        path: "",
        component: () => import("@/views/home/index")
      }
    ]
  },
  {
    name: "system",
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "系统设置",
      roles: ["ADMIN"]
    },
    children: [
      {
        name: "user",
        path: "user",
        component: () => import("@/views/system/user/index"),
        meta: {
          title: "用户管理"
        }
      },
      {
        name: "role",
        path: "role",
        component: () => import("@/views/system/role/index"),
        meta: {
          title: "角色管理"
        }
      },
      {
        name: "permission",
        path: "permission",
        component: () => import("@/views/system/permission/index"),
        meta: {
          title: "权限管理"
        }
      }
    ]
  },
  {
    name: "404",
    path: "/:pathMatch(.*)",
    redirect: "/home"
  }
];

export default routes;
