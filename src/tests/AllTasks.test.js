import { mount, flushPromises } from '@vue/test-utils'
import AllTasks from '@/views/AllTasks.vue'
import { createStore } from 'vuex'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}))


const mockTasks = [
  {
    id: '1',
    title: 'send  quotation',
    leadId: 'L101',
    dueDate: '2025-06-3',
    status: 'Done'
  },
  {
    id: '2',
    title: 'New',
    leadId: 'L102',
    dueDate: '2025-06-11',
    status: 'Pending'
  }
]

const fetchTasks = jest.fn(() => Promise.resolve())
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
        deleteTask
      }
    }
  }
})

const factory = () =>
  mount(AllTasks, {
    global: {
      plugins: [store]
    }
  })

describe('AllTasks.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches tasks on mount', async () => {
    factory()
    await flushPromises()
    expect(fetchTasks).toHaveBeenCalled()
  })

  it('renders tasks in table', async () => {
    const wrapper = factory()
    await flushPromises()

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
    expect(wrapper.text()).toContain('Call client')
    expect(wrapper.text()).toContain('Send contract')
  })

  it('displays dynamic badge based on status', async () => {
    const wrapper = factory()
    await flushPromises()

    const badges = wrapper.findAll('span.badge')
    expect(badges[0].classes()).toContain('bg-warning')
    expect(badges[1].classes()).toContain('bg-success') 
  })

  it('shows SweetAlert and deletes task on confirmation', async () => {
    const wrapper = factory()
    await flushPromises()

    const deleteBtn = wrapper.findAll('button.btn-danger')[0]
    await deleteBtn.trigger('click')
    await flushPromises()

    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Are you sure?',
      icon: 'warning'
    }))
    expect(deleteTask).toHaveBeenCalledWith(expect.anything(), '1', undefined)
    expect(Swal.fire).toHaveBeenCalledWith('Deleted!', 'Task has been deleted.', 'success')
  })

  it('displays empty state message when no tasks', async () => {
    store.state.tasks.tasks = []
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.text()).toContain('No tasks available.')
  })
})