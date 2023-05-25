import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server)
    return

  const authStore = useAuthStore()

  authStore.checkAuth()
  const isAuthenticated = authStore.isAuthenticated

  if (to.path === '/protected') {
    if (!isAuthenticated)
      return navigateTo('/sign-in')
  }
  else if (to.path === '/sign-in' || to.path === '/sign-up') {
    if (isAuthenticated)
      return navigateTo('/protected')
  }
})
