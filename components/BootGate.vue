<template>
  <Transition name="boot">
    <div v-if="open" class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div class="gate-card">
        <p class="eyebrow">Six ways in</p>
        <h2 id="gate-title">Manideep<span class="text-gradient"> Chittineni</span></h2>
        <p class="lede">
          The same career, rendered six ways. Pick one — you can switch at any time from the
          floating button.
        </p>

        <div class="grid">
          <button v-for="m in modes" :key="m.key" class="choice" @click="choose(m)">
            <span class="icon" aria-hidden="true">{{ m.icon }}</span>
            <span class="label">{{ m.label }}</span>
            <span class="blurb">{{ m.blurb }}</span>
          </button>
        </div>

        <button class="skip" @click="dismiss">Stay on the portfolio</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const { current, modes, hasChosen, markChosen } = useMode()
  const router = useRouter()
  const open = ref(false)

  function dismiss() {
    markChosen()
    open.value = false
  }

  function choose(mode) {
    markChosen()
    open.value = false
    if (mode.key !== 'portfolio') router.push(mode.path)
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && open.value) dismiss()
  }

  onMounted(() => {
    // Client-only and first-visit-only: the prerendered HTML never contains it,
    // so the gate costs nothing in crawlability or first paint.
    //
    // It only ever appears on "/". Arriving straight at /terminal or /console is
    // itself a choice — overlaying a chooser on the interface someone asked for
    // blocks it (the terminal input sits under it and cannot be typed into).
    if (current.value !== 'portfolio') {
      markChosen()
    } else if (!hasChosen()) {
      open.value = true
    }
    window.addEventListener('keydown', onKeydown)
  })
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
  .gate {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: var(--overlay);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    overflow-y: auto;
  }

  .gate-card {
    width: 100%;
    max-width: 46rem;
    background: var(--bg-soft);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    padding: 2.25rem;
    text-align: center;
    box-shadow: var(--shadow-card);
  }

  h2 {
    font-size: clamp(1.6rem, 1.2rem + 2vw, 2.3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .lede {
    color: var(--text-soft);
    margin: 0.75rem auto 0;
    max-width: 32rem;
    font-size: 0.95rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.7rem;
    margin: 1.75rem 0 1.25rem;
  }

  .choice {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem;
    text-align: left;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }
  .choice:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    background: var(--surface-2);
  }
  .icon {
    font-family: var(--mono);
    font-size: 1.2rem;
    color: var(--accent-2);
  }
  .label {
    font-weight: 700;
    font-size: 0.98rem;
  }
  .blurb {
    font-size: 0.8rem;
    color: var(--text-dim);
    line-height: 1.45;
  }

  .skip {
    background: transparent;
    border: 0;
    color: var(--text-dim);
    font-size: 0.85rem;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .skip:hover {
    color: var(--text);
  }

  .boot-enter-active,
  .boot-leave-active {
    transition: opacity 0.3s ease;
  }
  .boot-enter-from,
  .boot-leave-to {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .choice:hover {
      transform: none;
    }
  }
</style>
