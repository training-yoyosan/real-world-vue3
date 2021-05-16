import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    props: true, // pass id as prop into the component
    name: 'EventDetails',
    component: () => import('@/views/EventDetails'),
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
        routeTo.params.event = event
        next()
      })
    },
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: () => import('@/views/EventCreate'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
