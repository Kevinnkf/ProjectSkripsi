import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/BaseKnowledge/Index.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import Admins from '@/components/Admins/Admins.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/base-knowledge', component: Index },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/admins', component: Admins },

  { path: '/:pathMatch(.*)*', component: Dashboard }, // Catch-all (optional)
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
