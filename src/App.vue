<script setup>
import { provide, onBeforeMount } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import store from './store';

provide('store', store);

onBeforeMount(() => {
  store.actions.getAllEpisods();
  store.actions.getAllDeaths();
  const favorites = localStorage.getItem('favorites');
  store.mutations.setFavoriteCharacters(favorites ? JSON.parse(favorites) : []);
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/episodes">Episodes</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  padding: 2rem;
  font-weight: normal;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a,
button {
  text-decoration: none;
  color: var(--text-color);
  transition: 0.4s;
  padding: 0.5rem;
  display: inline-block;
}

@media (hover: hover) {
  a:hover,
  button:hover {
    background-color: hsla(160, 100%, 37%, 0.2) !important;
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  min-width: 150px;
}

nav a {
  display: block;
}

a.router-link-exact-active,
button.active {
  color: hsla(160, 100%, 37%, 1);
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
}

a.router-link-exact-active:hover,
button.active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }

  #app {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1.5rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
