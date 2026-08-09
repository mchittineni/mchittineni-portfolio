<template>
  <div class="switcher">
    <Transition name="pop">
      <ul v-if="open" class="menu" role="menu" aria-label="Interfaces">
        <li v-for="m in modes" :key="m.key">
          <NuxtLink
            :to="m.path"
            role="menuitem"
            :class="['item', { on: m.key === current }]"
            :aria-current="m.key === current ? 'page' : undefined"
            @click="open = false"
          >
            <span class="icon" aria-hidden="true">{{ m.icon }}</span>
            <span>
              <span class="label">{{ m.label }}</span>
              <span class="blurb">{{ m.blurb }}</span>
            </span>
          </NuxtLink>
        </li>
        <li class="divider" role="separator"></li>
        <li>
          <NuxtLink
            :to="chooser.path"
            role="menuitem"
            :class="['item', 'all', { on: current === chooser.key }]"
            @click="open = false"
          >
            <span class="icon" aria-hidden="true">{{ chooser.icon }}</span>
            <span class="label">{{ chooser.label }}</span>
          </NuxtLink>
        </li>
        <li class="divider" role="separator"></li>
        <li class="themes">
          <span class="themes-label">Theme</span>
          <span class="segmented">
            <button
              v-for="opt in themeOptions"
              :key="opt.value"
              :class="['seg', { on: opt.value === choice }]"
              :aria-pressed="opt.value === choice"
              :title="opt.label"
              @click="setTheme(opt.value)"
            >
              <span aria-hidden="true">{{ opt.icon }}</span>
              <span class="seg-label">{{ opt.label }}</span>
            </button>
          </span>
        </li>
      </ul>
    </Transition>

    <button
      class="trigger"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="`Switch interface — currently ${meta.label}`"
      @click="open = !open"
    >
      <span class="icon" aria-hidden="true">{{ meta.icon }}</span>
      <span class="current">{{ meta.label }}</span>
      <span class="chev" aria-hidden="true">{{ open ? '▾' : '▴' }}</span>
    </button>
  </div>
</template>

<script setup>
  const { current, meta, modes, chooser } = useMode()
  const { choice, set: setTheme, options: themeOptions } = useTheme()
  const open = ref(false)
  const route = useRoute()

  watch(
    () => route.path,
    () => (open.value = false)
  )

  function onKeydown(e) {
    if (e.key === 'Escape') open.value = false
  }
  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
  .switcher {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 90;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--accent-2);
    background: var(--elevated);
    border: 1px solid var(--accent-2);
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 10px 30px -12px rgba(34, 211, 238, 0.5);
    transition:
      transform 0.2s ease,
      box-shadow 0.25s ease;
  }
  .trigger:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px -14px rgba(34, 211, 238, 0.65);
  }
  .chev {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  .menu {
    list-style: none;
    margin: 0;
    padding: 0.35rem;
    width: min(20rem, calc(100vw - 3rem));
    max-height: 60vh;
    overflow-y: auto;
    background: var(--bg-soft);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-card);
  }
  .item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.55rem 0.6rem;
    border-radius: 6px;
    text-decoration: none;
    color: var(--text-soft);
  }
  .item:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .item.on {
    background: rgba(129, 140, 248, 0.13);
    color: var(--accent);
  }
  .icon {
    font-family: var(--mono);
    width: 1.3rem;
    text-align: center;
    flex-shrink: 0;
  }
  .label {
    display: block;
    font-weight: 650;
    font-size: 0.9rem;
  }
  .blurb {
    display: block;
    font-size: 0.76rem;
    color: var(--text-dim);
    line-height: 1.4;
  }

  /* Single-line row: the chooser needs no blurb, so keep it aligned centre. */
  .all {
    align-items: center;
  }
  .all .label {
    font-weight: 600;
    font-size: 0.85rem;
  }

  .divider {
    height: 1px;
    margin: 0.35rem 0.25rem;
    background: var(--border);
  }
  .themes {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem 0.4rem;
  }
  .themes-label {
    font-family: var(--mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-dim);
  }
  .segmented {
    display: flex;
    margin-left: auto;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
  }
  .seg {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.6rem;
    background: transparent;
    border: 0;
    color: var(--text-dim);
    font-size: 0.75rem;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }
  .seg + .seg {
    border-left: 1px solid var(--border);
  }
  .seg:hover {
    color: var(--text);
    background: var(--surface-2);
  }
  .seg.on {
    background: var(--accent);
    color: var(--on-accent);
  }
  .seg-label {
    font-size: 0.72rem;
  }

  .pop-enter-active,
  .pop-leave-active {
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
  .pop-enter-from,
  .pop-leave-to {
    opacity: 0;
    transform: translateY(6px);
  }

  @media (max-width: 640px) {
    .switcher {
      right: 1rem;
      bottom: 1rem;
    }
    .current {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .trigger:hover {
      transform: none;
    }
  }
</style>
