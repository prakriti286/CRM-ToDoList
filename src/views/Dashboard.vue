<template>

    <section class="content">

     
      <!-- Summary Row -->
<div class="row">
  <!-- Leads Summary -->
  <div class="col-md-4 col-sm-6 mb-3">
    <div class="info-box text-dark">
      <span class="info-box-icon"><i class="fas fa-user-plus"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Leads : {{ leads.length }}</span>
        <div class="pt-1">
          <div><strong>Pending:</strong> {{ leadsByStatus?.Pending || 0 }}</div>
          <div><strong>In Progress:</strong> {{ leadsByStatus?.['In Progress'] || 0 }}</div>
          <div><strong>Closed:</strong> {{ leadsByStatus?.Closed || 0 }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tasks Summary -->
  <div class="col-md-4 col-sm-6 mb-3">
    <div class="info-box  text-dark">
      <span class="info-box-icon"><i class="fas fa-tasks"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Tasks : {{ tasks.length }}</span>
       <div class="pt-1">
  <div><strong>Pending:</strong> {{ tasksByStatus?.Pending || 0 }}</div>
  <div><strong>In Progress:</strong> {{ tasksByStatus?.['In Progress'] || 0 }}</div>
  <div><strong>Done:</strong> {{ tasksByStatus?.Done || 0 }}</div>
</div>

      </div>
    </div>
  </div>

  <!-- Deals Summary -->
  <div class="col-md-4 col-sm-6 mb-3">
    <div class="info-box  text-dark">
      <span class="info-box-icon"><i class="fas fa-handshake"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Deals</span>
        <span class="info-box-number">
  {{ tasksByStatus?.Done || 0 }}
</span>
   </div>
    </div>
  </div>
</div>

<!-- Recent Leads -->
<div class="card mt-2 shadow-sm">
  <div class="card-header bg-primary text-white">
    <h3 class="card-title"><i class="fas fa-clock me-2"></i> Recent Leads</h3>
  </div>
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-sm mb-0 text-center">
        <thead class="table-light">
          <tr>
            <th style="width: 20%">Name</th>
            <th style="width: 20%">Company</th>
            <th style="width: 20%">Contact</th>
            <th style="width: 20%">Budget</th>
            <th style="width: 20%">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in recentLeads" :key="lead.id">
            <td>{{ lead.name }}</td>
            <td>{{ lead.company }}</td>
            <td>{{ lead.contact }}</td>
            <td>₹{{ lead.budget }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  lead.status === 'Pending' ? 'bg-warning' :
                  lead.status === 'In Progress' ? 'bg-info' :
                  'bg-success'
                ]"
              >
                {{ lead.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


<!-- Recent Tasks -->
<div class="card mt-4 shadow-sm">
  <div class="card-header bg-primary text-white">
    <h3 class="card-title">
      <i class="fas fa-history me-2"></i> Recent Tasks
    </h3>
  </div>
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-sm mb-0 text-center">
        <thead class="table-light">
          <tr>
            <th style="width: 30%">Task</th>
            <th style="width: 20%">Lead ID</th>
            <th style="width: 25%">Due Date</th>
            <th style="width: 25%">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in recentTasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.leadId }}</td>
            <td>{{ task.dueDate }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  task.status === 'Pending' ? 'bg-warning' :
                  task.status === 'In Progress' ? 'bg-info' :
                  'bg-success'
                ]"
              >
                {{ task.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    </section>

</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const leads = computed(() => store.state.leads.leads || [])
const tasks = computed(() => store.state.tasks.tasks || [])

const leadsByStatus = computed(() =>
  leads.value.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {})
)

const tasksByStatus = computed(() =>
  tasks.value.reduce((acc, task) => {
    const status = task.status?.trim().toLowerCase();  // normalize
    if (status === 'pending') acc['Pending'] = (acc['Pending'] || 0) + 1
    else if (status === 'in progress') acc['In Progress'] = (acc['In Progress'] || 0) + 1
    else if (status === 'done') acc['Done'] = (acc['Done'] || 0) + 1
    return acc
  }, {})
)
const recentLeads = computed(() =>
  [...leads.value].sort((a, b) => b.id - a.id).slice(0, 5)
)

const recentTasks = computed(() =>
  [...tasks.value].sort((a, b) => b.id - a.id).slice(0, 5)
)

onMounted(() => {
  store.dispatch('leads/fetchLeads')
  store.dispatch('tasks/fetchTasks')

})
</script>

<style scoped>
.info-box-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
.info-box-content span {
  font-weight: 500;
}
.d-flex.justify-content-between {
  gap: 0.3rem;
}

.info-box-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem;
}
.info-box {
  min-height: 120px;
}
.info-box .info-box-text {
  font-weight: bold;
}
.table th, .table td {
  vertical-align: middle;
  font-size: 14px;
  padding: 8px 10px;
}

</style>