<template>
  <nav class="main-header navbar navbar-expand-lg navbar-white navbar-light">
    <div class="container-fluid">
      <!-- Sidebar toggle icon -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.prevent="toggleSidebar"
      >
        <span><i class="fas fa-bars"></i></span>
      </button>

      <!-- Brand Name -->
      <router-link to="/" class="navbar-brand fw-bold text-dark">
        SmartCRM
      </router-link>

      <!-- Collapse content -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarResponsive">
        <ul class="navbar-nav">
          <!-- Example nav link -->
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/leads" class="nav-link">Leads</router-link>
          </li>
<li class="nav-item">
            <router-link to="/tasks" class="nav-link">Tasks</router-link>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
function toggleSidebar() {
  document.body.classList.toggle('sidebar-collapse')
}
</script>

<style scoped>
.navbar-toggler {
  border: none;
  font-size: 1.2rem;
}

.navbar-nav .nav-link {
  cursor: pointer;
  margin-right: 1rem;
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 1030;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
