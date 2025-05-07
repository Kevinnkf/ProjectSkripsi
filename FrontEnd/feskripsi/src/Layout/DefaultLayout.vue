<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/components/Stores/UserStore.vue'

const userStore = useUserStore()
const isSidebarOpen = ref(false)

onMounted(() => {
  userStore.restoreUserFromToken()
})


</script>

<template>
  <div class="font-helvetica h-screen flex overflow-hidden">
  
  <!-- Desktop Sidebar -->
  <aside v-if="$route.path !== '/login'" class="w-64 h-full bg-[#064E3B] text-white overflow-y-auto hidden lg:block">
    <Sidebar />
  </aside>

  <!-- Mobile Sidebar (slide in/out) -->
  <aside 
    v-if="$route.path !== '/login'" 
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-[#064E3B] text-white overflow-y-auto transform transition-transform duration-300 lg:hidden',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <Sidebar />
  </aside>

  <!-- Main Content -->
  <main class="flex-1 h-full overflow-y-auto flex flex-col">
    <!-- Mobile Menu Button -->
    <button 
      @click="isSidebarOpen = !isSidebarOpen"
      class="block lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
    > 
      <!-- Icon -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Navbar -->
    <header>
      <div v-if="$route.path !== '/chatbot'">
        <Navbar />
      </div>
    </header>

    <!-- Breadcrumb -->
    <nav class="flex px-5 py-3 mb-4 text-gray-700 rounded-lg bg-gray-50 dark:bg-white" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <!-- Breadcrumb items -->
      </ol>
    </nav>

    <!-- Page Content -->
    <transition name="fade-slide" mode="out-in">
      <router-view></router-view>
    </transition>
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
