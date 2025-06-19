
import axios from 'axios'

const API_URL = 'https://6851a6c58612b47a2c0adbd3.mockapi.io/leads';

export default {
  namespaced: true,
  state: () => ({
    leads: []
  }),

  mutations: {
    SET_LEADS(state, leads) {
      state.leads = leads
    },
    ADD_LEAD(state, lead) {
      state.leads.push(lead)
    },
    UPDATE_LEAD(state, updatedLead) {
      const index = state.leads.findIndex(lead => lead.id === updatedLead.id)
      if (index !== -1) state.leads.splice(index, 1, updatedLead)
    },
    DELETE_LEAD(state, id) {
      state.leads = state.leads.filter(lead => lead.id !== id)
    }
  },

  actions: {
    async fetchLeads({ commit }) {
      try {
        const response = await axios.get(API_URL)
        commit('SET_LEADS', response.data)
      } catch (error) {
        console.error('Error fetching leads:', error)
      }
    },

    async addLead({ commit }, lead) {
      try {
        const response = await axios.post(API_URL, lead)
        commit('ADD_LEAD', response.data)
      } catch (error) {
        console.error('Error adding lead:', error)
      }
    },

    async updateLead({ commit }, { lead }) {
      try {
        const response = await axios.put(`${API_URL}/${lead.id}`, lead)
        commit('UPDATE_LEAD', response.data)
      } catch (error) {
        console.error('Error updating lead:', error)
      }
    },

    async deleteLead({ commit }, id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        commit('DELETE_LEAD', id)
      } catch (error) {
        console.error('Error deleting lead:', error)
      }
    }
  }
}
