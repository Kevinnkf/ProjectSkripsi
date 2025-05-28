                                                                                                              <template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-3xl font-bold text-black mb-2 drop-shadow">FAQ Page</h1>
      <p>Welcome to the FAQ section!</p>
    </div>

    <!-- Header & Action -->
    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-semibold text-black mb-2 drop-shadow">List of Active FAQ</h2>
      <button
        @click="openModal"
        class="inline-flex items-center px-4 py-2 bg-green-100 text-[#064E3B] hover:bg-green-200 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
      >
        <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Add new FAQ
      </button>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto px-6 pb-6">
      <div class="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <table class="min-w-full rounded-2xl overflow-hidden">
          <thead class="bg-[#064E3B]">
            <tr>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Question</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Answer</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in faqData"
              :key="index"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.question }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.answer }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ formatDate(item.createdAt) }}</td>
              <!-- <td class="px-4 py-2 text-center border text-gray-600">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editAdmin(item)"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteAdmin(item)"
                    class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-semibold text-black mb-2 drop-shadow">Classified FAQ</h2>
      <button
        @click="fetchClassifiedData"
        class="inline-flex items-center px-4 py-2 bg-green-100 text-[#064E3B] hover:bg-green-200 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
      >
        <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Refresh
      </button>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto px-6 pb-6">
      <div class="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <table class="min-w-full rounded-2xl overflow-hidden">
          <thead class="bg-[#064E3B]">
            <tr>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Question</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Classified Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in categoryData"
              :key="index"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.questions }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.predicted_category }}</td>
              <!-- <td class="px-4 py-2 text-center border text-gray-600">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editAdmin(item)"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteAdmin(item)"
                    class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
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
import { Axios } from 'axios';
import api from "../../services/axios.js";
import ragApi from "../../services/ragAxios.js";
import axios from 'axios';

export default {
  data() {
    return {
      questionsThisWeek: 0,
      chatData: [],
      faqData: [],
      categoryData: [],
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
    this.fetchClassifiedData();
  },
  methods: {
    async fetchClassifiedData() {
        try {
            const res = await ragApi.post("/predict", {});
            const data = res.data;
            
            const questions = data.questions || [];
            const categories = data.predicted_categories || [];

            // Combine into one array of objects
            this.categoryData = questions.map((question, index) => ({
              questions: question,
              predicted_category: categories[index],
              createdAt: new Date().toISOString(),
              }));
        } catch (err) {
          console.error("Failed to fetch classification data:", err);
        }
    },

    async fetchQuestionsThisWeek() {
      try {
        const res = await api.get('/chats/count-this-week');
        this.questionsThisWeek = res.data.count || 0;
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
        const response = await api.get('/chats/get');
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
