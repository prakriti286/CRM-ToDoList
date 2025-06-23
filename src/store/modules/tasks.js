import axios from 'axios'

const API_URL = 'https://6851a6c58612b47a2c0adbd3.mockapi.io/tasks';

export default {
  namespaced: true,
  state: () => ({
    tasks: []
  }),
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const res = await axios.get(API_URL).then(res => {
          commit('SET_TASKS', res.data)
        })
        
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    async addTask({ commit }, task) {
      try {
        const res = await axios.post(API_URL, task)
        commit('ADD_TASK', res.data)
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },
    async deleteTask({ commit, dispatch }, taskId) {
  try {
    await axios.delete(`${API_URL}/${taskId}`)
    commit('DELETE_TASK', taskId)
    dispatch('fetchTasks')  
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

  }
}
