import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/compras',
    },
    {
      path: '/compras',
      name: 'compras',
      component: () => import('../views/AltaCompra.vue'),
    },
    {
      path: '/movimientos',
      name: 'movimientos',
      component: () => import('../views/MovimientosView.vue'),
    },
  ],
})

export default router
