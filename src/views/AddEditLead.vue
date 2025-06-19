<template>
  <div class="container py-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">{{ isEdit ? 'Edit Lead' : 'Add New Lead' }}</h4>
      </div>

      <div class="card-body">
        <Form v-slot="{handleSubmit}" :key="formKey"
  :validation-schema="leadSchema"
  :initial-values="formInitialValues">
  <form  @submit.prevent="handleSubmit(onSubmit)">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <Field name="name" id="name" class="form-control" autocomplete="name" />
            <ErrorMessage name="name" class="text-danger" />
          </div>

          <div class="mb-3">
            <label  for="company" class="form-label">Company</label>
            <Field id="company" name="company" class="form-control" autocomplete="organization" />
            <ErrorMessage name="company" class="text-danger" />
          </div>
<div class="mb-3">
            <label  for="contact" class="form-label">Contact Details</label>
            <Field id="contact" name="contact"   type="number" class="form-control" autocomplete="off"/>
            <ErrorMessage name="contact" class="text-danger" />
          </div>
          <div class="mb-3">
            <label for="budget" class="form-label">Budget</label>
            <Field id="budget" name="budget" type="number" class="form-control"  autocomplete="off"/>
            <ErrorMessage name="budget" class="text-danger" />
          </div>

          <div class="mb-3">
            <label  for="status"  class="form-label">Status</label>
            <Field id="status" name="status" as="select" class="form-select">
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </Field>
            <ErrorMessage name="status" class="text-danger" />
          </div>

          <button type="submit" class="btn btn-success me-2">Save</button>
          <router-link to="/leads" class="btn btn-secondary">Cancel</router-link>
  </form>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

// core
const store = useStore()
const router = useRouter()
const route = useRoute()
const formKey = ref(0)

const isEdit = ref(false)
const leadId = route.params.id

const existingLead = ref(null)

const formInitialValues = ref({
  name: '',
  company: '',
  contact:'',
  budget: '',
  status: ''
})

const leadSchema = yup.object({
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  contact: yup.number().required('Contact is required').positive('Must be positive').test('len', 'Contact must be 10 digits', val => val && val.toString().length === 10),
  budget: yup.number().required('Budget is required').positive('Must be positive'),
  status: yup.string().required('Status is required')
})


onMounted(() => {
  if (leadId) {
    const leads = store.state.leads.leads
    existingLead.value = leads.find(lead => lead.id === leadId)
    if (existingLead.value) {
      isEdit.value = true
      formInitialValues.value = {
        name: existingLead.value.name,
        company: existingLead.value.company,
        contact: existingLead.value.contact || '',
        budget: existingLead.value.budget,
        status: existingLead.value.status
      }
      formKey.value++  
    }
  }
})

// form submit
function onSubmit(values) {
  if (isEdit.value) {
    const updated = { ...values, id: existingLead.value.id }
    store.dispatch('leads/updateLead', { lead: updated })
  } else {
    const newLead = { ...values, id: Date.now() }

    store.dispatch('leads/addLead', newLead)
  }
  router.push('/leads')
}
</script>

<style scoped>
.card-header {
  font-weight: bold;
}
</style>

