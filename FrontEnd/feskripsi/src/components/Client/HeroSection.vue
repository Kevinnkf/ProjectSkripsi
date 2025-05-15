<script setup lang="ts">

</script>

<template>
    <div>
        <section id="home" class="px-6 bg-gradient-to-t from-green-100 to-white">
            <div class="max-w-7xl h-screen mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                
                <!-- Left Side -->
                <div class="text-center md:text-left md:w-1/2">
                <img src="@/assets/pnj-logo.png" alt="HaloPNJ Logo" class="w-30 h-24 mx-auto md:mx-0 mb-4" />

                <h1 class="text-3xl md:text-5xl font-bold text-green-800 mb-4">
                    Chatbot Resmi Layanan Akademik dan Kemahasiswaan PNJ
                </h1>
                </div>

                <!-- Right Side -->
                <div class="text-center md:text-left md:w-1/2">
                <p class="text-lg md:text-xl text-gray-700 max-w-xl mb-6">
                    Solusi cepat untuk kebutuhan informasi akademik dan kemahasiswaan mahasiswa PNJ.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                    🔎 Mulai Bertanya Sekarang
                    </button>
                    <button class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                    📖 Pelajari Lebih Lanjut
                    </button>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>