import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/pages/Dashboard.vue'
import PatientView from '../views/pages/Patient.vue'
import AppointmentView from '../views/pages/Appointment.vue'
import OperatorsView from '../views/pages/Operators.vue'
import AccountingView from '../views/pages/Accounting.vue'
import ProfileView from '../views/pages/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {layout:'blank'},
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/patiens',
    name: 'patient',
    component: PatientView
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: AppointmentView
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: AccountingView
  },
  {
    path: '/operators',
    name: 'operators',
    component: OperatorsView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
