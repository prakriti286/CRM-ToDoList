import { mount, flushPromises } from '@vue/test-utils'
import AddEditLead from '@/views/AddEditLead.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

// Mocks
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

const mockPush = jest.fn()
const mockRoute = {
  params: {} 
}

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/leads', name: 'Leads' }]
})
router.push = mockPush

// Vuex Store Mock
const store = createStore({
  modules: {
    leads: {
      namespaced: true,
      state: () => ({
        leads: [{ id: '234', name: 'Rohan', company: 'WES', contact: '1234567890', budget: '200', status: 'New' }]
      }),
      actions: {
        addLead: jest.fn(() => Promise.resolve()),
        updateLead: jest.fn(() => Promise.resolve()),
        fetchLeads: jest.fn(() => Promise.resolve())
      }
    }
  }
})

const factory = (routeOverrides = {}) =>
  mount(AddEditLead, {
    global: {
      plugins: [store, router],
      mocks: {
        $route: { ...mockRoute, ...routeOverrides },
        $router: { push: mockPush }
      }
    }
  })

describe('AddEditLead.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders Add Lead form correctly', async () => {
    const wrapper = factory()
    await flushPromises()
    expect(wrapper.text()).toContain('Add Lead')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('validates and submits new lead form', async () => {
    const wrapper = factory()
    await flushPromises()

    await wrapper.find('#name').setValue('Jane')
    await wrapper.find('#company').setValue('XYZ Corp')
    await wrapper.find('#contact').setValue('9876543210')
    await wrapper.find('#budget').setValue('2000')
    await wrapper.find('#status').setValue('New')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(store._modules.root._children.leads._rawModule.actions.addLead).toHaveBeenCalled()
    expect(Swal.fire).toHaveBeenCalledWith('Saved!', 'Lead added successfully.', 'success')
    expect(mockPush).toHaveBeenCalledWith('/leads')
  })

  it('loads lead data in edit mode and updates', async () => {
    const wrapper = factory({ params: { id: '123' } })
    await flushPromises()

    expect(wrapper.find('#name').element.value).toBe('John')
    expect(wrapper.text()).toContain('Edit Lead')

    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(store._modules.root._children.leads._rawModule.actions.updateLead).toHaveBeenCalled()
    expect(Swal.fire).toHaveBeenCalledWith('Updated!', 'Lead updated successfully.', 'success')
    expect(mockPush).toHaveBeenCalledWith('/leads')
  })

  it('shows validation error alert on invalid form submit', async () => {
    const wrapper = factory()
    await flushPromises()

    // Submit without filling form
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fix the highlighted errors.',
    })
  })
})
