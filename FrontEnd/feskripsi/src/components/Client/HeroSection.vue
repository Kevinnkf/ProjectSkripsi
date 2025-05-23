<script setup lang="ts">
// No logic needed
</script>

<template>
  <section
    id="home"
    class="px-6 pt-36 md:pt-44 pb-16 min-h-[85vh] bg-gradient-to-t from-green-100 to-white transition"
  >
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <!-- Left Side -->
      <div class="flex-1 text-center md:text-left md:pr-8">
        <div class="mb-4 flex md:hidden justify-center">
          <img src="@/assets/pnj-logo.png" alt="HaloPNJ Logo" class="h-16 w-16 object-contain" />
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold text-green-900 mb-4 leading-tight drop-shadow">
          Chatbot Resmi Layanan Akademik dan Kemahasiswaan PNJ
        </h1>
        <p class="text-lg md:text-xl text-gray-700 mb-8">
          Solusi cepat untuk kebutuhan informasi akademik dan kemahasiswaan mahasiswa PNJ.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="/chatbot"
            class="inline-flex items-center justify-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow transition"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Mulai Bertanya
          </a>
          <a href="#about"
            class="inline-flex items-center justify-center px-6 py-3 bg-white border border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M17 8l4 4-4 4M3 12h18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
      <!-- Right Side -->
      <div class="flex-1 flex justify-center items-center">
        <img
          src="@/assets/pnj-logo.png"
          alt="HaloPNJ Logo"
          class="h-64 w-64 object-contain shadow-xl rounded-2xl bg-white"
        />
      </div>
    </div>
  </section>
</template>
