import { createRouter, createWebHistory } from "vue-router";
// import Home from '../views/Home.vue'
// import Login from "../components/login.vue";
const Login = () => import("../components/login.vue");
const Home = () => import("../components/Home.vue");
const Welcome = () => import("../components/Welcome.vue");
const Users = () => import("../components/User/User.vue");
const routes = [
  /* {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( webpackChunkName: "about" '../views/About.vue')
  } */
  {
    path: "/",
    // 重定向
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome,
      },
      {
        path: "/users",
        component: Users,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 挂载路由导航守卫，如果用户通过url直接访问而不是通过登录页面访问，那我们就挂载一个路由守卫放回到登录页面
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从那个路劲跳转而来
  /* next 是一个函数 表示放行 next() 直接放行跳转 next('./login) 强制跳转到登录页面 */

  if (to.path === "/login") return next();
  // 获取token
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("./login");
  next();
});

export default router;
