import { createRouter, createWebHashHistory } from 'vue-router'
import LeadsPage from './views/LeadsPage.vue'
import AddEditLead from './views/AddEditLead.vue'
import LeadTasksPage from './views/LeadTaskPage.vue'
import Dashboard from './views/Dashboard.vue'
const routes = [
  {
    path: '/',
    redirect: '/dashboard' 
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/leads',
    name: 'LeadsPage',
    component: LeadsPage
  },
  {
    path: '/addlead',
    name: 'AddLead',
    component: AddEditLead
  },
  {
    path: '/editlead/:id',
    name: 'EditLead',
    component: AddEditLead,
    props: true
  },
  {
    path: '/lead/:id/tasks',
    name: 'LeadTasksPage',
    component: LeadTasksPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
