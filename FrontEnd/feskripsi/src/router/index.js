import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/components/BaseKnowledge/Index.vue';
import Dashboard from '@/components/Dashboard.vue';


const routes = [
  { path: '/', redirect: "/dashboard"},
  { path: '/base-knowledge', component: Index},
  { path: '/dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', component: Dashboard }, // Catch-all (optional)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
