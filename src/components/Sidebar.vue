<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4 sidebar">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link d-flex align-items-center px-3">
      <img
  src="@/assets/CRMLogo.png"
  alt="SmartCRM"
  class="brand-image img-circle elevation-3 me-2"
  style="opacity: .8; width: 60px; height: 60px;"
/>
    <span class="brand-text font-weight-light fs-5"> SmartCRM</span>
    </router-link>
    <!-- Sidebar -->
    <div class="sidebar">
      <nav class="mt-2">
       <ul class="nav nav-pills nav-sidebar flex-column" role="list" aria-label="Main menu">

          <li class="nav-item">
            <router-link to="/dashboard" title="Dashboard" class="nav-link">
              <i class="nav-icon fas fa-house"></i>
              <span> Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/leads" title="Leads" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <span> Leads</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addlead" title="Add Lead" class="nav-link">
              <i class="nav-icon fas fa-user-plus"></i>
              <span> Add Lead</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks" title="Tasks" class="nav-link">
              <i class="nav-icon fas fa-tasks"></i>
              <span> Tasks</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script setup>
</script>

<style scoped>
.active {
  background-color: #007bff !important;
  color: white !important;
}
.sidebar .nav-link:hover {
  background-color:antiquewhite;
  border-radius: 5px;
}
.sidebar {
  overflow-y: auto;
  max-height: calc(100vh - 4rem);
}
</style>
