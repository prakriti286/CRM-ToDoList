<template>
  <div class="content-wrapper px-3 py-3">
    <section class="content-header mb-3">
      <h1>
        <i class="fas fa-user-edit"></i> {{ isEditMode ? 'Edit Lead' : 'Add Lead' }}
      </h1>
    </section>

    <div class="card">
      <div class="card-header bg-info text-white">
        <h3 class="card-title"><i class="fas fa-address-card"></i> Lead Details</h3>
      </div>

      <div class="card-body">
       <form v-if="formReady" @submit.prevent="submitForm">

          <div class="row">
            <!-- Name -->
            <div class="col-md-6 mb-3">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': nameError }"
                v-model="nameValue"
              />
              <span class="text-danger small">{{ nameError }}</span>
            </div>

            <!-- Company -->
            <div class="col-md-6 mb-3">
              <label for="company">Company</label>
              <input
                id="company"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': companyError }"
                v-model="companyValue"
              />
              <span class="text-danger small">{{ companyError }}</span>
            </div>

            <!-- Contact -->
            <div class="col-md-6 mb-3">
              <label for="contact">Contact</label>
              <input
                id="contact"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': contactError }"
                v-model="contactValue"
              />
              <span class="text-danger small">{{ contactError }}</span>
            </div>

            <!-- Budget -->
            <div class="col-md-6 mb-3">
              <label for="budget">Budget</label>
              <input
                id="budget"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': budgetError }"
                v-model="budgetValue"
              />
              <span class="text-danger small">{{ budgetError }}</span>
            </div>

            <!-- Status -->
            <div class="col-md-6 mb-3">
              <label for="status">Status</label>
              <select
                id="status"
                class="form-control"
                :class="{ 'is-invalid': statusError }"
                v-model="statusValue"
              >
                <option disabled value="">Select Status</option>
                <option>New</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Unqualified</option>
                <option>Closed</option>
              </select>
              <span class="text-danger small">{{ statusError }}</span>
            </div>
          </div>

          <div class="text-end mt-3">
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save"></i> {{ isEditMode ? 'Update' : 'Save' }}
            </button>
          </div>
          
        </form>

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// Routing & Store
const store = useStore()
const route = useRoute()
const router = useRouter()
const leadId = route.params.id
const isEditMode = ref(!!leadId)
const formReady = ref(false)

// Schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  contact: yup
    .string()
    .required('Contact is required')
    .matches(/^[0-9]{10}$/, 'Contact must be a 10-digit number'),
  budget: yup
    .string()
    .required('Budget is required')
    .matches(/^\d+$/, 'Budget must be digits only'),
  status: yup.string().required('Status is required'),
})

// useForm with schema
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
})

// useField bindings
const { value: nameValue, errorMessage: nameError } = useField('name')
const { value: companyValue, errorMessage: companyError } = useField('company')
const { value: contactValue, errorMessage: contactError } = useField('contact')
const { value: budgetValue, errorMessage: budgetError } = useField('budget')
const { value: statusValue, errorMessage: statusError } = useField('status')

// Submit handler
const onSubmit = async (values) => {
  console.log('🟢 Form Submitted:', values)
  try {
    if (isEditMode.value) {
      await store.dispatch('leads/updateLead', { ...values, id: leadId })
      await Swal.fire('Updated!', 'Lead updated successfully.', 'success')
    } else {
      await store.dispatch('leads/addLead', values)
      await Swal.fire('Saved!', 'Lead added successfully.', 'success')
    }
    router.push('/leads')
  } catch (err) {
    console.error('Submission error:', err)
    await Swal.fire('Error', 'Something went wrong. Try again.', 'error')
  }
}

// Validation handler
const onInvalid = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Validation Error',
    text: 'Please fix the highlighted errors.',
  })
}

// Submit wrapper (AFTER onSubmit is defined!)
const submitForm = handleSubmit(onSubmit, onInvalid)

// Load data if editing
onMounted(async () => {
  
  if (isEditMode.value) {
    try {
      await store.dispatch('leads/fetchLeads')
      const lead = store.state.leads.leads.find(l => l.id === leadId)
      if (lead) {
        setValues(lead)
       
      } else {
        Swal.fire('Error', 'Lead not found', 'error')
      }
    } catch (err) {
      console.error(' Error loading leads:', err)
      Swal.fire('Error', 'Failed to load lead data.', 'error')
    }
  }
  formReady.value = true
})
</script>
<style scoped>
.card-header {
  font-weight: bold;
}
.is-invalid {
  border-color: #dc3545;
}
</style>