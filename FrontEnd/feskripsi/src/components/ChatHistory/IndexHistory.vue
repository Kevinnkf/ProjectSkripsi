<template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-2xl font-bold">Chat History Page</h1>
      <p>Welcome to the Chat History page!</p>
    </div>

    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-semibold">List of All Chats</h2>
      <div class="space-x-2">
        <button
          @click="exportJSON"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
        >
          Export JSON
        </button>
        <button
          @click="exportCSV"
          class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg transition"
        >
          Export CSV
        </button>
      </div>
    </div>

    <div class="overflow-x-auto px-6 pb-6">
      <table class="table-fixed w-full border-collapse border border-gray-200 text-slate-500">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">Chat ID</th>
            <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">User Message</th>
            <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">Bot Response</th>
            <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(chat, idx) in chatData"
            :key="chat.id || idx"
            class="border border-gray-200 hover:bg-gray-50"
          >
            <td class="px-4 py-2 border border-gray-200 text-gray-700">{{ chat.chat_id }}</td>
            <td class="px-4 py-2 border border-gray-200 text-gray-700">{{ chat.user_message }}</td>
            <td class="px-4 py-2 border border-gray-200 text-gray-700">{{ chat.bot_response }}</td>
            <td class="px-4 py-2 border border-gray-200 text-gray-700">{{ chat.feedback }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatHistoryPage',
  data() {
    return {
      chatData: []
    };
  },
  mounted() {
    this.fetchChatHistory();
  },
  methods: {
    async fetchChatHistory() {
      try {
        const res = await axios.get('http://localhost:5000/api/chats/with-feedback');
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
        c.id,
        `"${(c.user_message || '').replace(/"/g, '""')}"`,
        `"${(c.bot_response || '').replace(/"/g, '""')}"`,
        `"${(c.feedback || '').replace(/"/g, '""')}"`
      ].join(','));
      const csvContent = [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chat_history.csv';
      a.click();
      URL.revokeObjectURL(url);
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
