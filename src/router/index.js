import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

router.beforeEach(async to => {
  if (store.state.token && store.state.userInfo.role) {
    if (to.path === "/login") {
      return "/home";
    } else {
      routes.forEach(route => {
        if (hasPermission(route)) {
          if (!router.hasRoute(route.name)) {
            router.addRoute(route);
          }
        } else if (router.hasRoute(route.name)) {
          router.removeRoute(route.name);
        }
      });
    }
  } else if (to.path !== "/login") {
    return "/login";
  }
});

function hasPermission(route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role =>
      store.state.userInfo.role.includes(role)
    );
  } else {
    return true;
  }
}

export default router;
