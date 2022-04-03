<script setup></script>

<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
  .loader {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    width: 100px;
    height: 100px;
    border: 5px solid hsl(160, 100%, 37%);
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>