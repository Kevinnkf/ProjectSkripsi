import { createRouter, createWebHistory } from 'vue-router'
import BK from '@/components/BaseKnowledge/Index.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Auth/Login.vue'
import ChatHistory from '@/components/ChatHistory/IndexHistory.vue'
import Admins from '@/components/Admins/IndexAdmin.vue'
import Chatbot from '@/components/Chatbot.vue'
import FAQ from '@/components/FAQ/IndexFAQ.vue'
import Settings from '@/components/Auth/Settings.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import BlankLayout from '@/Layout/BlankLayout.vue'
import LandingPage from '@/components/Client/LandingPage.vue'

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { layout: 'blank' } },
  { path: '/dashboard', component: Dashboard, meta: { layout: 'default', requiresAuth: false } },
  { path: '/base-knowledge', component: BK, meta: { layout: 'default', requiresAuth: false } },
  { path: '/chat-history', component: ChatHistory, meta: { layout: 'default', requiresAuth: false } },
  { path: '/admins', component: Admins, meta: { layout: 'default', requiresAuth: false } },
  { path: '/faq', component: FAQ, meta: { layout: 'default', requiresAuth: false } },
  { path: '/settings', component: Settings, meta: { layout: 'default', requiresAuth: false } },
  { path: '/chatbot', component: Chatbot, meta: { layout: 'blank' } },
  { path: '/hero', component: LandingPage, meta: { layout: 'blank' } },

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
