import { createRouter, createWebHistory } from 'vue-router';
import Products from '../src/views/Products.vue';
import AddProduct from '../src/views/AddProduct.vue';
import addCategory from "../src/components/addCategory.vue";

const routes = [
  { path: '/', component: Products },
  { path: '/add-product', component: AddProduct },
  { path: '/add-category', component: addCategory }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;