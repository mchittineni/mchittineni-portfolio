<template>
  <span :class="['pill', tone]">{{ label }}</span>
</template>

<script setup>
  defineProps({
    label: { type: String, required: true },
    tone: { type: String, default: 'ok' }, // ok | muted | warn | err
  })
</script>

<style scoped>
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    white-space: nowrap;
  }
  .pill::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
  .ok {
    color: var(--ok);
  }
  .muted {
    color: var(--text-dim);
  }
  .warn {
    color: var(--warn);
  }
  .err {
    color: var(--err);
  }
</style>
