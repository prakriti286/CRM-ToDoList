<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content flex-grow-1 d-flex flex-column">
      <Header />

      <!-- Dynamic Page Content -->
      <div class="content-wrapper px-3 py-3 flex-grow-1">
        <router-view />
      </div>

      <!-- Footer -->
      <footer class="main-footer text-center py-2 bg-light border-top">
        <strong>&copy; 2025 <a href="#">SmartCRM</a>.</strong> All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>

<style scoped>
/* Sidebar will be fixed width */
.sidebar {
  width: 250px;
  min-height: 100vh;
}

/* Push main content next to sidebar */
.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Optional */
.content-wrapper {
  background-color: #f4f6f9;
  flex-grow: 1;
}
</style>
