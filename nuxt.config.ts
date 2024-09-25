// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Cormorant Unicase': true
        }
      }
    ],
    'nuxt-mongoose',
    '@nuxt/content',
    '@nuxt/image'
  ],
  mongoose: {
    options: {
      dbName: 'hram_db'
    },
    devtools: true
  },
  icon: {
    serverBundle: 'local'
  }
})
