import { defineVitestConfig } from '@nuxt/test-utils/config'

// Nuxt environment so specs get the same auto-imports, `~` aliases and
// runtime config the app itself runs on — no hand-maintained mock layer.
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: { domEnvironment: 'happy-dom' },
    },
    include: ['test/**/*.spec.ts'],
    setupFiles: ['test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      reportsDirectory: 'coverage',
      include: [
        'app.vue',
        'components/**/*.vue',
        'composables/**/*.ts',
        'content/**/*.ts',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'plugins/**/*.ts',
        'utils/**/*.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
})
