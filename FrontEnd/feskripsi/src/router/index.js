import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/BaseKnowledge/Index.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Auth/Login.vue'
import Admins from '@/components/Admins/IndexAdmin.vue'
import Chatbot from '@/components/Chatbot.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import BlankLayout from '@/Layout/BlankLayout.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/base-knowledge', component: Index , meta: {layout: DefaultLayout}},
  { path: '/dashboard', component: Dashboard , meta: {layout: DefaultLayout}},
  { path: '/login', component: Login, meta: {layout: BlankLayout }},
  { path: '/admins', component: Admins, meta: {layout: DefaultLayout}},
  { path: '/chatbot', component: Chatbot , meta: {layout: BlankLayout}},


  { path: '/:pathMatch(.*)*', component: Dashboard }, // Catch-all (optional)
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
