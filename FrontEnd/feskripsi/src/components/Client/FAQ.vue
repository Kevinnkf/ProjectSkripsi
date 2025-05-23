<script setup lang="ts">

</script>

<template>
  <div>
    <!-- FAQ -->
    <section id="faq" class="px-6 bg-gradient-to-b from-green-100 text-center py-20">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-12">Frequently Asked Questions</h2>

        <div v-for="(item, index) in tableData" :key="index" class="space-y-6 text-left md:px-12 my-4">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold text-green-700">{{ item.question }}</h3>
            <p class="text-gray-700 mt-2">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script     setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../services/axios";

const tableData = ref([]);

onMounted(async () => {
  try { 
    const response = await api.get("/faq"); // Ensure this is the correct route
    tableData.value = response.data;
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
  }
});
</script>