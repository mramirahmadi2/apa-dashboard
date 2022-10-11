import Vue from "vue";
import VueRouter from "vue-router";
import UserManagement from "../views/UserManagement/UserManagement.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserManagement",
    component: UserManagement,
  },
  {
    path: "/ManageUserFiles",
    name: "ManageUserFiles",
    component: () => import("../views/ManageUserFiles.vue"),
  },
  {
    path: "/ManageUserGroups",
    name: "ManageUserGroups",
    component: () => import("../views/UserGroup/ManageUserGroups.vue"),
  },
 
];

const router = new VueRouter({
  routes,
});

export default router;
