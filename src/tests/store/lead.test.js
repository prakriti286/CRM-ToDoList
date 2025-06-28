import leadModule from '@/store/modules/lead'
import axios from 'axios'

jest.mock('axios') // Mock Axios globally

describe('Vuex - Lead Module', () => {
  let state

  beforeEach(() => {
    state = {
      leads: []
    }
  })

  // ✅ MUTATIONS
  it('SET_LEADS updates state.leads', () => {
    const sample = [{ id: '1', name: 'Test' }]
    leadModule.mutations.SET_LEADS(state, sample)
    expect(state.leads).toEqual(sample)
  })

  it('ADD_LEAD pushes new lead to state.leads', () => {
    const newLead = { id: '2', name: 'New' }
    leadModule.mutations.ADD_LEAD(state, newLead)
    expect(state.leads).toContainEqual(newLead)
  })

  it('UPDATE_LEAD updates the correct lead', () => {
    state.leads = [{ id: '1', name: 'Old' }]
    const updated = { id: '1', name: 'Updated' }
    leadModule.mutations.UPDATE_LEAD(state, updated)
    expect(state.leads[0].name).toBe('Updated')
  })

  it('DELETE_LEAD removes the lead by ID', () => {
    state.leads = [{ id: '1', name: 'Delete Me' }]
    leadModule.mutations.DELETE_LEAD(state, '1')
    expect(state.leads).toHaveLength(0)
  })

  // ✅ ACTIONS
  it('fetchLeads commits SET_LEADS on success', async () => {
    const mockData = [{ id: '1', name: 'Alice' }]
    axios.get.mockResolvedValueOnce({ data: mockData })

    const commit = jest.fn()
    await leadModule.actions.fetchLeads({ commit })

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/leads'))
    expect(commit).toHaveBeenCalledWith('SET_LEADS', mockData)
  })

  it('addLead posts data and commits ADD_LEAD', async () => {
    const newLead = { name: 'Bob' }
    const returned = { id: '2', ...newLead }
    axios.post.mockResolvedValueOnce({ data: returned })

    const commit = jest.fn()
    const result = await leadModule.actions.addLead({ commit }, newLead)

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), newLead)
    expect(commit).toHaveBeenCalledWith('ADD_LEAD', returned)
    expect(result).toEqual(returned)
  })

  it('updateLead puts data and commits UPDATE_LEAD', async () => {
    const lead = { id: '3', name: 'Charlie' }
    axios.put.mockResolvedValueOnce({ data: lead })

    const commit = jest.fn()
    const result = await leadModule.actions.updateLead({ commit }, lead)

    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/3'), lead)
    expect(commit).toHaveBeenCalledWith('UPDATE_LEAD', lead)
    expect(result).toEqual(lead)
  })

  it('deleteLead deletes lead and commits DELETE_LEAD', async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 })

    const commit = jest.fn()
    const result = await leadModule.actions.deleteLead({ commit }, '3')

    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/3'))
    expect(commit).toHaveBeenCalledWith('DELETE_LEAD', '3')
    expect(result).toBe(true)
  })
})