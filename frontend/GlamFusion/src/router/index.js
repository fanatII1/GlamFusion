import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authentication';
import {auth} from '../../firebase'
import { onAuthStateChanged } from "firebase/auth";

// const authStore = useAuthStore();
// console.log(authStore.user, authStore.loginState)

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
      component: () => import('../views/AuthView.vue'),
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
      component: () => import('../views/DashboardHomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/bookings',
      name: 'dashboard-bookings',
      component: () => import('../views/DashboardBookingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/services',
      name: 'dashboard-services',
      component: () => import('../views/DashboardServicesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/profile',
      name: 'dashboard-profile',
      component: () => import('../views/DashboardProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-onboarding',
      name: 'dashboard-onboarding',
      component: () => import('../views/OnboardingView.vue'),
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to a login page
    console.log('Not authenticated, redirecting to /auth');
    next('/auth');
  } else {
    // Otherwise, allow the navigation to proceed
    next();
  }
});


export default router
