import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/services/:id',
      component: () => import('../views/StoresView.vue'),
    },
    {
      path: "/services/:id/:store",
      props: route => ({store: route.query.store, location: route.query.location}),
      component: () => import('../views/ServiceStoreView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/ServicesView.vue')
    },   
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/dashboard/home',
      name: 'dashboard-home',
      component: () => import('../views/DashboardHomeView.vue')
    },
    {
      path: '/dashboard/bookings',
      name: 'dashboard-bookings',
      component: () => import('../views/DashboardBookingsView.vue')
    },
    {
      path: '/dashboard/services',
      name: 'dashboard-services',
      component: () => import('../views/DashboardServicesView.vue')
    },
    {
      path: '/dashboard/profile',
      name: 'dashboard-profile',
      component: () => import('../views/DashboardProfileView.vue')
    },
    {
      path: '/dashboard-onboarding',
      name: 'dashboard-onboarding',
      component: () => import('../views/OnboardingView.vue')
    }
  ]
})

export default router
