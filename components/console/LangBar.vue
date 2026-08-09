<template>
  <div class="langbar" role="img" :aria-label="summary">
    <span
      v-for="lang in languages"
      :key="lang.name"
      :style="{ width: lang.percentage + '%', background: langColors[lang.name] || '#818cf8' }"
    ></span>
  </div>
</template>

<script setup>
  import { langColors } from '~/content'

  const props = defineProps({
    languages: { type: Array, required: true },
  })

  const summary = computed(() => props.languages.map(l => `${l.name} ${l.percentage}%`).join(', '))
</script>

<style scoped>
  .langbar {
    display: flex;
    height: 5px;
    min-width: 7rem;
    border-radius: 3px;
    overflow: hidden;
    background: var(--border);
  }
  .langbar span {
    display: block;
    height: 100%;
  }
</style>
