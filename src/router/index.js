import { createRouter, createWebHistory } from 'vue-router'
import Search from '../views/Search.vue'
import Profile from "../views/Profile.vue"

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
