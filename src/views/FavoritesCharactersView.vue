<script setup>
import { inject, onMounted, ref } from 'vue';
import CharacterCard from '../components/CharacterCard.vue';
import Loader from '../components/Loader.vue';
const { getters, state, actions } = inject('store');

onMounted(async () => {
  if (!getters.getFavoriteCharacters().length) {
    const chars = state.favoritesCharacters.map(async id => {
      return actions.getCharactersById(id);
    });
    await Promise.all(chars);
  }
});
</script>

<template>
  <div class="favorites">
    <h1>FAVORITES CHARACTERS</h1>
    <Loader v-if="state.isLoading" />
    <div v-else class="favorites__list">
      <CharacterCard v-for="char in getters.getFavoriteCharacters()" :key="char.char_id" :character="char" />
    </div>
  </div>
</template>

<style>
.favorites__list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 2rem;
}
</style>
