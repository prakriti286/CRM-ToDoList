<template>
  <div class="container py-4">

    <h3 class="mb-4">Tasks for {{ leadName }}</h3>
<h6 class="text-muted mb-4">
  Company: {{ company }} | Contact: {{ contact }}
</h6>

   
    <Form @submit="onSubmit" :validation-schema="taskSchema" class="mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <Field name="title" as="select" class="form-select" id="title">
          <option value="">Select Task</option>
    <option value="Follow up after demo">Follow up after demo</option>
    <option value="Schedule Zoom meeting">Schedule Zoom meeting</option>
    <option value="Call client for feedback">Call client for feedback</option>
    <option value="Send quotation">Send quotation</option>
    <option value="Send proposal email">Send proposal email</option>
    <option value="In-person meeting with lead">In-person meeting with lead</option>
    <option value="Send contract for signature">Send contract for signature</option>
    <option value="Close lead as won">Close lead as won</option>
  </Field>
  <ErrorMessage name="title" class="text-danger" />
        </div>
        <div class="col-md-3">
          <Field name="dueDate" type="date" class="form-control" />
          <ErrorMessage name="dueDate" class="text-danger" />
        </div>
        <div class="col-md-3">
          <Field name="status" as="select" class="form-select">
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="Done">Done</option>
          </Field>
          <ErrorMessage name="status" class="text-danger" />
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-success w-100">Add Task</button>
        </div>
      </div>
    </Form>

<!--table-->
    <div v-if="leadTasks.length" class="table-responsive mt-3">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Title</th>
            <th>Lead ID</th>
            <th>Due Date</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in leadTasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.leadId }}</td>
            <td>{{ task.dueDate }}</td>
            <td>{{ task.status }} </td>
            <td class="text-center">
              <button @click="deleteTask(task.id)" class="btn btn-sm ">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert alert-info mt-4">No tasks yet for this lead.</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { computed,onMounted } from 'vue'

const store = useStore()
const route = useRoute()

const leadId = route.params.id

const leadName =  computed(() => {
  const raw =  route.query.name|| ''
  return raw
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
})
const company = computed(() => route.query.company || '')
const contact = computed(() => route.query.contact || '')


onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
const taskSchema = yup.object({
  title: yup.string().required('Task title is required'),
  dueDate: yup.string().required('Due date is required'),
  status: yup.string().required('Status is required'),
})

const leadTasks = computed(() => store.state.tasks.tasks.filter(t => String(t.leadId) === String(leadId))
.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
)

function onSubmit(values, { resetForm }) {
  const newTask = { ...values, leadId }
  store.dispatch('tasks/addTask', newTask)
  resetForm()
}

function deleteTask(taskId) {
  store.dispatch('tasks/deleteTask', taskId)
}

</script>
