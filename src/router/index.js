import { createRouter, createWebHashHistory } from 'vue-router'

// Layout
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Views
import Dashboard from '@/views/Dashboard.vue'
import LeadsPage from '@/views/LeadsPage.vue'
import AddEditLead from '@/views/AddEditLead.vue'
import LeadTasksPage from '@/views/LeadTaskPage.vue'
import AllTasksPage from '@/views/AllTasksPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout, // wrapper layout
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'leads', name: 'LeadsPage', component: LeadsPage },
      { path: 'addlead', name: 'AddLead', component: AddEditLead },
      { path: 'editlead/:id', name: 'EditLead', component: AddEditLead, props: true },
      { path: 'lead/:id/tasks', name: 'LeadTasksPage', component: LeadTasksPage, props: true },
      { path: 'tasks', name: 'AllTasksPage', component: AllTasksPage }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
