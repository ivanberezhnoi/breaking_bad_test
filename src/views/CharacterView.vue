<script setup>
import { inject, onMounted, ref, computed, defineProps } from 'vue';
import Loader from '../components/Loader.vue';
const { getters, actions } = inject('store');

const { id } = defineProps({
  id: String,
});

const character = ref(getters.getCharactersById(id));
const quotes = ref(getters.getQuotesByAuthorId(id));
const responsibleInDeaths = ref(getters.getResponsibleInDeathsByName(character.value?.name || ''));

const seasonsAppearanceString = computed(() => {
  if (!character.value) return '';
  return character.value.appearance.join(', ') || '';
});

const quotesString = computed(() => {
  if (!quotes.value) return '';
  return quotes.value.map(({ quote }) => quote).join(', ');
});

const responsibleInDeathsString = computed(() => {
  if (!responsibleInDeaths.value) return '';
  return responsibleInDeaths.value.map(({ death }) => death).join(', ');
});

onMounted(async () => {
  if (!character.value) {
    await actions.getCharactersById(id);
    character.value = getters.getCharactersById(id);
    responsibleInDeaths.value = getters.getResponsibleInDeathsByName(character.value.name);
  }
  if (!quotes.value) {
    await actions.getQuotesByAuthor(character.value.name, id);
    quotes.value = getters.getQuotesByAuthorId(id);
  }
});

const resultInfo = computed(() => ({
  Name: character.value?.name,
  Status: character.value?.status,
  Seasons: seasonsAppearanceString.value,
  Qoutes: quotesString.value || 'none',
  'Responsible in deaths': responsibleInDeathsString.value || 'none',
}));
</script>

<template>
  <div class="character">
    <Loader v-if="!character || !quotes" />
    <template v-else>
      <p v-for="[key, value] in Object.entries(resultInfo)">
        <span class="title">{{ key }}:</span> {{ value }}
      </p>
    </template>
  </div>
</template>

<style scoped>
.character {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
}
</style>
