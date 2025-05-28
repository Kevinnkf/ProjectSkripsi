<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../services/axios";
import axios from 'axios';

const tableData = ref([]);
onMounted(async () => {
  try {
    const response = await api.get("/faq");
    tableData.value = response.data;
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
  }
});
</script>

<template>
  <section id="faq" class="px-6 bg-gradient-to-b from-green-100 py-20">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-3xl font-extrabold text-[#064E3B] mb-12 text-center">
        Frequently Asked Questions
      </h2>
      <div v-if="!tableData.length" class="text-center text-gray-400 my-10">
        Tidak ada data FAQ saat ini.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="bg-white p-6 rounded-xl shadow border border-green-50"
        >
          <h3 class="text-lg font-bold text-green-700 mb-2">{{ item.question }}</h3>
          <p class="text-gray-700">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
