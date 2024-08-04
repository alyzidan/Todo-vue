import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TodoAppView from "../views/TodoAppView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: TodoAppView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
