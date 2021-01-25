import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

router.beforeEach(async to => {
  if (store.state.token) {
    if (to.path === "/login") {
      return "/home";
    } else {
      router.options.routes.map((route, index) => {
        if (!hasPermission(route)) {
          router.removeRoute(route.name);
          router.options.routes.splice(index, 1);
        } else if (route.children) {
          route.children.map((routeItem, index) => {
            if (!hasPermission(routeItem)) {
              router.removeRoute(routeItem.name);
              route.children.splice(index, 1);
            }
          });
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
