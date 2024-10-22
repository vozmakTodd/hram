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
    'nuxt-mongoose',
    '@nuxt/content',
    '@nuxt/image'
  ],
  mongoose: {
    options: {
      dbName: 'hram_db'
    },
    devtools: process.env.NODE_ENV !== 'production'
  },
  icon: {
    serverBundle: 'local'
  },
  image: {
    format: ['jpeg', 'jpg', 'png']
  },
  runtimeConfig: {
    mailHost: '',
    mailPort: '',
    mailUser: '',
    mailPass: '',
    mailOrderRecipient: ''
  }
})
