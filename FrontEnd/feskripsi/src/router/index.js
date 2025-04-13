import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/BaseKnowledge/Index.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Auth/Login.vue'
import Admins from '@/components/Admins/IndexAdmin.vue'
import Chatbot from '@/components/Chatbot.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import BlankLayout from '@/Layout/BlankLayout.vue'

const routes = [
  { path: '/', redirect: '/dashboard', requiresAuth: true },
  { path: '/login', name: 'login', component: Login, meta: { layout: BlankLayout } },
  { path: '/base-knowledge', component: Index, meta: { layout: DefaultLayout, requiresAuth: true } },
  { path: '/dashboard', component: Dashboard, meta: { layout: DefaultLayout, requiresAuth: true } },
  { path: '/admins', component: Admins, meta: { layout: DefaultLayout, requiresAuth: true } },
  { path: '/chatbot', component: Chatbot, meta: { layout: BlankLayout } },
  { path: '/:pathMatch(.*)*', component: Dashboard }, // Catch-all (optional)
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is logged in (this example uses localStorage)
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      // Store the original route the user tried to access
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Handle redirection after login
router.afterEach((to) => {
  if (to.name === 'login' && to.query.redirect) {
    // Redirect to the page user originally tried to access after successful login
    // You'll need to handle the redirection logic inside your Login component
    const redirectPath = to.query.redirect;
    // Store the redirect path and use it after successful login
    localStorage.setItem('redirectPath', redirectPath);
  }
});

export default router;
