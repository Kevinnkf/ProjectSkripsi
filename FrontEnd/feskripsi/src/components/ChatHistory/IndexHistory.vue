<template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-3xl font-bold text-black mb-2 drop-shadow">Chat History Page</h1>
      <p>Welcome to the Chat History page!</p>
    </div>

    <div class="flex items-center justify-between mb-4 px-6">
  <h2 class="text-xl font-semibold text-black mb-2 drop-shadow">List of All Chats</h2>
  
  <div class="flex items-center gap-4">
    <!-- Feedback Accumulation -->
    <div class="flex items-center gap-6 bg-gray-50 border border-gray-200 rounded-lg px-6 py-2 shadow-sm w-fit"
         style="min-width: 270px;">
      <div class="flex items-center gap-1">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span class="text-base font-semibold text-green-700">{{ positivePercent }}%</span>
        <span class="text-gray-600 text-xs ml-1">Positive</span>
      </div>
      <div class="w-px h-5 bg-gray-300 mx-2"></div>
      <div class="flex items-center gap-1">
        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="text-base font-semibold text-red-600">{{ negativePercent }}%</span>
        <span class="text-gray-600 text-xs ml-1">Negative</span>
      </div>
      <div class="w-px h-5 bg-gray-300 mx-2"></div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500 text-xs">Total:</span>
        <span class="font-bold text-gray-700 text-sm">{{ totalFeedback }}</span>
      </div>
    </div>

    <!-- Export Buttons -->
    <div class="flex space-x-2">
      <button
        @click="exportJSON"
        class="inline-flex items-center px-4 py-2 bg-white text-[#064E3B] hover:bg-green-100 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
      >
        <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Export JSON
      </button>
      <button
        @click="exportCSV"
        class="inline-flex items-center px-4 py-2 bg-green-100 text-[#064E3B] hover:bg-green-200 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
      >
        <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-8m-4 4h8"/>
        </svg>
        Export CSV
      </button>
    </div>
  </div>
</div>

  <div class="overflow-x-auto px-6 pb-6">
  <div class="shadow-lg rounded-2xl border border-gray-100 bg-white">
    <table class="min-w-full rounded-2xl overflow-hidden">
      <thead class="bg-[#064E3B]">
        <tr>
          <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Chat ID</th>
          <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">User Message</th>
          <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Bot Response</th>
          <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Feedback</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(chat, idx) in paginatedChats"
          :key="chat.chat_id || idx"
          class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50 group"
          @click="openModal(chat)"
        >
          <td class="px-6 py-3 text-gray-700 font-mono">{{ chat.chat_id }}</td>
          <td class="px-6 py-3 text-gray-800 truncate max-w-xs">
            {{ chat.user_message && chat.user_message.length > 40 ? chat.user_message.slice(0,40) + '…' : chat.user_message }}
          </td>
          <td class="px-6 py-3 text-gray-800 truncate max-w-xs group-hover:bg-blue-100/40 transition-colors">
            <span class="italic">
              {{ chat.bot_response && chat.bot_response.length > 60 ? chat.bot_response.slice(0, 60) + '…' : chat.bot_response }}
            </span>
            <span v-if="chat.bot_response && chat.bot_response.length > 60" class="text-blue-500 ml-2 text-xs">(click for more)</span>
          </td>
          <td class="px-6 py-3">
            <span v-if="chat.feedback === 'good'" class="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              Good
            </span>
            <span v-else-if="chat.feedback === 'bad'" class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
              Bad
            </span>
            <span v-else class="inline-block text-gray-400 text-xs italic">No feedback</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center mt-4 space-x-2 items-center">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-100 rounded hover:bg-blue-100 text-bg-[#064E3B] font-semibold disabled:opacity-50"
    >Previous</button>
    <span class="font-medium text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-gray-100 rounded hover:bg-blue-100 text-bg-[#064E3B] font-semibold disabled:opacity-50"
    >Next</button>
  </div>
</div>

<!-- Modal for Detail View -->
<div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
  <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-blue-200">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-2xl text-bg-[#064E3B]">Chat Detail</h3>
      <button @click="showModal=false" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
    </div>
    <div class="mb-4">
      <div class="font-semibold text-bg-[#064E3B] mb-1">User Message:</div>
      <div class="bg-blue-50 p-3 rounded text-gray-700 font-mono break-words">{{ modalChat?.user_message }}</div>
    </div>
    <div class="mb-2">
      <div class="font-semibold text-bg-[#064E3B] mb-1">Bot Response:</div>
      <div class="bg-blue-50 p-3 rounded text-gray-700 whitespace-pre-line max-h-60 overflow-auto font-mono break-words">
        {{ modalChat?.bot_response }}
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import api from '../../services/axios.js'; 

export default {
  name: 'ChatHistoryPage',
  data() {
    return {
      chatData: [],
      currentPage: 1,
      perPage: 10,
      showModal: false,
    modalChat: null,
    };
  },
  computed: {
  paginatedChats() {
    const start = (this.currentPage - 1) * this.perPage;
    return this.chatData.slice(start, start + this.perPage);
  },
  totalPages() {
    return Math.ceil(this.chatData.length / this.perPage) || 1;
  },
  // --- FEEDBACK STATS ---
  totalFeedback() {
    return this.chatData.filter(c => c.feedback === "good" || c.feedback === "bad").length;
  },
  positiveFeedback() {
    return this.chatData.filter(c => c.feedback === "good").length;
  },
  negativeFeedback() {
    return this.chatData.filter(c => c.feedback === "bad").length;
  },
  positivePercent() {
    if (!this.totalFeedback) return 0;
    return Math.round((this.positiveFeedback / this.totalFeedback) * 100);
  },
  negativePercent() {
    if (!this.totalFeedback) return 0;
    return Math.round((this.negativeFeedback / this.totalFeedback) * 100);
  }
},
  mounted() {
    this.fetchChatHistory();
  },
  methods: {
    async fetchChatHistory() {
      try {
        // const res = await axios.get('http://localhost:5000/api/chats/with-feedback');
        const res = await api.get("/chats/with-feedback");
        this.chatData = res.data;
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    },
    exportJSON() {
      const dataStr = JSON.stringify(this.chatData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chat_history.json';
      a.click();
      URL.revokeObjectURL(url);
    },
    exportCSV() {
      if (!this.chatData.length) return;
      const headers = ['Chat ID', 'User Message', 'Bot Response', 'Feedback'];
      const rows = this.chatData.map(c => [
        c.chat_id,
        `"${(c.user_message || '').replace(/"/g, '""')}"`,
        `"${(c.bot_response || '').replace(/"/g, '""')}"`,
        `"${(c.feedback || '').replace(/"/g, '""')}"`,
      ].join(','));
      const csvContent = [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chat_history.csv';
      a.click();
      URL.revokeObjectURL(url);
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    openModal(chat) {
    this.modalChat = chat;
    this.showModal = true;
  }
  }
};
</script>

<style scoped>
table th,
table td {
  vertical-align: top;
  word-wrap: break-word;
}
</style>
