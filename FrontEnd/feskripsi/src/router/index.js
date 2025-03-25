import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/BaseKnowledge/Index.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Auth/Login.vue'
import Admins from '@/components/Admins/IndexAdmin.vue'
import Chatbot from '@/components/Chatbot.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/base-knowledge', component: Index },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/admins', component: Admins },
  { path: '/chatbot', component: Chatbot },


  { path: '/:pathMatch(.*)*', component: Dashboard }, // Catch-all (optional)
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
