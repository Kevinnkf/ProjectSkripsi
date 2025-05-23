<script setup lang="ts">
// No JS needed unless you want a contact form to work
</script>

<template>
  <section id="contact" class="px-6 py-20 bg-gradient-to-t from-green-100 to-white text-center">
    <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-green-100">
      <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">
        Contact Us
      </h2>
      <p class="text-gray-700 mb-10">
        Punya pertanyaan lebih lanjut, saran, atau butuh bantuan layanan akademik PNJ?<br>
        Silakan hubungi melalui informasi di bawah ini.
      </p>
      <div class="flex flex-col md:flex-row justify-center items-stretch gap-10">
        <!-- Email & Phone Admin -->
        <div class="flex-1 flex flex-col items-center justify-center">
          <div class="flex items-center mb-3">
            <svg class="w-6 h-6 text-green-700 mr-2" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M22 5L12 13 2 5" />
            </svg>
            <span class="font-semibold text-gray-800">Email</span>
          </div>
          <a href="mailto:akademik@pnj.ac.id"
             class="text-green-700 underline hover:text-green-900 transition mb-4 text-base">
            akademik@pnj.ac.id
          </a>
          <div class="flex items-center mb-3 mt-2">
            <svg class="w-6 h-6 text-green-700 mr-2" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M22 5L12 13 2 5" />
            </svg>
            <span class="font-semibold text-gray-800">Phone Number</span>
          </div>
          <a href="https://wa.me/6282112144860" target="_blank"
             class="text-green-700 underline hover:text-green-900 transition text-base">
            021-7270044 / 0821-1214-4860
          </a>
        </div>
        <!-- Address -->
        <div class="flex-1 flex flex-col items-center justify-center">
          <div class="flex items-center mb-3">
            <svg class="w-6 h-6 text-green-700 mr-2" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.657 16.657L13 21.314l-4.657-4.657A8 8 0 1 1 17.657 16.657z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span class="font-semibold text-gray-800">Alamat</span>
          </div>
          <div class="text-gray-700 text-base text-center">
            Politeknik Negeri Jakarta<br>
            Jl. Prof. DR. G.A. Siwabessy,<br>
            Kampus UI Depok, Jawa Barat 16425
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

