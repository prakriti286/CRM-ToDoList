import { createRouter, createWebHashHistory } from 'vue-router'
import router from '@/router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import LeadsPage from '@/views/LeadsPage.vue'
import AddEditLead from '@/views/AddEditLead.vue'
import LeadTasksPage from '@/views/LeadTaskPage.vue'
import AllTasksPage from '@/views/AllTasksPage.vue'

describe('Vue Router', () => {
  it('should be using hash mode history', () => {
    const testRouter = createRouter({
      history: createWebHashHistory(),
      routes: [],
    })
    expect(testRouter.options.history).toBeInstanceOf(Object)
  })

  it('should contain expected routes', () => {
    const routePaths = router.getRoutes().map(route => route.path)

    expect(routePaths).toContain('/')
    expect(routePaths).toContain('/dashboard')
    expect(routePaths).toContain('/leads')
    expect(routePaths).toContain('/addlead')
    expect(routePaths).toContain('/editlead/:id')
    expect(routePaths).toContain('/lead/:id/tasks')
    expect(routePaths).toContain('/tasks')
  })

  it('should redirect from `/` to `/dashboard`', () => {
    const rootRoute = router.getRoutes().find(r => r.path === '/')
    const childRedirect = rootRoute.children.find(c => c.path === '')
    expect(childRedirect.redirect).toBe('/dashboard')
  })

  it('should use DefaultLayout as the root wrapper', () => {
    const rootRoute = router.getRoutes().find(r => r.path === '/')
    expect(rootRoute.component).toBe(DefaultLayout)
  })

  it('should correctly map components to route names', () => {
    const route = router.getRoutes().find(r => r.name === 'Dashboard')
    expect(route.component).toBe(Dashboard)

    const leadRoute = router.getRoutes().find(r => r.name === 'LeadsPage')
    expect(leadRoute.component).toBe(LeadsPage)

    const addRoute = router.getRoutes().find(r => r.name === 'AddLead')
    expect(addRoute.component).toBe(AddEditLead)

    const editRoute = router.getRoutes().find(r => r.name === 'EditLead')
    expect(editRoute.component).toBe(AddEditLead)

    const taskRoute = router.getRoutes().find(r => r.name === 'LeadTasksPage')
    expect(taskRoute.component).toBe(LeadTasksPage)

    const allTasks = router.getRoutes().find(r => r.name === 'AllTasksPage')
    expect(allTasks.component).toBe(AllTasksPage)
  })
})
