<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { ref } from 'vue'

const isSidebarOpen = ref(false)


</script>

<template>
  <div class="font-helvetica min-h-screen flex">
    
    <!-- Sidebar -->
    <aside v-if="$route.path !== '/login'" 
      :class="[
        'h-screen w-64 bg-[#064E3B] text-white transition-transform duration-300 z-50 sticky top-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:block'
      ]"
    >
      <div @click="showMenu = !showMenu" class="lg:hidden"></div>
      <Sidebar/>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
      <!-- Mobile menu button -->
      <button 
        @click="isSidebarOpen = !isSidebarOpen"
        class="block lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
      > 
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Navbar -->
      <header>
        <Navbar />
      </header>

      <!-- Breadcrumb -->
      <nav class="flex px-5 py-3 mb-4 text-gray-700 rounded-lg bg-gray-50 dark:bg-white" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <!-- Breadcrumb items here -->
        </ol>
      </nav>

      <!-- Router View (Main page content) -->
      <div class="flex-grow">
        <router-view></router-view>
      </div>
    </main>

  </div>
</template>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: left;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
