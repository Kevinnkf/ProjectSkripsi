<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";

const message = ref("");
const chatHistory = ref([]);

const scrollToBottom = () => {
  nextTick(() => {
    const chatBox = document.querySelector('.overflow-y-auto');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!message.value) return;

  // Add user message immediately
  chatHistory.value.push({ 
    user_message: message.value,
    bot_response: "" 
  });
  scrollToBottom();
  
  const userMessage = { message: message.value };
  message.value = "";

  try {
    const response = await axios.post(
      "http://localhost:5000/api/chats/post",
      userMessage
    );
    
    // Update with bot's response
    chatHistory.value[chatHistory.value.length - 1].bot_response = response.data.botReply;
    scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
    chatHistory.value[chatHistory.value.length - 1].bot_response = "Error getting response from bot";
    scrollToBottom();
  }
};

const fetchChatHistory = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/chats/");
    chatHistory.value = response.data.map((chat) => ({
      user_message: chat.user_message,
      bot_response: chat.bot_response,
    }));
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

onMounted(fetchChatHistory);
</script>

<template>
  <div class="d-flex flex-column vh-200">
    <!-- Chat Section -->
    <div class="flex flex-col w-full max-w-screen-2xl mx-auto h-[700px] p-4 bg-gray-100 rounded-lg shadow-lg">
      <!-- Chat History -->
      <div class="flex-1 overflow-y-auto p-3 border rounded bg-white space-y-3">
        <div v-for="(chat, index) in chatHistory" :key="index">
          <!-- User Message -->
          <div class="flex justify-end mb-2" v-if="chat.user_message">
            <div class="p-3 max-w-xs bg-blue-500 text-white rounded-lg">
              <p class="font-bold">You</p>
              <p>{{ chat.user_message }}</p>
            </div>
          </div>

          <!-- Bot Response -->
          <div class="flex justify-start mb-2">
            <div class="p-3 max-w-screen-md bg-gray-300 text-black rounded-lg">
              <p class="font-bold">Bot</p>
              <p v-if="chat.bot_response">{{ chat.bot_response }}</p>
              <div v-else class="flex space-x-2">
                <div class="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div class="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Section -->
      <div class="flex items-center gap-2 mt-3">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          @click="sendMessage"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>