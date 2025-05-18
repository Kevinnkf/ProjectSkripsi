<template>
<div>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard Page</h1>
    <p>Welcome to the Dashboard section!</p>
  </div>

  <div class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
    <div class="flex-row justify-between">
      <div class="flex flex-wrap justify-between gap-4 p-6 bg-white">
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Questions Asked</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 28</p>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Users per Day</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 30</p>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Base Knowledge</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 12</p>
        </div>
      </div>
    </div>
    <div class="flex-col justify-between">
      <div class="p-6 pb-0 mb-2 bg-white rounded-t-2xl">
        <h1 class="text-2xl font-bold"> Chatbot response in the last 7 days</h1>
        <!-- Check if chatData is empty -->
        <div v-if="chatData.length === 0" class="text-center text-gray-500 my-8">
          <h3 class="text-lg font-semibold">There are no data for now.</h3>
        </div>

        <!-- <p>Chat fot </p> -->
        <canvas id="myChart" width="400" height="100"></canvas>
      </div>
    </div>
    <div class="flex-auto px-0 pt-0 pb-2 space-x-5">
      <div class="p-4 overflow-x-auto">
        <div class="flex justify-between items-center">
          <div class="p-6">
            <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
            <p>See what's user has been up to here</p>
          </div>
          <div class="p-6">
            <button @click="openModal" class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg transition">
              Add new FAQ
            </button>
          </div>
        </div>

        <!-- If no data -->
        <div v-if="faqData.length === 0" class="text-center text-gray-500 my-8">
          <h3 class="text-lg font-semibold">There are no data for now.</h3>
        </div>

        <div v-else v-for="(item, index) in faqData" :key="index" class="space-y-6 text-left md:px-12 my-4">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold">{{ item.question }}</h3>
            <p class="text-gray-700 mt-2">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
      <!-- Modal -->
      <transition name="modal-fade">
        <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
        >
        <div class="bg-white p-6 rounded-md w-1/2 overflow-y-auto max-h-[90vh]">
          <h2 class="text-xl font-bold mb-4">Register New Admin</h2>

          <form @submit.prevent="addFaq">
            <div class="mb-4">
              <label for="question" class="block text-sm font-semibold">question</label>
              <input
                id="question"
                v-model="newFaq.question"
                type="text"
                placeholder="Example: Apa itu HaloPNJ"
                class="w-full p-2.5 border rounded resize"
              />
            </div>

            <div class="mb-4">
              <label for="answer" class="block text-sm font-semibold">answer</label>
              <textarea
                id="answer"
                v-model="newFaq.answer"
                placeholder="HaloPNJ adalah aplikasi berbasis AI untuk keperluan layanan akademik dan kemahasiswaan"
                class="w-full p-2.5 border rounded h-32 resize"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-200 text-black px-4 py-2 rounded mr-2"
              >
                Back
              </button>
              <button
                type="submit"
                class="bg-green-800 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
     </transition>
</div>
</template>



<script>
import Chart from 'chart.js/auto'
import Swal from "sweetalert2"
import api from "../services/axios.js";

export default {
  data() {
    return {
      chatData: [],
      faqData: [],
      chart: null,
      isModalOpen: false,
      newFaq: {
        question: "",
        answer: "",
      },
    }
  },
  mounted() {
    this.renderChart()
    this.fetchChatData()
    this.fetchFaqData()
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    getLast7DaysLabels() {
      const days = []
      const today = new Date()
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const isoDate = d.toISOString().split('T')[0] // '2025-05-01'
        days.push({
          date: isoDate,
          label: dayNames[d.getDay()],
        })
      }

      return days
    },

    countMessagesPerDay(data, days) {
      if (!Array.isArray(data)) {
        console.warn("Expected 'data' to be an array but got:", data);
        data = []; // fallback to empty array instead of breaking
      }

      return days.map(dayObj => {
        const count = data.filter(chat => {
          const createdAt = chat.createdAt || chat.created_at || '';
          return typeof createdAt === 'string' && createdAt.startsWith(dayObj.date);
        }).length;
        return count;
      });
    },

    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Chatbot Responses (Last 7 Days)',
            data: [],
            borderColor: '#60a5fa',
            backgroundColor: '#60a5fa33',
            tension: 0.4,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0, 
              },
            },
          },
        },
      })
    },
    async fetchFaqData() {
      try {
        const response = await api.get("/faq"); // Ensure this is the correct route
        
        this.faqData = response.data;

      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    },
    async fetchChatData() {
      try {
        const response = await fetch('http://localhost:5000/api/chats/get')
        const data = await response.json()
        const chatData = data.chats
        
        const dayObjects = this.getLast7DaysLabels()
        const labels = dayObjects.map(d => d.label)
        const values = this.countMessagesPerDay(chatData, dayObjects)

        this.chart.data.labels = labels
        this.chart.data.datasets[0].data = values
        this.chart.update()

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async addFaq() {
      try {
        const response = await api.post('/faq/post', this.newFaq)
        console.log("Success:", response.data);
        Swal.fire("Success!", "New FAQ has been added", "success");
        // Refresh the table data
        await this.fetchFaqData();
        this.closeModal();

        // Reset form
        this.newFaq = { question: "", answer: ""};
      } catch (error) {
        Swal.fire("Adding faq failed", error.message || "Something went wrong", "error");
      }
    },
  },
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>