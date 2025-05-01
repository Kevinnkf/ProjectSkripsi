<template>
  <div class="bg-white w-full sticky">
    <nav class="flex flex-col md:flex-row items-center justify-between px-6 py-8 w-full">
      <div class="flex items-center justify-between w-full md:w-auto">
        <!-- <router-link to="/" class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400">
        </router-link> -->
        <!-- Mobile menu button -->
      </div>

      <!-- Navigation links -->
      <ul
        class="flex flex-row items-end space-x-5 bg-white md:flex-row md:space-x-10 md:items-end justify-end w-full md:w-auto transition-all duration-300 ease-in-out mt-4 md:mt-0"
      >
        <li class="text-md font-poppins font-bold text-gray-800 hover:text-blue-400 cursor-pointer">Home</li>
        <li class="text-md font-poppins font-bold text-gray-800 hover:text-blue-400 cursor-pointer">Akademik</li>
        <li class="text-md font-poppins font-bold text-gray-800 hover:text-blue-400 cursor-pointer">Contact Us</li>

      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: true,
    };
  },
};
</script>
