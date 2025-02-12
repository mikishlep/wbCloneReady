import { createRouter, createWebHistory } from 'vue-router';
import Products from '../src/views/Products.vue';
import AddProduct from '../src/views/AddProduct.vue';
import addCategory from "../src/components/addCategory.vue";
import TestView from "../src/views/TestView.vue";

const routes = [
  { path: '/', component: TestView },
  { path: '/add-product', component: AddProduct },
  { path: '/add-category', component: addCategory },
  { path: '/products', component: Products },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;