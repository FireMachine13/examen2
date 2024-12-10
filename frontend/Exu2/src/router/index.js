import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ProductList from '../views/ProductList.vue';
import AdminPanel from '../views/AdminPanel.vue';
import PurchaseHistory from '../views/PurchaseHistory.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    
  },
  {
    path: '/history',
    name: 'PurchaseHistory',
    component: PurchaseHistory,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (to.meta.requiresAuth) {
    if (!user) {
      return next('/');
    }
    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      return next('/products'); // Redirige a productos si no tiene permiso
    }
  }
  next();
});

export default router;
