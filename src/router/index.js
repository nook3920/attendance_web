import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../views/Home'

Vue.use(Router)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/SignIn')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/SignUp')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile'),
    meta: {
      auth: true
    }
  },
  {
    path: '/classrooms',
    name: 'Classrooms',
    component: () => import('../views/classroom'),
    meta: {
      auth: true
    }
  },
  {
    path: '/classroom/create',
    name: 'CreateClassroom',
    component: () => import('../views/CreateClassroom'),
    meta: {
      auth: true
    }
  },
  {
    path: '/excel',
    name: 'Excel',
    component: () => import('../views/excel'),
    meta: {
      auth: true
    }
  },
  {
    path: '/showattendance',
    name: 'ShowAttendance',
    component: () => import('../views/ShowAttendance')

  },
  {
    path: '/classroom/:id',
    name: 'EditClassroom',
    component: () => import('../views/EditClassroom')
  }
]

let router = new Router({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') || ''
  let Auth = ''
  let Role = ''
  if(token){
    let user = JSON.parse(atob(token.split('.')[1]))
    Role = user.role
    Auth = true
  }else {
    Role = null
    Auth = false
  }
  if(to.matched.some(record => record.meta.auth)){
    if(!Auth){
      next('/login')
    } else {
      if(to.matched.some(record => record.meta.admin)) {
        if(Role === 'ADMIN'){
          next()
        } else{
          next('/login')
        }
      } else if(to.matched.some(record => record.meta.teacher)) {
        if(Role === 'TEACHER'){
          next()
        } else {
          next('/login')
        }
      } else if(to.matched.some(record => record.meta.student)) {
        if(Role === 'STUDENT') {
          next()
        } else {
          next('/login')
        }
      }
    }
  }



  next()
  
})

export default router