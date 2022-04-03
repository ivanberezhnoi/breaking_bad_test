<script setup>
import { inject, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import CharacterCard from '../components/CharacterCard.vue';
import Loader from '../components/Loader.vue';
const { getters, actions } = inject('store');

const { id } = defineProps({
  id: String,
});

const episode = ref({});
const characters = ref([]);
episode.value = getters.getEpisodeById(id) || {};

onMounted(async () => {
  if (!Object.keys(episode.value).length) {
    episode.value = await actions.getEpisodeById(id);
  }

  await actions.getCharactersByNames(episode.value.characters);
  characters.value = getters.getDetaledCharactersInfo(episode.value.characters);
});
</script>

<template>
  <div class="episode">
    <Loader v-if="!episode || !characters.length" />
    <template v-else>
      <RouterLink to="/episodes"> {{ '<-' }} Back to episodes list</RouterLink>
      <h3>Episode: {{ episode.title }}</h3>

      <div class="episode__characters">
        <CharacterCard v-for="char in characters" :key="char.char_id" :character="char" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.episode__characters {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 2rem;
}
</style>
