<script setup lang="ts">
import { ref } from "vue";

const topics = ref([
  "Prosedur Pembuatan Surat Keterangan",
  "Pengajuan Beasiswa",
  "Legalisasi Dokumen",
  "Registrasi Mahasiswa",
  "Perubahan Data",
  "Pengajuan Cuti",
  "Pembayaran UKT",
  "Prosedur Lainnya"
]);
</script>

<template>
  <section id="about" class="px-6 py-28 bg-gradient-to-b from-green-100 via-white to-white">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-extrabold text-[#064E3B] mb-6">
          Apa itu <span class="text-green-700">HaloPNJ</span>?
        </h2>
        <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-8 animate-fadein">
          <span
            v-for="topic in topics"
            :key="topic"
            class="px-4 py-2 mb-2 mr-2 rounded-full cursor-pointer border border-green-400 bg-green-50 hover:bg-green-600 hover:text-white text-green-700 font-semibold shadow-sm transition duration-150 ease-in-out scale-95 hover:scale-105 active:scale-95"
            tabindex="0"
          >
            {{ topic }}
          </span>
        </div>
        <p class="text-xs text-gray-400 mt-3">Beberapa topik tersedia!</p>
      </div>
      <div class="md:w-1/2">
        <div class="bg-white/70 rounded-2xl shadow-lg p-8">
          <p class="text-gray-700 text-lg leading-relaxed text-justify max-w-2xl mx-auto md:mx-0">
            <span class="font-bold text-green-800">HaloPNJ</span> adalah asisten virtual resmi PNJ yang siap membantu mahasiswa, lulusan, maupun dosen dalam mendapatkan informasi, prosedur, dan panduan administratif kampus sesuai SOP PNJ.<br /><br />
            Tanyakan apa saja seputar kampus, mulai dari pembuatan surat keterangan, legalisasi dokumen, beasiswa, hingga info perubahan data mahasiswa, tanpa batasan waktu dan tempat.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadein {
  animation: fadein 1s ease;
}
</style>
