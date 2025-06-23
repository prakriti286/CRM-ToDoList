<script setup>
</script>

<template>
  <div class="wrapper d-flex">
   
    
      <nav class="sidebar bg-dark text-white p-3 vh-100" style="min-width: 220px;">
  <div class="d-flex align-items-center justify-content-center mb-4 gap-2">
    <img src="@/assets/CRMLogo.png" class="bg-white rounded p-1" alt="SmartCRM Logo" style="width: 50px; height: 50px; object-fit: contain; filter:brightness(1.2) ;" />
    <h5 class="mb-0 text-white fw-bold">SmartCRM</h5>
  </div>

      
      <ul class="nav flex-column">
  <li class="nav-item mb-2">
   <router-link to="/" class="nav-link text-white" active-class="active-link"> <i class="fas fa-home me-2"></i> Dashboard</router-link>
</li>
  <li class="nav-item mb-2">
    <router-link to="/leads" class="nav-link text-white" active-class="active-link"><i class="fas fa-address-book  me-2"></i> Leads</router-link>
  </li>
  <li class="nav-item mb-2">
  <router-link to="/addlead" class="nav-link text-white" active-class="active-link"><i class="fas fa-user-plus me-2"></i>  Add Lead</router-link>
</li>

<li class="nav-item mb-2">
  <router-link to="/tasks" class="nav-link text-white" active-class="active-link">  <i class="fas fa-tasks me-2"></i> Tasks</router-link>
</li>
</ul>
</nav>

    <!--pageinfo-->
    <div class="flex-grow-1 p-4 bg-light" style="min-height: 100vh;">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.active-link {
  font-weight: bold;
  background-color: #0d6efd;
  border-radius: 5px;
  padding: 5px 10px;
  color: white !important;
}
.sidebar .nav-link:hover {
  background-color: #343a40;
  border-radius: 5px;
}
</style>
