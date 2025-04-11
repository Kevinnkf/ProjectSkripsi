<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div>
    <header>
      <!-- <Sidebar /> -->
    </header>

    <main>
      <div class="min-h-screen grid grid-cols-12 lg:grid grid-rows-1">
        <!-- Sidebar (1st Column) -->
        <aside v-if="$route.path !== '/login'" class="col-span-2 text-white h-screen sticky top-0 overflow-auto z-50">
          <Sidebar/>
        </aside>

        <!-- Content and Footer (2nd Column) -->
        <div class="col-span-10 flex flex-col">
          <!-- Main Content -->
          <div class="flex-grow p-6">
            <!-- Breadcrumb -->
            <nav class="flex px-5 py-3 mb-4 text-gray-700 rounded-lg bg-gray-50 dark:bg-white" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              </ol>
            </nav>
            <router-view></router-view>
          </div>
        </div>
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
