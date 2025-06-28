import taskModule from '@/store/modules/task'
import axios from 'axios'
import Swal from 'sweetalert2'

jest.mock('axios')
jest.mock('sweetalert2')

describe('Vuex - Task Module', () => {
  let state

  beforeEach(() => {
    state = {
      tasks: []
    }
    jest.clearAllMocks()
  })

  // ✅ MUTATIONS
  it('SET_TASKS updates the state', () => {
    const tasks = [{ id: '1', title: 'Task A' }]
    taskModule.mutations.SET_TASKS(state, tasks)
    expect(state.tasks).toEqual(tasks)
  })

  it('ADD_TASK adds a task to state', () => {
    const task = { id: '2', title: 'New Task' }
    taskModule.mutations.ADD_TASK(state, task)
    expect(state.tasks).toContainEqual(task)
  })

  it('DELETE_TASK removes a task by ID', () => {
    state.tasks = [{ id: '3', title: 'Delete Me' }]
    taskModule.mutations.DELETE_TASK(state, '3')
    expect(state.tasks.length).toBe(0)
  })

  // ✅ ACTIONS
  it('fetchTasks calls API and commits SET_TASKS', async () => {
    const mockTasks = [{ id: '1', title: 'Fetch Task' }]
    axios.get.mockResolvedValueOnce({ data: mockTasks })

    const commit = jest.fn()
    await taskModule.actions.fetchTasks({ commit })

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/tasks'))
    expect(commit).toHaveBeenCalledWith('SET_TASKS', mockTasks)
  })

  it('addTask posts data, commits ADD_TASK, and shows success alert', async () => {
    const task = { title: 'Add Me' }
    const returned = { id: '4', ...task }
    axios.post.mockResolvedValueOnce({ data: returned })

    const commit = jest.fn()
    await taskModule.actions.addTask({ commit }, task)

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), task)
    expect(commit).toHaveBeenCalledWith('ADD_TASK', returned)
    expect(Swal.fire).toHaveBeenCalledWith('Success', 'Task added successfully!', 'success')
  })

  it('deleteTask deletes task, commits DELETE_TASK, and shows success alert', async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 })

    const commit = jest.fn()
    await taskModule.actions.deleteTask({ commit }, '5')

    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/5'))
    expect(commit).toHaveBeenCalledWith('DELETE_TASK', '5')
    expect(Swal.fire).toHaveBeenCalledWith('Deleted', 'Task deleted successfully!', 'success')
  })
})
