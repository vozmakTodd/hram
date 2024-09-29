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
    '@nuxt/image',
    'nuxt-server-utils',
    '@sidebase/nuxt-auth',
    'nuxt-security'
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
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
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