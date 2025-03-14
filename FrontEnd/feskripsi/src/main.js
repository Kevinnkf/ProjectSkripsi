import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/tailwind.css';

const app = createApp(App);
app.use(router); // Apply router correctly
app.mount('#app'); // Mount once
