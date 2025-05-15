<template>
<div>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard Page</h1>
    <p>Welcome to the Dashboard section!</p>
  </div>

  <div
    class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
  >
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
        <!-- <p>Chat fot </p> -->
        <canvas id="myChart" width="400" height="100"></canvas>
      </div>
    </div>
    <div class="flex-auto px-0 pt-0 pb-2 space-x-5">
      <div class="p-4 overflow-x-auto">
        <div class="p-6">
          <h1 class="text-2xl font-bold">Frequently Asked Questions</h1>
          <p>See what's user has been up to here</p>
        </div>

        <!-- Data Table -->
        <table
          id="data-table"
          class="table-fixed w-full border-collapse border border-gray-200 text-slate-500"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                ID Chat
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                ID User
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                User Message
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                Bot Response
              </th>
              <th class="px-4 py-2 text-center font-bold uppercase border border-gray-200">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="border border-gray-200 hover:bg-gray-100"
            >
              <td
                v-for="value in Object.values(item)"
                :key="value"
                class="px-4 py-2 border border-gray-200 text-gray-600"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      chatData: [],
      chart: null,
    }
  },
  mounted() {
    this.renderChart()
    this.fetchChatData()
  },
  methods: {
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
    async fetchChatData() {
      try {
        const response = await fetch('http://localhost:5000/api/chats')
        const data = await response.json()
        this.chatData = data

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
  },
}
</script>
