import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import("../views/Login"),
  },
  //用户端
  {
    path:"/login",
    component:()=>import("../views/Login"),
  },
  {
    path:"/register",
    component:()=>import("../views/Register"),
  },
  {
    path:"/",
    component:()=>import("../components/layout/Layout"),
    children:[
      {
        path:"/homepage",
        component:()=>import("../views/Homepage"),
      },
      {
        path:"/",
        component:()=>import("../views/film/Index"),
        children:[
          {
            path:"/detail",
            component:()=>import("../views/film/Detail"),
          },
          {
            path:"/ticket",
            component:()=>import("../views/film/Ticket"),
          },
        ],
      },
      {
        path:"/buy",
        component:()=>import("../views/Buy"),
      },
      {
        path:"/films",
        component:()=>import("../views/Films"),
      },
      {
        path:"/activity",
        component:()=>import("../views/Activity"),
      },
      {
        path:"/comments",
        component:()=>import("../views/Comments"),
      },
      {
        path:"/shoppingcart",
        component:()=>import("../views/ShoppingCart"),
      },
      {
        path:"/orders",
        component:()=>import("../views/Orders"),
      },
      {
        path:"/settings",
        component:()=>import("../views/Settings"),
      },
    ],
  },
  //客服端
  {
    path:"/login_worker",
    component:()=>import("../views/Login_worker"),
  },
  {
    path:"/worker",
    component:()=>import("../components/layout/Worker"),
    children:[
      {
        path:"/comments_worker",
        component:()=>import("../views/worker/Comments_worker"),
      },
      {
        path:"/events_worker",
        component:()=>import("../views/worker/Events_worker"),
      },
      {
        path:"/orders_worker",
        component:()=>import("../views/worker/Orders_worker"),
      },
      {
        path:"/assess_worker",
        component:()=>import("../views/worker/Assess_worker"),
      },
      {
        path:"/settings_worker",
        component:()=>import("../views/worker/Settings_worker"),
      },
    ],
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
