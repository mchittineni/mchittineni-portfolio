<template>
  <div class="terminal-page">
    <div class="window">
      <div class="titlebar">
        <span class="dot red"></span>
        <span class="dot amber"></span>
        <span class="dot green"></span>
        <span class="title">manideep@control-plane: ~</span>
        <NuxtLink to="/" class="escape">portfolio ↗</NuxtLink>
      </div>

      <div ref="buffer" class="buffer" role="log" aria-live="polite" aria-label="Terminal output">
        <div
          v-for="line in lines"
          :key="line.id"
          :class="['line', line.tone, { 'line--pre': line.fixed }]"
        >
          {{ line.text }}
        </div>
      </div>

      <form class="inputline" @submit.prevent="onSubmit">
        <span class="prompt">manideep@control-plane:~$</span>
        <span class="input-field">
          <span class="ghost" aria-hidden="true"
            ><span class="ghost-typed">{{ input }}</span
            >{{ ghostRest }}</span
          >
          <input
            ref="entry"
            v-model="input"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            aria-label="Terminal input"
            @keydown.tab.prevent="complete"
            @keydown.up.prevent="previous"
            @keydown.down.prevent="next"
            @keydown.right="onRight"
          />
        </span>
        <span class="hint">↑↓ history · Tab complete</span>
      </form>
    </div>

    <noscript>
      <p class="fallback">
        The terminal needs JavaScript. Everything it reports is on the
        <a href="/">portfolio</a> and in the <a href="/console">console</a>.
      </p>
    </noscript>
  </div>
</template>

<script setup>
  definePageMeta({ layout: 'bare' })

  useSeoMeta({
    title: 'Terminal — Manideep Chittineni',
    description:
      'A shell over my portfolio: mc get deploy, mc describe, mc logs. History, tab completion and pipes included.',
    robots: 'index, follow',
  })
  useHead({
    link: [{ rel: 'canonical', href: 'https://mchittineni.github.io/mchittineni-portfolio/' }],
  })

  const {
    lines,
    input,
    ghost,
    ghostRest,
    banner,
    run,
    submit,
    complete,
    previous,
    next,
    acceptGhost,
  } = useShell()

  const buffer = ref(null)
  const entry = ref(null)
  const route = useRoute()

  const scrollToEnd = () =>
    nextTick(() => {
      if (buffer.value) buffer.value.scrollTop = buffer.value.scrollHeight
    })

  const onSubmit = () => {
    submit()
    scrollToEnd()
  }

  /** → accepts the inline suggestion, but only from the end of the line. */
  const onRight = event => {
    const el = event.target
    if (ghost.value && el.selectionStart === input.value.length) {
      event.preventDefault()
      acceptGhost()
    }
  }

  onMounted(() => {
    banner()
    // /terminal?c=get+deploy replays a command on load, so any view is linkable.
    const replay = route.query.c
    if (typeof replay === 'string' && replay.trim()) run(`mc ${replay.trim()}`)
    scrollToEnd()
    entry.value?.focus()
  })
</script>

<style scoped>
  .terminal-page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 1.5rem;
  }

  .window {
    width: 100%;
    max-width: 60rem;
    height: min(82vh, 46rem);
    display: flex;
    flex-direction: column;
    background: var(--bg-soft);
    border: 1px solid var(--border-strong);
    border-radius: 0.6rem;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.9rem;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red {
    background: var(--err);
  }
  .amber {
    background: var(--warn);
  }
  .green {
    background: var(--ok);
  }
  .title {
    margin-left: 0.5rem;
    font-family: var(--mono);
    font-size: 0.74rem;
    color: var(--text-dim);
  }
  .escape {
    margin-left: auto;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
    text-decoration: none;
  }
  .escape:hover {
    color: var(--accent-2);
  }

  .buffer {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    font-family: var(--mono);
    font-size: 0.82rem;
    line-height: 1.62;
  }
  .line {
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--text-soft);
  }
  .line--pre {
    white-space: pre;
    overflow-x: auto;
  }
  /* Tone classes stay bound to .line so they cannot collide with the
     titlebar's .title or the input row's .prompt. */
  .line.dim {
    color: var(--text-dim);
  }
  .line.error {
    color: var(--err);
  }
  .line.warn {
    color: var(--warn);
  }
  .line.accent {
    color: var(--accent-2);
  }
  .line.prompt {
    color: var(--ok);
  }
  .line.title {
    color: var(--text);
  }

  .inputline {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 0.9rem;
    border-top: 1px solid var(--border);
    background: var(--sunken);
    flex-shrink: 0;
  }
  .inputline .prompt {
    font-family: var(--mono);
    font-size: 0.82rem;
    color: var(--ok);
    white-space: nowrap;
  }
  .input-field {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
  }
  .ghost-typed {
    color: transparent;
  }
  .ghost {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
    font-family: var(--mono);
    font-size: 0.82rem;
    color: var(--text-dim);
    white-space: pre;
    overflow: hidden;
  }
  .input-field input {
    position: relative;
    width: 100%;
    background: transparent;
    border: 0;
    outline: none;
    padding: 0;
    font-family: var(--mono);
    font-size: 0.82rem;
    color: var(--text);
    caret-color: var(--ok);
  }
  .hint {
    font-family: var(--mono);
    font-size: 0.66rem;
    color: var(--text-dim);
    white-space: nowrap;
  }
  .fallback {
    color: var(--text-soft);
    text-align: center;
  }

  @media (max-width: 640px) {
    .terminal-page {
      padding: 0.75rem;
    }
    .hint {
      display: none;
    }
  }
</style>
