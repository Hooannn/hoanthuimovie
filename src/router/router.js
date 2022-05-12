import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/HomeView.vue'),
    children:[
      {
        path: '/:type/:page',
        name: 'movie-view',
        component: () => import('@/views/Home/MovieView.vue'),
      },
      {
        path: '/movie/:id',
        name: 'movie-detail',
        component: () => import('@/views/Home/Movies/MovieDetailView.vue'),
      }
    ]
  },
  {
    path: "*",
    name: "error",
    component: () => import('../ErrorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
