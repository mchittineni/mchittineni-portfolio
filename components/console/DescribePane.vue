<template>
  <section class="describe">
    <h3>{{ title }}</h3>
    <p v-if="meta" class="meta">{{ meta }}</p>
    <slot />
  </section>
</template>

<script setup>
  defineProps({
    title: { type: String, required: true },
    meta: { type: String, default: '' },
  })
</script>

<style scoped>
  .describe {
    margin-top: 0.9rem;
    border: 1px solid var(--border);
    border-left: 2px solid var(--accent);
    border-radius: 0 var(--radius-chrome) var(--radius-chrome) 0;
    background: var(--surface);
    padding: 1rem 1.15rem;
  }
  h3 {
    font-family: var(--mono);
    font-size: 0.85rem;
    color: var(--text);
    margin: 0 0 0.2rem;
  }
  .meta {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
    margin: 0 0 0.75rem;
  }
</style>
