<!-- src/views/AllTasksPage.vue -->
<template>
  <div class="container py-4">
    <h3 class="mb-4">All Tasks</h3>

    <div v-if="tasks.length" class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Task</th>
            <th>Lead ID</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.leadId }}</td>
            <td>{{ task.dueDate }}</td>
            <td>{{ task.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert alert-info">No tasks available.</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})

const tasks = computed(() => store.state.tasks.tasks)
</script>
