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
              @click="openDetailModal(item)"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-4 py-2 text-left border text-gray-600">{{ item.question }}</td>
              <td class="px-4 py-2 text-left border text-gray-600">{{ item.answer }}</td>
              <td class="px-4 py-2 text-left border text-gray-600">{{ formatDate(item.createdAt) }}</td>
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
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Answer</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Frequency</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Related Qustions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in categoryData"
              :key="index"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.matched_faq_question }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.answer }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.frequency }}</td>
              <td class="px-4 py-2 text-left border text-gray-600">
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li v-for="(related, i) in item.relatedQuestions.slice(0,2  )" :key="i">
                    {{ related }}
                  </li>
                </ul>
              </td>
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

    <!-- Add FAQ Modal -->
    <transition name="modal-fade">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-green-200">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-2xl text-[#064E3B]">Add New FAQ</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
          </div>

          <form @submit.prevent="addFaq">
            <div class="mb-4">
              <label for="question" class="block font-semibold text-[#064E3B] mb-1">Question:</label>
              <input
                id="question"
                v-model="newFaq.question"
                type="text"
                placeholder="Example: Apa itu HaloPNJ"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 "
              />
            </div>

            <div class="mb-6">
              <label for="answer" class="block font-semibold text-[#064E3B] mb-1">Answer:</label>
              <textarea
                id="answer"
                v-model="newFaq.answer"
                placeholder="HaloPNJ adalah aplikasi berbasis AI untuk keperluan layanan akademik dan kemahasiswaan"
                class="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-green-300 resize-none"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                class="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Edit FAQ Modal -->
    <transition>
      <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-blue-200">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-2xl text-green-800">Edit or delete FAQ</h3>
            <button @click="closeDetailModal" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
          </div>

          <div class="mb-4">
            <label class="font-semibold text-green-800 mb-1 block">ID</label>
            <input v-model="modalChat.id" class="w-full border border-gray-300 rounded px-4 py-2" readonly disabled />
          </div>

          <div class="mb-4">
            <label class="font-semibold text-green-800 mb-1 block">Question</label>
            <input v-model="modalChat.question" class="w-full border border-gray-300 rounded px-4 py-2" />
          </div>

          <div class="mb-4">
            <label class="font-semibold text-green-800 mb-1 block">Answer</label>
            <textarea v-model="modalChat.answer" rows="6" class="w-full border border-gray-300 rounded px-4 py-2 resize-none"></textarea>
          </div>

          <div class="flex justify-end space-x-2 mt-6">
            <button @click="deleteFaq" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            <button @click="editFaq" class="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import Swal from "sweetalert2"
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
      modalChat: null, 
      showModal: false,
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
        // const res = await axios.post("http://localhost:8000/predict");
        const results = res.data.results || [];

        this.categoryData = results.map(item => ({
          question: item.question, 
          answer: item.answer,
          matched_faq_question: item.matched_faq_question,
          frequency: item.frequency,
          relatedQuestions: item.related_questions,
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
        // const response = await api.get('http://localhost:5000/api/chats');
        const response = await api.get('/chats');
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
        // const response = await axios.get("http://localhost:5000/api/faq");
        this.faqData = response.data;
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    },
    async addFaq() {
      try {
        const response = await api.post('/faq/post', this.newFaq)
        // const response = await api.post('http://localhost:5000/api/faq/post', this.newFaq)
        Swal.fire("Success!", "New FAQ has been added", "success");
        await this.fetchFaqData();
        console.log(response)
        this.closeModal();
        this.newFaq = { question: "", answer: ""};
      } catch (error) {
        Swal.fire("Adding faq failed", error.message || "Something went wrong", "error");
      }
    },
    async editFaq() {
      try {
        const id = this.modalChat.id; 
        const payload = {
          question: this.modalChat.question,
          answer: this.modalChat.answer,
        };

        const response = await api.put(`/faq/edit/${id}`, payload)
        // const response = await api.put(`http://localhost:5000/api/faq/edit/${id}`, payload )
        Swal.fire("Success!", "FAQ has been edited", "success");
        await this.fetchFaqData();
        console.log(response)
        this.closeDetailModal();
        this.newFaq = { question: "", answer: ""};
      } catch (error) {
        Swal.fire("Editing faq failed", error.message || "Something went wrong", "error");
      }
    },
    async deleteFaq() {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D33",
        cancelButtonColor: "#064E3B",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          const id = this.modalChat.id;
          const response = await api.delete(`/faq/delete/${id}`);
          // const response = await api.delete(`http://localhost:5000/api/faq/delete/${id}`);
          Swal.fire("Deleted!", "FAQ has been deleted.", "success");
          this.closeDetailModal();
          await this.fetchFaqData();
          this.newFaq = { question: "", answer: "" };
        } catch (error) {
          Swal.fire("Deleting faq failed", error.message || "Something went wrong", "error");
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    openDetailModal(item) {
      this.modalChat = item;
      this.showModal = true;
    },
    closeDetailModal() {
      this.showModal = false;
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
