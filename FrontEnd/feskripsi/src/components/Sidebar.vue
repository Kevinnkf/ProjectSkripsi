<template>
  <aside class="sidebar">
    <ul class="sidebar-nav">
      <li class="sidebar-item">
        <a href="#" class="sidebar-link">Dashboard</a>
      </li>
      <li class="sidebar-item">
        <a href="#" class="sidebar-link">Users</a>
      </li>
      <li class="sidebar-item">
        <a href="#" class="sidebar-link">Settings</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  margin-bottom: 10px;
}

.sidebar-link {
  text-decoration: none;
  color: #333;
}
</style>