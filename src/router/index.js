import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
const ProductDetailPage = () => import('../views/ProductDetailPage.vue')
const CartPage = () => import('../views/CartPage.vue')
const ShopPage = () => import('../views/ShopPage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
})

export default router
