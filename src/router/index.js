import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import NProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '@/views/NotFound'
import NetworkError from '@/views/NetworkError'

const routes = [
  {
    path: '/',
    name: 'EventList',
    props: true,
    component: EventList,
  },
  {
    path: '/event/:id',
    props: true, // pass id as prop into the component
    name: 'EventDetails',
    component: () => import('@/views/EventDetails'),
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event
          next()
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'NetworkError' })
          }
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
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    props: true,
    component: NotFound,
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
