import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { lazyLoadComponent } from '../views/ImportUtils'
import { Dashboard, BoardConfig, CategoryConfig, DatasetConfig, DatasourceConfig, WidgetConfig } from 'xcom-cboard'
const cboard = () => import(/* webpackChunkName: "cboard" */ '../views/cboard.vue')
const Echarts = () => import(/* webpackChunkName: "charts" */ '../views/Echarts.vue')
const Echarts2 = () => import(/* webpackChunkName: "charts2" */ '../views/Echarts2.vue')
const EchartsMap = () => import(/* webpackChunkName: "chartsmap" */ '../views/EchartsMap.vue')
// import JobDefination from '../views/JobDefination'
// const about2 = Promise.resolve(about)
// const about2 = new Promise((resolve, reject) => {
//   resolve(about())
//   // about.then((value) => {
//   //   resolve(value)
//   // })
// })

// async function lazyLoadComponent (componentName) {
//   const allComps = await import(/* webpackChunkName: "about" */ '../views/AboutGraphIndex')
//   return allComps[componentName]
// }
const echarts = () => import(/* webpackChunkName: "charts3" */ 'echarts')
const Graph = () => lazyLoadComponent('JobDefination')

Vue.use(VueRouter)

const routes = [
  {
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
    component: () => lazyLoadComponent('About')
  },
  {
    path: '/graph',
    name: 'Graph',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Graph
  },
  {
    path: '/charts',
    name: 'Echarts',
    component: Echarts
  },
  {
    path: '/charts2',
    name: 'Echarts2',
    component: Echarts2
  },
  {
    path: '/charts3',
    name: 'Echarts3',
    component: echarts
  },
  {
    path: '/echartsmap',
    name: 'EchartsMap',
    component: EchartsMap
  },
  {
    path: '/dashboard/:name/:id',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/config/board',
    name: 'BoardConfig',
    component: BoardConfig
  },
  {
    path: '/config/category',
    name: 'CategoryConfig',
    component: CategoryConfig
  },
  {
    path: '/config/dataset',
    name: 'DatasetConfig',
    component: DatasetConfig
  },
  {
    path: '/config/datasource',
    name: 'DatasourceConfig',
    component: DatasourceConfig
  },
  {
    path: '/config/widget',
    name: 'WidgetConfig',
    component: WidgetConfig
  },
  {
    path: '/cboard',
    name: 'cboard',
    component: cboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
