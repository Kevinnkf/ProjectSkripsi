import { createRouter, createWebHistory } from 'vue-router';
import Chatbot from '../components/Chatbot.vue';

const routes = [
  { path: '/', component: Chatbot }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
