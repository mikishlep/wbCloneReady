import { createApp } from 'vue'
import './style.css'
import '../fonts/fonts.css'
import App from './App.vue'
import router from '../router';

const app = createApp(App);  // создаём приложение
app.use(router);  // подключаем роутер
app.mount('#app');  // монтируем приложение