// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
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
    '@nuxt/icon',
    'nuxt-mongoose',
    '@nuxt/content',
    '@nuxt/image',
    '@sidebase/nuxt-auth',
    'nuxt-viewport'
  ],
  app: {
    head: {
      script: [{ src: 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js' }]
    }
  },
  viewport: {
    breakpoints: {
      sm: 320,
      md: 640,
      lg: 1024,
      laptop: 1300,
      xl: 1280,
      '2xl': 1536
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md'
    },

    fallbackBreakpoint: 'lg'
  },
  mongoose: {
    options: {
      dbName: 'hram_db'
    },
    devtools: process.env.NODE_ENV !== 'production'
  },
  icon: {
    serverBundle: {
      collections: ['bx', 'fa']
    },
    customCollections: [
      {
        prefix: 'gkurk',
        dir: './assets/gIcons'
      }
    ]
  },
  image: {
    format: ['jpeg', 'jpg', 'png']
  },
  runtimeConfig: {
    mailHost: '',
    mailPort: '',
    mailUser: '',
    mailPass: '',
    mailOrderRecipient: '',
    authSecret: '',
    rootLogin: '',
    rootPass: ''
  },
  auth: {
    baseURL: process.env.ORIGIN_URL,
    provider: {
      type: 'authjs'
    }
  }
})
