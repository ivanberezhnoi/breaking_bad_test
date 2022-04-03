import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('../views/EpisodesView.vue'),
    },
    {
      path: `/episodes/:id`,
      props: true,
      name: `episode`,
      component: () => import('../views/EpisodeView.vue'),
    },
    {
      path: `/character/:id`,
      props: true,
      name: `character`,
      component: () => import('../views/CharacterView.vue'),
    },
    {
      path: `/favorites`,
      name: `favorites`,
      component: () => import('../views/FavoritesCharactersView.vue'),
    },
  ],
});

export default router;
