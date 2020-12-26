import Vue from "vue";
import Router from "vue-router";
import Admin from "./routes/admin/Index.vue";
import Feedmap from "./routes/feedmap/Index.vue";
import Login from "./routes/login/Index.vue";
import ChgPassword from "./routes/login/chgpass/Index.vue";

// Route with router
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "FeedMap",
      alias: "/feedmap",
      component: Feedmap,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/login/chgpass",
      name: "change password",
      component: ChgPassword,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
  ],
});