<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data') // Ganti sesuai URL backend lo
    data.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div>
    <h1>Data dari API</h1>
    <ul>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
