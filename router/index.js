import { createRouter, createWebHistory } from 'vue-router';
import Products from '../src/views/Products.vue';
import AddProduct from '../src/views/AddProduct.vue';
import addCategory from "../src/components/addCategory.vue";
import TestView from "../src/views/TestView.vue";
import Login from "../src/views/Login.vue";

const routes = [
  { path: '/', component: TestView, meta: { requiresAuth: true } },
  { path: '/add-product', component: AddProduct, meta: { requiresAuth: true } },
  // Добавляем флаг requiresAdmin для маршрута /add-category
  { path: '/add-category', component: addCategory, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('token_expiration');
  const now = Date.now();

  // Проверяем, если токен есть, но срок его действия истёк
  if (token && tokenExpiration && now > parseInt(tokenExpiration)) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('username');
  }

  // Если требуется авторизация, но токена нет — перенаправляем на /login
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else if (to.meta.requiresAdmin) {
    // Если требуется админский доступ, проверяем имя пользователя
    const username = localStorage.getItem('username');
    if (username === 'wbAdmin') {
      next();
    } else {
      // Если пользователь не админ, можно перенаправить его, например, на главную страницу
      next('/');
    }
  } else {
    next();
  }
});

export default router;