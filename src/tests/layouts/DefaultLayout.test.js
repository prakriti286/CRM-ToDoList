import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'

describe('DefaultLayout.vue', () => {
  it('renders Sidebar and Header components', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          Sidebar: true,
          Header: true,
          RouterView: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Header' }).exists()).toBe(true)
  })

  it('renders router-view for dynamic content', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          Sidebar: true,
          Header: true,
          RouterView: true
        }
      }
    })

    expect(wrapper.findComponent(RouterView).exists()).toBe(true)
  })

  it('displays the footer with copyright', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          Sidebar: true,
          Header: true,
          RouterView: true
        }
      }
    })

    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('© 2025')
    expect(footer.text()).toContain('SmartCRM')
  })
})