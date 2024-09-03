import AppLayout from '@/layouts/AppLayout.vue';
import AboutView from '@/views/AboutView.vue';
import ExampleFormPreQ from '@/views/ExampleFormPreQ.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'New Template',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView,
        },
        {
          path: '/about',
          name: 'About',
          component: AboutView,
        },
        {
          path: '/form-preq',
          name: 'Example Form PreQ',
          component: ExampleFormPreQ,
        },
        {
          path: '/test',
          name: 'test',
          component: import('@/views/Test.vue'),
        },
      ],
    },
  ],
});

export default router;
