<template>
  <section id="contact" class="section contact">
    <div class="wrap">
      <header class="section-head center" data-reveal>
        <p class="eyebrow">Let's talk</p>
        <h2 class="section-title">Get In <span class="text-gradient">Touch</span></h2>
        <p class="section-sub">
          Have an opportunity or just want to connect? Drop a message and I'll get back to you.
        </p>
      </header>

      <div class="contact__grid">
        <!-- Form -->
        <div class="card contact__card" data-reveal>
          <form class="contact__form" @submit.prevent="handleSubmit">
            <div class="field-group">
              <label for="name">Name</label>
              <input id="name" v-model="form.name" type="text" class="field" required />
            </div>
            <div class="field-group">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" class="field" required />
            </div>
            <div class="field-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                class="field"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary contact__submit">Send Message</button>
          </form>
        </div>

        <!-- Info -->
        <div class="contact__info" data-reveal style="transition-delay: 90ms">
          <div class="card contact__detail" v-for="detail in details" :key="detail.label">
            <component
              :is="detail.href ? 'a' : 'div'"
              :href="detail.href"
              :target="detail.href ? '_blank' : null"
              :rel="detail.href ? 'noopener noreferrer' : null"
              class="contact__detail-inner"
            >
              <span class="contact__detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path
                    v-for="(d, i) in detail.paths"
                    :key="i"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="d"
                  />
                </svg>
              </span>
              <div>
                <p class="contact__detail-label">{{ detail.label }}</p>
                <p class="contact__detail-value">{{ detail.value }}</p>
              </div>
            </component>
          </div>

          <div class="card contact__connect">
            <h3 class="contact__connect-title">Connect with me</h3>
            <div class="contact__socials">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="contact__social"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path :d="s.path" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { contactDetails as details, socials } from '~/content'
  import { ref } from 'vue'

  const form = ref({ name: '', email: '', message: '' })

  const handleSubmit = () => {
    const mailto = `mailto:manideep.chittineni@hotmail.com?subject=Message from ${encodeURIComponent(
      form.value.name
    )}&body=From: ${encodeURIComponent(form.value.email)}%0D%0A%0D%0A${encodeURIComponent(
      form.value.message
    )}`

    window.location.href = mailto

    form.value = { name: '', email: '', message: '' }
  }
</script>

<style scoped>
  .contact__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 64rem;
    margin-inline: auto;
  }

  .contact__card {
    padding: 2rem;
  }
  .contact__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .field-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-soft);
  }
  textarea.field {
    resize: vertical;
    min-height: 7rem;
  }
  .contact__submit {
    margin-top: 0.25rem;
  }

  .contact__info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .contact__detail {
    padding: 0;
    overflow: hidden;
  }
  .contact__detail-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    text-decoration: none;
    color: var(--text);
    transition: background 0.2s ease;
  }
  a.contact__detail-inner:hover {
    background: var(--surface-2);
  }
  .contact__detail-icon {
    display: grid;
    place-items: center;
    width: 2.8rem;
    height: 2.8rem;
    flex-shrink: 0;
    border-radius: 0.7rem;
    background: rgba(129, 140, 248, 0.12);
    border: 1px solid rgba(129, 140, 248, 0.25);
    color: var(--accent);
  }
  .contact__detail-icon svg {
    width: 1.4rem;
    height: 1.4rem;
  }
  .contact__detail-label {
    margin: 0;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-dim);
  }
  .contact__detail-value {
    margin: 0.2rem 0 0;
    font-size: 0.95rem;
    color: var(--text);
    word-break: break-word;
  }

  .contact__connect {
    padding: 1.5rem;
  }
  .contact__connect-title {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }
  .contact__socials {
    display: flex;
    gap: 0.75rem;
  }
  .contact__social {
    display: grid;
    place-items: center;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 0.7rem;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-soft);
    transition: all 0.25s ease;
  }
  .contact__social svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  .contact__social:hover {
    color: #fff;
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  @media (min-width: 820px) {
    .contact__grid {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: start;
    }
  }
</style>
