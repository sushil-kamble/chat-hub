import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase/init.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue")
  },
  // PROTECTED PATH
  // For Protected Path include meta property as shown below.
  {
    path: "/chat/:id",
    name: "Chat",
    component: () => import(/* webpackChunkName: "chat" */ "../views/Chat.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/group",
    name: "Group",
    component: () =>
      import(/* webpackChunkName: "group" */ "../views/Group.vue"),
    meta: {
      requiresAuth: true
    }
  }
  // PROTECTED PATH
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next({ name: "Auth" });
  } else {
    next();
  }
});

export default router;
