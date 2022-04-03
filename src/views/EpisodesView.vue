<script setup>
import { inject, onBeforeMount, ref, computed } from 'vue';
import Loader from '../components/Loader.vue';
import EpisodeCard from '../components/EpisodeCard.vue';
const { state, getters } = inject('store');

const currentSeason = ref(1),
  setSeason = season => (currentSeason.value = season);

const episodesPerSeason = computed(() => state.episodes.filter(episode => +episode.season === currentSeason.value));
</script>

<template>
  <div class="episodes">
    <h1>EPISODES</h1>
    <Loader v-if="state.isLoading" />

    <template v-else>
      <ul class="episodes__seasones">
        <li v-for="season in getters.conutOfSeasons()">
          <button :class="{ active: season === currentSeason }" @click="setSeason(season)">Сезон {{ season }}</button>
        </li>
      </ul>

      <div class="episodes__list">
        <EpisodeCard v-for="episode in episodesPerSeason" :key="episode.episode_id" :episode="episode" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.episodes {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.episodes__list {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 2rem;
}
.episodes__seasones {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.episodes__seasones li {
  display: inline-block;
  margin: 0 1rem;
}

.episodes__seasones li button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.episodes__seasones li button.active {
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}
</style>
