import { mount, flushPromises } from '@vue/test-utils'
import LeadTasksPage from '@/views/LeadTasksPage.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

// Mock SweetAlert
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}))

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

const mockRoute = {
  params: { id: '1' },
  query: {
    name: 'john doe',
    company: 'Example Inc',
    contact: '9999999999'
  }
}

// Dummy tasks
const mockTasks = [
  {
    id: 't1',
    leadId: '1',
    title: 'Follow up after demo',
    dueDate: '2025-06-30',
    status: 'Pending'
  },
  {
    id: 't2',
    leadId: '1',
    title: 'Send quotation',
    dueDate: '2025-06-29',
    status: 'Done'
  },
  {
    id: 't3',
    leadId: '2',
    title: 'Call client for feedback',
    dueDate: '2025-07-01',
    status: 'Pending'
  }
]

const fetchTasks = jest.fn(() => Promise.resolve())
const addTask = jest.fn(() => Promise.resolve())
const deleteTask = jest.fn(() => Promise.resolve())

const store = createStore({
  modules: {
    tasks: {
      namespaced: true,
      state: () => ({
        tasks: mockTasks
      }),
      actions: {
        fetchTasks,
        addTask,
        deleteTask
      }
    }
  }
})

const factory = () =>
  mount(LeadTasksPage, {
    global: {
      plugins: [store, router],
      mocks: {
        $route: mockRoute
      }
    }
  })

describe('LeadTasksPage.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders lead name, company and contact correctly', async () => {
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.text()).toContain('Tasks for John Doe')
    expect(wrapper.text()).toContain('Company: Example Inc')
    expect(wrapper.text()).toContain('Contact: 9999999999')
  })

  it('filters and renders only tasks for current lead', async () => {
    const wrapper = factory()
    await flushPromises()

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2) 
    expect(rows[0].text()).toContain('Send quotation') 
  })

  it('adds a new task when form is valid', async () => {
    const wrapper = factory()
    await flushPromises()

    await wrapper.find('select[name="title"]').setValue('Send proposal email')
    await wrapper.find('input[name="dueDate"]').setValue('2025-07-01')
    await wrapper.find('select[name="status"]').setValue('In Progress')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(addTask).toHaveBeenCalledWith(expect.anything(), {
      title: 'Send proposal email',
      dueDate: '2025-07-01',
      status: 'In Progress',
      leadId: '1'
    }, undefined)
  })

  it('shows SweetAlert and deletes task on confirm', async () => {
    const wrapper = factory()
    await flushPromises()

    const deleteBtn = wrapper.findAll('button.btn-danger')[0]
    await deleteBtn.trigger('click')
    await flushPromises()

    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'Are you sure?' }))
    expect(deleteTask).toHaveBeenCalledWith(expect.anything(), 't2', undefined)
    expect(Swal.fire).toHaveBeenCalledWith('Deleted!', 'Task has been deleted.', 'success')
  })

  it('shows empty state message if no tasks exist', async () => {
    store.state.tasks.tasks = []
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.text()).toContain('No tasks yet for this lead')
  })
})
