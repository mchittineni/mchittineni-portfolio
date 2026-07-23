// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'static', // full static generation -> .output/public
  },
  routeRules: {
    // prerender index route
    '/': { prerender: true },
    // prerender all routes (optional: use crawler)
    '/*': { prerender: true },
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Manideep Chittineni',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#0a0b12' },
        {
          name: 'description',
          content:
            'Senior Platform, Cloud & DevOps Engineer with 6+ years across AWS, Azure, GCP & OCI, architecting Kubernetes, Terraform, Databricks, DevSecOps, and production Agentic AI & GenAI systems.',
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Manideep Chittineni | Senior Platform, Cloud & DevOps Engineer',
        },
        {
          property: 'og:description',
          content:
            'Senior Platform, Cloud & DevOps Engineer with 6+ years across AWS, Azure, GCP & OCI, architecting Kubernetes, Terraform, Databricks, DevSecOps, and production Agentic AI & GenAI systems.',
        },
        // Absolute URL required by social crawlers (update if a custom domain is added).
        { property: 'og:image', content: 'https://mchittineni.github.io/Portfolio/profile.jpg' },
        { property: 'og:url', content: 'https://mchittineni.github.io/Portfolio/' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Manideep Chittineni | Senior Platform, Cloud & DevOps Engineer',
        },
        {
          name: 'twitter:description',
          content:
            'Senior Platform, Cloud & DevOps Engineer with 6+ years across AWS, Azure, GCP & OCI, architecting Kubernetes, Terraform, Databricks, DevSecOps, and production Agentic AI & GenAI systems.',
        },
        { name: 'twitter:image', content: 'https://mchittineni.github.io/Portfolio/profile.jpg' },
      ],
      link: [
        // Relative so it resolves at both root ("/") and a project-page subpath.
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
