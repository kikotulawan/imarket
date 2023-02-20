import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
 {
  path: "/",
  name: "login",
  meta: { hasUser: true },
  component: () => import(/* webpackChunkName: 'login' */ "../views/SignIn.vue"),
 },
 {
  path: "/home",
  name: "home",
  meta: { requiresAuth: true },
  component: () => import(/* webpackChunkName: 'home' */ "../views/Home.vue"),
 },
 {
  path: "/order-details/:id",
  name: "order-details",
  meta: { requiresAuth: true },
  component: () => import(/* webpackChunkName: 'order-details' */ "../views/OrderDetails.vue"),
 },
 {
  path: "/order-accepted/:id",
  name: "order-accepted",
  meta: { requiresAuth: true },
  component: () => import(/* webpackChunkName: 'order-accepted' */ "../views/OrderAccepted.vue"),
 },
 {
  path: "/order-completed/:id",
  name: "order-completed",
  meta: { requiresAuth: true },
  component: () => import(/* webpackChunkName: 'order-completed' */ "../views/OrderCompleted.vue"),
 },
];

const router = new VueRouter({
 mode: "history",
 base: process.env.BASE_URL,
 routes,
 scrollBehavior(to, from, savedPosition) {
  return { top: 0, left: 0, behavior: "smooth" };
 },
});

router.beforeEach((to, from, next) => {
 if (to.matched.some((record) => record.meta.requiresAuth) && !localStorage.getItem("auth")) {
  next({ name: "login" });
 } else if (to.matched.some((record) => record.meta.hasUser) && localStorage.getItem("auth")) {
  next({ name: "home" });
 } else {
  next();
 }
});

export default router;
