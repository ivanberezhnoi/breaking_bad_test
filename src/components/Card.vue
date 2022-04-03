<script setup>
import { RouterLink } from 'vue-router';

const { link } = defineProps({
  link: String,
});
</script>

<template>
  <RouterLink :to="link" class="card">
    <slot name="content"></slot>
  </RouterLink>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 100px;
  min-width: 100px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
}

.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
