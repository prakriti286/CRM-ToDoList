<template>
  <div class="container py-4">
    <h3 class="fw-bold mb-4"><i class="fas fa-home me-1"></i> Dashboard - SmartCRM</h3>
<!--summary-->
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3 mb-4">
  <div class="col" v-for="card in summaryCards" :key="card.title">
    <div class="card text-white shadow" :class="card.bg">
          <div class="card-body">
            <h5 class="card-title">{{ card.icon }} {{ card.title }}</h5>
            <h2>{{ card.value }}</h2>
          </div>
        </div>
      </div>
    </div>

<!--recent leads-->
    <div class="card shadow">
      <div class="card-header bg-secondary text-white">
        <h5 class="mb-0">🕒 Recent Leads</h5>
      </div>
      <div class="card-body table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Contact</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in recentLeads" :key="lead.id">
              <td>{{ lead.name }}</td>
              <td>{{ lead.company }}</td>
              <td>{{ lead.contact }}</td>
              <td>{{ lead.budget }}</td>
              <td><span :class="getBadgeClass(lead.status)">{{ lead.status }}</span></td>
            </tr>
          </tbody>
        </table>
        <div v-if="recentLeads.length === 0" class="text-center text-muted">No recent leads available.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
onMounted(() => {
  store.dispatch('leads/fetchLeads')
  store.dispatch('tasks/fetchTasks') 
})

const leads = computed(() => store.state.leads.leads)
const tasks = computed(() => store.state.tasks?.tasks || [])

const totalLeads = computed(() => leads.value.length)
const totalTasks = computed(() => tasks.value.length)
const pendingLeads = computed(() => leads.value.filter(l => l.status === 'Pending').length)
const inProgressLeads = computed(() => leads.value.filter(l => l.status === 'In Progress').length)
const closedLeads = computed(() => leads.value.filter(l => l.status === 'Closed').length)

const recentLeads = computed(() => [...leads.value].reverse().slice(0, 5))

const summaryCards = computed(() => [
  { title: 'Total Leads', value: totalLeads.value, icon: '📋' },
  { title: 'Total Tasks', value: totalTasks.value,icon: '✅' },
  { title: 'Pending Leads', value: pendingLeads.value,  icon: '⏳' },
  { title: 'In Progress', value: inProgressLeads.value,icon: '⏳' },
  { title: 'Closed Leads', value: closedLeads.value,icon: '✔️' },
])

const getBadgeClass = (status) => {
  return [
    'badge',
    status === 'Pending' ? 'bg-warning text-dark' :
    status === 'In Progress' ? 'bg-info text-dark' :
    status === 'Closed' ? 'bg-success' : 'bg-secondary'
  ]
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.card.text-white{
 background-color: #f8f9fa !important; 
  color: #000 !important; 
  border: 1px solid #dee2e6; 
}
.card h2 {
  font-weight: bold;
}
</style>


