<script setup>
import { inject, computed, defineProps } from 'vue';
import Card from './Card.vue';
const { mutations, getters } = inject('store');

const { character } = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const toggleFavorites = () => {
  mutations.toggleFavorites(character.char_id);
};
const isInFavorite = computed(() => {
  return !!getters.getFavoriteCharacters().some(({ char_id }) => char_id === character.char_id);
});

const { img, name } = character;
</script>

<template>
  <div class="character-card">
    <Card :link="`/character/${character.char_id}`">
      <template #content>
        <span class="character-card__favorites" @click.prevent="toggleFavorites">
          {{isInFavorite ? 'В избранном' : 'Добавить в избранные'}}
        </span>
        <div class="character-card__image">
          <img :src="img" alt="name" />
        </div>
        <h3>{{ name }}</h3>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.character-card {
  cursor: pointer;
}

.character-card__image {
  max-height: 350px;
  overflow: hidden;
}

.character-card__favorites {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 5px;
  background: #fff;
  border-radius: 0 5px 0 5px;
  border: 1px solid #ccc;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
}

.character-card__favorites:hover {
  background: #ccc;
  color: #fff;
}

img {
  object-fit: contain;
  width: 100%;
}
</style>
