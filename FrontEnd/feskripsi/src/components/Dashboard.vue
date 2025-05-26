<template>
  <div class="p-8 min-h-screen bg-gradient-to-br from-green-50 to-white rounded-2xl">
    <!-- Header Section -->
    <div class="mb-4">
      <h1 class="text-3xl font-bold text-[#064E3B] drop-shadow">Dashboard</h1>
      <p class="text-gray-700">Welcome to the Dashboard section!</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="flex flex-col justify-center items-start p-6 bg-white border border-gray-100 rounded-2xl shadow hover:shadow-md transition min-h-[120px]">
        <span class="text-gray-500 text-xs mb-1">Questions Asked</span>
        <span class="text-3xl font-extrabold text-[#064E3B] mb-2">{{ questionsThisWeek }}</span>
        <span class="text-sm text-gray-400">This week</span>
      </div>
      <div class="flex flex-col justify-center items-start p-6 bg-white border border-gray-100 rounded-2xl shadow hover:shadow-md transition min-h-[120px]">
        <span class="text-gray-500 text-xs mb-1">Users per Day</span>
        <span class="text-3xl font-extrabold text-[#064E3B] mb-2">{{ 30 }}</span>
        <span class="text-sm text-gray-400">Average</span>
      </div>
      <div class="flex flex-col justify-center items-start p-6 bg-white border border-gray-100 rounded-2xl shadow hover:shadow-md transition min-h-[120px]">
        <span class="text-gray-500 text-xs mb-1">Base Knowledge</span>
        <span class="text-3xl font-extrabold text-[#064E3B] mb-2">{{ 12 }}</span>
        <span class="text-sm text-gray-400">Documents</span>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-8">
    <h2 class="text-xl font-semibold text-[#064E3B] mb-3">Chatbot Responses in the Last 7 Days</h2>
      <div v-if="last7DaysCounts.every(cnt => cnt === 0)" class="text-center text-gray-500 my-8">
          <h3 class="text-lg font-semibold">There are no data for now.</h3>
      </div>
      <div v-else>
        <canvas id="myChart" width="400" height="120"></canvas>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 class="text-2xl font-bold text-[#064E3B]">Frequently Asked Questions</h2>
          <p class="text-gray-500">See what users have been up to here</p>
        </div>
        <button @click="openModal"
          class="inline-flex items-center px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg shadow transition font-semibold mt-4 sm:mt-0">
          + Add new FAQ
        </button>
      </div>
      <!-- If no data -->
      <div v-if="faqData.length === 0" class="text-center text-gray-500 my-8">
        <h3 class="text-lg font-semibold">There are no data for now.</h3>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(item, index) in faqData" :key="index" class="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-[#064E3B]">{{ item.question }}</h3>
          <p class="text-gray-700 mt-2">{{ item.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white p-8 rounded-2xl w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 class="text-xl font-bold mb-4 text-[#064E3B]">Add New FAQ</h2>
          <form @submit.prevent="addFaq">
            <div class="mb-4">
              <label for="question" class="block text-sm font-semibold">Question</label>
              <input
                id="question"
                v-model="newFaq.question"
                type="text"
                placeholder="Example: Apa itu HaloPNJ"
                class="w-full p-3 border border-gray-200 rounded focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div class="mb-4">
              <label for="answer" class="block text-sm font-semibold">Answer</label>
              <textarea
                id="answer"
                v-model="newFaq.answer"
                placeholder="HaloPNJ adalah aplikasi berbasis AI untuk keperluan layanan akademik dan kemahasiswaan"
                class="w-full p-3 border border-gray-200 rounded h-32 focus:ring-2 focus:ring-green-300"
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
      questionsThisWeek: 0,
      chatData: [],
      faqData: [],
      chart: null,
      isModalOpen: false,
      newFaq: {
        question: "",
        answer: "",
      },
      last7DaysLabels: [],
      last7DaysCounts: [],
    }
  },
  mounted() {
    this.fetchQuestionsThisWeek();
    this.fetchChatData();
    this.fetchFaqData();
  },
  methods: {
    async fetchQuestionsThisWeek() {
      try {
        const res = await api.get('chats/count-this-week');
        const data = await res.json();
        this.questionsThisWeek = data.count || 0;
      } catch (err) {
        console.error("Failed to fetch questions count this week:", err);
      }
    },
    getLast7DaysLabelsAndDates() {
      // Returns { labels: ['Sun',...], days: ['2024-07-04', ...] }
      const labels = [];
      const days = [];
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const isoDate = d.toISOString().slice(0, 10);
        labels.push(dayNames[d.getDay()]);
        days.push(isoDate);
      }
      return { labels, days };
    },
    countMessagesPerDay(data, days) {
      return days.map(day =>
        data.filter(chat => {
          const created = chat.created_at || chat.createdAt || "";
          return typeof created === "string" && created.startsWith(day);
        }).length
      );
    },
    async fetchChatData() {
      try {
        const response = await api.get('chats/get');
        const data = await response.json();
        const chatData = data.chats || [];
        this.chatData = chatData;

        const { labels, days } = this.getLast7DaysLabelsAndDates();
        this.last7DaysLabels = labels;
        this.last7DaysCounts = this.countMessagesPerDay(chatData, days);

        // Only render if there is at least one value > 0
        if (this.last7DaysCounts.some(cnt => cnt > 0)) {
          this.$nextTick(() => this.renderChart());
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    },
    renderChart() {
      const ctx = document.getElementById('myChart');
      if (!ctx) return;
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.last7DaysLabels,
          datasets: [{
            label: 'Chatbot Responses (Last 7 Days)',
            data: this.last7DaysCounts,
            borderColor: '#60a5fa',
            backgroundColor: '#60a5fa33',
            tension: 0.4,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, ticks: { precision: 0 } },
          },
        },
      });
    },
    async fetchFaqData() {
      try {
        const response = await api.get("/faq");
        this.faqData = response.data;
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    },
    async addFaq() {
      try {
        const response = await api.post('/faq/post', this.newFaq)
        Swal.fire("Success!", "New FAQ has been added", "success");
        await this.fetchFaqData();
        this.closeModal();
        this.newFaq = { question: "", answer: ""};
      } catch (error) {
        Swal.fire("Adding faq failed", error.message || "Something went wrong", "error");
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
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
