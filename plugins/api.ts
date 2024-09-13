export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'http://localhost:8080'
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
