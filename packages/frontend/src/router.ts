import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { flash, FlashType, nextRedirect, user } from './store'
import { getUser } from './api/user'
import { formatError } from './api'
import { Status } from '@plurali/backend/src/server/status'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./layouts/default.vue' as string),
    children: [
      {
        path: '/',
        component: () => import('./pages/index.vue' as string),
      },
      {
        path: '/auth/login',
        component: () => import('./pages/auth/login.vue' as string),
      },
      {
        path: '/auth/register',
        component: () => import('./pages/auth/register.vue' as string),
      },
      {
        path: '/dashboard',
        component: () => import('./pages/dashboard/index.vue' as string),
      },
      {
        path: '/dashboard/user',
        component: () => import('./pages/dashboard/user.vue' as string),
      },
      {
        path: '/dashboard/system',
        component: () => import('./pages/dashboard/system.vue' as string),
      },
      {
        path: '/dashboard/member/:id',
        component: () => import('./pages/dashboard/member.vue' as string),
      },
      {
        path: '/:systemId',
        component: () => import('./pages/system.vue' as string),
      },
      {
        path: '/:systemId/:memberId',
        component: () => import('./pages/member.vue' as string),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const isAuth = (route: string | RouteLocationNormalized) =>
  (typeof route === 'string' ? route : route.path).startsWith('/auth')

export const isDashboard = (route: string | { path: string }) =>
  (typeof route === 'string' ? route : route.path).startsWith('/dashboard')

export const isFront = (route: string | RouteLocationNormalized) => !isAuth(route) && !isDashboard(route)

router.beforeEach(async to => {
  nextRedirect();

  const promise = (async () => {
    try {
      const data = (await getUser()).data
      if (!data.success) throw new Error()

      user.value = data.data.user
      if (isAuth(to)) return '/dashboard'

      if (isDashboard(to) && !user.value.pluralKey) {
        flash('You must setup your Simply Plural API key!', FlashType.Danger)
        if (to.path !== '/dashboard/user') {
          return '/dashboard/user'
        }
      }
    } catch (error) {
      user.value = null
      const status = formatError(error)
      if (status !== Status.NotAuthenticated) {
        flash(status, FlashType.Danger, true)
      } else if (isDashboard(to)) {
        flash('You need to be logged in to access the dashboard!', FlashType.Warning, true, false)
        return '/auth/login'
      }
    }
  })()

  if (isFront(to)) {
    return
  }

  return await promise
})

export { router }
