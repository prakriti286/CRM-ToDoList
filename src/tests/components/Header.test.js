import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/leads', name: 'Leads' },
  { path: '/tasks', name: 'Tasks' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Header.vue', () => {
  it('renders brand name SmartCRM', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('SmartCRM')
  })

  it('renders all navigation links', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAll('a.nav-link')
    const texts = links.map(link => link.text())

    expect(texts).toContain('Dashboard')
    expect(texts).toContain('Leads')
    expect(texts).toContain('Tasks')
  })

  it('toggles sidebar-collapse class on button click', async () => {
    document.body.classList.remove('sidebar-collapse') 
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })

    const toggleBtn = wrapper.find('button.navbar-toggler')
    await toggleBtn.trigger('click')

    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)
  })
})