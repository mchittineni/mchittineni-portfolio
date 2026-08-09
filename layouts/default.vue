<template>
  <div class="app-root">
    <!-- Skip link for keyboard / screen-reader users -->
    <a href="#about" class="skip-link">Skip to content</a>

    <header :class="['nav', { 'nav--scrolled': scrolled }]">
      <div class="wrap nav__inner">
        <a href="#about" class="nav__brand" @click="closeMenu">
          <span class="nav__brand-mark">MC</span>
          <span class="nav__brand-text"
            >Manideep<span class="text-gradient"> Chittineni</span></span
          >
        </a>

        <nav class="nav__links" aria-label="Primary">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav__link">
            {{ item.label }}
          </a>
          <a
            :href="`${base}Manideep_Chittineni_Resume.pdf`"
            download
            class="btn btn-primary nav__cta"
          >
            Resume
          </a>
        </nav>

        <button
          class="nav__toggle"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <span :class="['nav__toggle-bar', { open: menuOpen }]"></span>
          <span :class="['nav__toggle-bar', { open: menuOpen }]"></span>
          <span :class="['nav__toggle-bar', { open: menuOpen }]"></span>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition name="slide">
        <nav v-show="menuOpen" id="mobile-menu" class="nav__mobile" aria-label="Mobile">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="nav__mobile-link"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
          <a
            :href="`${base}Manideep_Chittineni_Resume.pdf`"
            download
            class="btn btn-primary nav__mobile-cta"
            @click="closeMenu"
          >
            Download Resume
          </a>
        </nav>
      </transition>
    </header>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <div class="wrap footer__inner">
        <div>
          <a href="#about" class="footer__brand"
            >Manideep<span class="text-gradient"> Chittineni</span></a
          >
          <p class="footer__tag">Senior Platform, Cloud, DevOps &amp; AI Engineer</p>
        </div>

        <div class="footer__social">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="s.path" />
            </svg>
          </a>
        </div>
      </div>
      <div class="wrap footer__bottom">
        <p>&copy; {{ year }} Manideep Chittineni. All rights reserved.</p>
        <a href="#about" class="footer__top">Back to top ↑</a>
      </div>
    </footer>

    <ModeSwitcher />
  </div>
</template>

<script setup>
  import { socials } from '~/content'
  import { ref, onMounted, onUnmounted } from 'vue'

  // Base URL: "/" locally & on AWS/CloudFront, "/<repo>/" on GitHub Pages.
  // Prefix public assets with it so they resolve under a project-page subpath.
  const base = useRuntimeConfig().app.baseURL

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const year = new Date().getFullYear()
  const menuOpen = ref(false)
  const scrolled = ref(false)
  const closeMenu = () => (menuOpen.value = false)

  const onScroll = () => {
    scrolled.value = window.scrollY > 12
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
  .app-root {
    min-height: 100vh;
  }

  .skip-link {
    position: absolute;
    left: -999px;
    top: 0;
    z-index: 100;
    background: var(--accent);
    color: var(--on-accent);
    padding: 0.6rem 1rem;
    border-radius: 0 0 0.5rem 0;
    font-weight: 600;
  }
  .skip-link:focus {
    left: 0;
  }

  /* ---------- Nav ---------- */
  .nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      backdrop-filter 0.3s ease;
    border-bottom: 1px solid transparent;
  }
  .nav--scrolled {
    background: var(--elevated);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: var(--border);
  }
  .nav__inner {
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__brand {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
    color: var(--text);
    font-weight: 700;
  }
  .nav__brand-mark {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.7rem;
    background: var(--accent-grad);
    color: var(--on-accent);
    font-weight: 800;
    font-size: 0.95rem;
  }
  .nav__brand-text {
    font-size: 1.05rem;
  }

  .nav__links {
    display: none;
    align-items: center;
    gap: 2rem;
  }
  .nav__link {
    position: relative;
    color: var(--text-soft);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  .nav__link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 2px;
    background: var(--accent-grad);
    border-radius: 2px;
    transition: width 0.25s ease;
  }
  .nav__link:hover {
    color: var(--text);
  }
  .nav__link:hover::after {
    width: 100%;
  }
  .nav__cta {
    padding: 0.55rem 1.1rem;
  }

  .nav__toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 2.6rem;
    height: 2.6rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    cursor: pointer;
  }
  .nav__toggle-bar {
    display: block;
    width: 18px;
    height: 2px;
    margin-inline: auto;
    background: var(--text);
    border-radius: 2px;
    transition:
      transform 0.25s ease,
      opacity 0.2s ease;
  }
  .nav__toggle-bar.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nav__toggle-bar.open:nth-child(2) {
    opacity: 0;
  }
  .nav__toggle-bar.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .nav__mobile {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 1rem 1.5rem 1.5rem;
    background: var(--elevated);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nav__mobile-link {
    color: var(--text-soft);
    text-decoration: none;
    font-weight: 500;
    padding: 0.7rem 0.5rem;
    border-radius: 0.5rem;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }
  .nav__mobile-link:hover {
    background: var(--surface);
    color: var(--text);
  }
  .nav__mobile-cta {
    margin-top: 0.5rem;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  @media (min-width: 860px) {
    .nav__links {
      display: flex;
    }
    .nav__toggle {
      display: none;
    }
  }

  /* ---------- Footer ---------- */
  .footer {
    border-top: 1px solid var(--border);
    background: var(--surface);
    padding-block: 3rem 2rem;
    margin-top: 2rem;
  }
  .footer__inner {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border);
  }
  .footer__brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
  }
  .footer__tag {
    color: var(--text-dim);
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
  }
  .footer__social {
    display: flex;
    gap: 0.65rem;
  }
  .footer__social-link {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.7rem;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-soft);
    transition: all 0.25s ease;
  }
  .footer__social-link svg {
    width: 1.2rem;
    height: 1.2rem;
  }
  .footer__social-link:hover {
    color: #fff;
    border-color: var(--accent);
    transform: translateY(-3px);
  }
  .footer__bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    color: var(--text-dim);
    font-size: 0.9rem;
  }
  .footer__bottom p {
    margin: 0;
  }
  .footer__top {
    color: var(--text-soft);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .footer__top:hover {
    color: var(--accent);
  }
</style>
