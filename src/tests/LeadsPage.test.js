import { mount, flushPromises } from '@vue/test-utils'
import LeadsPage from '@/views/LeadsPage.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}))

const mockPush = jest.fn()
const router = createRouter({
  history: createWebHistory(),
  routes: []
})
router.push = mockPush

const mockLeads = [
  {
    id: '1',
    name: 'Alice',
    company: 'Alpha Inc',
    contact: '9876543210',
    budget: '1500',
    status: 'New'
  },
  {
    id: '2',
    name: 'Bob',
    company: 'Beta LLC',
    contact: '9999999999',
    budget: '2500',
    status: 'In Progress'
  }
]

const fetchLeads = jest.fn(() => Promise.resolve())
const deleteLead = jest.fn(() => Promise.resolve())

const store = createStore({
  modules: {
    leads: {
      namespaced: true,
      state: () => ({
        leads: mockLeads
      }),
      actions: {
        fetchLeads,
        deleteLead
      }
    }
  }
})

const factory = () =>
  mount(LeadsPage, {
    global: {
      plugins: [store, router]
    }
  })

describe('LeadsPage.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all leads in a table', async () => {
    const wrapper = factory()
    await flushPromises()

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockLeads.length)
    expect(rows[0].text()).toContain('Alice')
    expect(rows[1].text()).toContain('Bob')
    expect(fetchLeads).toHaveBeenCalled()
  })

  it('shows message when no leads are available', async () => {
    store.state.leads.leads = []
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.text()).toContain('No leads available')
  })

  it('calls deleteLead when confirmed by user', async () => {
    const wrapper = factory()
    await flushPromises()

    const deleteBtn = wrapper.findAll('button.btn-danger')[0]
    await deleteBtn.trigger('click')
    await flushPromises()

    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'Are you sure?' }))
    expect(deleteLead).toHaveBeenCalledWith(expect.anything(), '1', undefined)
    expect(fetchLeads).toHaveBeenCalledTimes(2) 
    expect(Swal.fire).toHaveBeenCalledWith('Deleted!', 'Lead has been deleted.', 'success')
  })

  it('routes to Add Lead page on button click', async () => {
    const wrapper = factory()
    await flushPromises()

    const addBtn = wrapper.find('a.btn-primary')
    expect(addBtn.attributes('href')).toBe('/addlead')
  })

  it('renders action buttons with correct links', async () => {
    const wrapper = factory()
    await flushPromises()

    const editBtn = wrapper.findAll('a.btn-warning')[0]
    expect(editBtn.attributes('href')).toBe('/editlead/1')

    const taskBtn = wrapper.findAll('a.btn-info')[0]
    expect(taskBtn.attributes('href')).toContain('/lead/1/tasks')
  })
})
