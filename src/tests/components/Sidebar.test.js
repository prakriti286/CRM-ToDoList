import { mount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/leads', name: 'Leads' },
  { path: '/addlead', name: 'AddLead' },
  { path: '/tasks', name: 'Tasks' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Sidebar.vue', () => {
  it('renders the brand logo and name', async () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [router]
      }
    })

    const brandText = wrapper.find('.brand-text')
    expect(brandText.exists()).toBe(true)
    expect(brandText.text()).toContain('SmartCRM')
  })

  it('renders all sidebar navigation links', async () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAll('a.nav-link')
    const texts = links.map(link => link.text())

    expect(texts).toContain('Dashboard')
    expect(texts).toContain('Leads')
    expect(texts).toContain('Add Lead')
    expect(texts).toContain('Tasks')
  })
})
