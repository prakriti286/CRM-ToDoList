<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold">Lead Management</h3>
      <router-link class="btn btn-primary" to="/addlead">+ Add Lead</router-link>
    </div>

    <div v-if="leads.length" class="table-responsive">
      <table class="table table-bordered table-striped shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Budget</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.id">
            <td>{{ lead.name }}</td>
            <td>{{ lead.company }}</td>
            <td>{{ lead.contact }}</td>
            <td>{{ lead.budget }}</td>
            <td>
              {{ lead.status }}
            </td>
            <td class="text-center">
              <router-link :to="`/lead/${lead.id}/tasks`" class="btn btn-sm  me-2">📋 Tasks</router-link>
              <router-link :to="`/editlead/${lead.id}`" class="btn btn-sm  me-2">✏️ Edit</router-link>
              

              <button @click="removeLead(lead.id)" class="btn btn-sm ">🗑️ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-info text-center">No leads available.</div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const leads = computed(() => store.state.leads.leads)

const removeLead = async (id) => {
  if (confirm('Are you sure you want to delete this lead?')) {
    try {
      await store.dispatch('leads/deleteLead', id)
      console.log('Lead deleted successfully:', id)
      await store.dispatch('leads/fetchLeads') 
    } catch (error) {
      console.error('Failed to delete lead:', error)
    }
  }
}



const getBadgeClass = (status) => {
  return [
    'badge',
    status === 'Pending' ? 'bg-warning' :
    status === 'Closed' ? 'bg-success' : 'bg-info'
  ]
}

onMounted(() => {
 store.dispatch('leads/fetchLeads')
})
</script>
