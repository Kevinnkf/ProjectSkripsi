<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";



const message = ref("");
const chatHistory = ref([]);

const sendMessage = async () => {
  if (!message.value) return;

  const userMessage = { message: message.value };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/chats/post",
      userMessage
    );
    chatHistory.value.push({ role: "user", content: message.value });
    chatHistory.value.push({ role: "bot", content: response.data.botReply });

    message.value = ""; // Clear input after
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const fetchChatHistory = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/chats/");

    // Assuming response.data is an array of chat objects
    chatHistory.value = response.data.map((chat) => ({
      user_message: chat.user_message,
      bot_response: chat.bot_response,
    }));

    console.log(chatHistory.value);
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
    <div class="flex-1 overflow-y-auto p-3 border rounded bg-white space-y-3" ref="chatBox">
    <div v-for="(chat, index) in chatHistory" :key="index">

      <!-- User Message (Right Side) -->
      <div class="flex justify-end mb-2" v-if="chat.user_message">
        <div class="p-3 max-w-xs bg-blue-500 text-white rounded-lg">
          <p class="font-bold">You</p>
          <p>{{ chat.user_message }}</p>
        </div>
      </div>

      <!-- Bot Response (Left Side) -->
      <div class="flex justify-start mb-2" v-if="chat.bot_response">
        <div class="p-3 max-w-screen-md bg-gray-300 text-black rounded-lg">
          <p class="font-bold">Bot</p>
          <p>{{ chat.bot_response }}</p>
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

</style>
