import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path: "",
    redirect: "/Home",

  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/needserve',
    name: 'needserve',
    component: () => import('../views/needserve/index.vue')
  },
  {
    path: '/addemand',
    name: 'addemand',
    component: () => import('../views/needserve/addemand')
  },
  //需求服务详情页面未认领
  {
    path: '/detailpage',
    name: 'detailpage',
    component: () => import('../views/needserve/detailpage')
  },
  //需求服务详情页面已认领
  {
    path: '/accepted',
    name: 'accepted',
    component: () => import('../views/needserve/accepted'),
  },
  //需求服务详情页面待确认
  {
    path: '/tobeconfirmed',
    name: 'tobeconfirmed',
 
    component: () => import('../views/needserve/tobeconfirmed')
  },
  //积分排行页面
  {
    path: '/integrallist',
    name: 'integrallist',
    component: () => import('../views/integrallist/index.vue')
  },
  //积分排行页面详情
  {
    path: '/intdetail',
    name: 'intdetail',
    component: () => import('../views/integrallist/intdetail/index.vue')
  },
  //问卷征集首页
  {
    path: '/questionnairesurvey',
    name: 'questionnairesurvey',
    component: () => import('../views/questionnairesurvey')
  },
  //问卷征集详情页
  {
    path: '/questdetail',
    name: 'questdetail',
    component: () => import('../views/questionnairesurvey/questdetail')
  },
  //问卷统计首页
  {
    path: '/questionstatistics',
    name: 'questionstatistics',
    component: () => import('../views/questionstatistics')
  },
  //问卷统计详情
  {
    path: '/statisticsdetail',
    name: 'statisticsdetail',
    component: () => import('../views/questionstatistics/statisticsdetail/index.vue')
  },
  //积分兑换首页
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('../views/shopping')
  },
  //积分兑换商品详情页
  {
    path: '/shoppingdetial',
    name: 'shoppingdetial',
    component: () => import('../views/shopping/shoppingdetial')
  },
  //积分兑换收货地址页面
  {
    path: '/sitepage',
    name: 'sitepage',
    component: () => import('../views/shopping/shoppingdetial/sitepage')
  },
  //志愿服务首页
  {
    path: "/volunteerserve",
    component: () => import("../views/volunteer/volunteerserve"),
  },
  //志愿服务详情页
  {
    path: "/volunteerserve_detial",
    component: () => import("../views/volunteer/volunteerserve/volunteerserve_detial/index.vue"),
  },
  //志愿服务发布活动
  {
    path: "/openserve",
    component: () => import("../views/volunteer/openserve/index.vue"),
  },
  //志愿服务活动人数
  {
    path: "/volpeoplist",
    component: () => import("../views/volunteer/volunteerserve/volunteerserve_detial/volpeoplist"),
  },
  //
  {
    path: "/somelist",
    component: () => import("../views/volunteer/volunteerserve/volunteerserve_detial/somelist/index.vue"),
  },
  //快捷签到
  {
    path: "/signin",
    component: () => import("../views/signin/index.vue"),
  },
  {
    path: "/signin_det",
    component: () => import("../views/signin/signin_det/index.vue"),
  },
  {
    path: "/signin_list",
    component: () => import("../views/signin/signin_list/index.vue"),
  },
  {
    path: "/punchSuccess",
    component: () => import("../views/signin/punchSuccess/index.vue"),
  },
  {
    path: "/error",
    component: () => import("../views/signin/error/index.vue"),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router