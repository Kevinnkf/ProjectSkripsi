<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <span>My App</span>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">About</a>
          
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 10px 20px;
  }
  
  .navbar-brand {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .navbar-nav {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    margin-left: 20px;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  </style>