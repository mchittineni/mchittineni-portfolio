<template>
  <div class="bare-root">
    <slot />
    <ModeSwitcher />
  </div>
</template>

<style scoped>
  /* Console and terminal own the full viewport — no marketing chrome. */
  .bare-root {
    min-height: 100vh;
  }
</style>
