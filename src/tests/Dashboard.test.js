import { mount, flushPromises } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import { createStore } from 'vuex'

const mockLeads = [
  { id: 1, name: 'A', company: 'BCD', contact: '2345678901', budget: '20', status: 'Pending' },
  { id: 2, name: 'B', company: 'CDE', contact: '9945321890', budget: '50', status: 'In Progress' },
  { id: 3, name: 'C', company: 'EFG', contact: '5678342100', budget: '1500', status: 'Closed' },
  { id: 4, name: 'D', company: 'TYH', contact: '7643218908', budget: '300', status: 'Pending' },
  { id: 5, name: 'E', company: 'WSD', contact: '7777777777', budget: '570', status: 'In Progress' }
]

const mockTasks = [
  { id: 1, title: 'Task A', leadId: '1', dueDate: '2025-05-2', status: 'Pending' },
  { id: 2, title: 'Task B', leadId: '2', dueDate: '2025-06-30', status: 'In Progress' },
  { id: 3, title: 'Task C', leadId: '3', dueDate: '2025-06-01', status: 'Done' },
  { id: 4, title: 'Task D', leadId: '1', dueDate: '2025-07-28', status: 'Pending' },
  { id: 5, title: 'Task E', leadId: '2', dueDate: '2025-06-27', status: 'Done' }
]

const fetchLeads = jest.fn(() => Promise.resolve())
const fetchTasks = jest.fn(() => Promise.resolve())

const store = createStore({
  modules: {
    leads: {
      namespaced: true,
      state: () => ({
        leads: mockLeads
      }),
      actions: { fetchLeads }
    },
    tasks: {
      namespaced: true,
      state: () => ({
        tasks: mockTasks
      }),
      actions: { fetchTasks }
    }
  }
})

const factory = () =>
  mount(Dashboard, {
    global: {
      plugins: [store]
    }
  })

describe('Dashboard.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches leads and tasks on mount', async () => {
    factory()
    await flushPromises()
    expect(fetchLeads).toHaveBeenCalled()
    expect(fetchTasks).toHaveBeenCalled()
  })

  it('renders total counts and status breakdowns for leads and tasks', async () => {
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.text()).toContain('Leads : 5')
    expect(wrapper.text()).toContain('Pending: 2')
    expect(wrapper.text()).toContain('In Progress: 2')
    expect(wrapper.text()).toContain('Closed: 1')

    expect(wrapper.text()).toContain('Tasks : 5')
    expect(wrapper.text()).toContain('Pending: 2')
    expect(wrapper.text()).toContain('In Progress: 1')
    expect(wrapper.text()).toContain('Done: 2')
  })

  it('displays the 5 most recent leads', async () => {
    const wrapper = factory()
    await flushPromises()

    const leadRows = wrapper.findAll('.card:nth-of-type(1) tbody tr')
    expect(leadRows.length).toBe(5)
    expect(leadRows[0].text()).toContain('Emma') 
  })

  it('displays the 5 most recent tasks', async () => {
    const wrapper = factory()
    await flushPromises()

    const taskRows = wrapper.findAll('.card:nth-of-type(2) tbody tr')
    expect(taskRows.length).toBe(5)
    expect(taskRows[0].text()).toContain('Task E') 
  })
})
