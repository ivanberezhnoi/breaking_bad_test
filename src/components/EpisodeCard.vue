<script setup>
import Card from './Card.vue';

const { episode } = defineProps({
  episode: {
    type: Object,
    required: true,
  },
});

const { title, air_date, characters } = episode;
</script>

<template>
  <div class="episode-card">
    <Card :link="`/episodes/${episode.episode_id}`">
    <template #content>
      <h3>{{ title }}</h3>
      <p>Дата выхода: {{ air_date }}</p>
      <p>Персонажи:</p>
      <ul>
        <li v-for="character in characters">
          {{ character }}
        </li>
      </ul>
    </template>
  </Card>
  </div>
</template>

<style scoped>
.episode-card {
  cursor: pointer;
}
</style>