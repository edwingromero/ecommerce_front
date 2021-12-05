import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      allowAnonymous: true
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/Template.vue'),
    meta: {
      allowAnonymous: false
    },
    children: [
      { path: 'cursos', component: () => import('@/views/auth/Cursos.vue') },
      { path: 'autores', component: () => import('@/views/auth/Autores.vue') }
    ]
  },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  
  //YA ESTA LOGUEADO
  if(to.fullPath=='/login' && store.state.token!=''){
    next({
      path: '/auth/cursos'
    })
  }

  //SI NECESITA CREDENCIAL LO REGRESA AL LOGIN
  if (!to.meta.allowAnonymous && store.state.token=='') {
    next({
      path: '/login'
    })
  }
  else {
    next()
  }
  //next()
})


export default router
