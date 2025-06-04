<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import Navbar from "./Navbar.vue";
import api from "../services/axios.js";

const message = ref("");
const chatHistory = ref([]);

// Example queries for greeting
const exampleQueries = [
  "Dimana web pembuatan surat keterangan aktif?",
  "Siapa direktur PNJ?",
  "Kemana saja rute Bipol?",
  "Bagaimana registrasi mahasiswa baru?"
];

const scrollToBottom = () => {
  nextTick(() => {
    const chatBox = document.querySelector('.overflow-y-auto');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
};

const sendMessage = async (customMessage = null) => {
  const msgToSend = customMessage !== null ? customMessage : message.value;
  if (!msgToSend) return;

  // Add user's message
  chatHistory.value.push({ 
    user_message: msgToSend,
    bot_response: "",
    chat_id: null,
    feedback: null
  });
  scrollToBottom();

  // Clear input if not custom (user-typed)
  if (customMessage === null) message.value = "";

  try {
    const response = await api.post("/chats/post", { message: msgToSend });
    const chat_id = response.data.chat_id || response.data.chatId;

    // Update last message entry with chat_id and bot response
    const lastChat = chatHistory.value[chatHistory.value.length - 1];
    lastChat.bot_response = response.data.botReply;
    lastChat.chat_id = chat_id;

    scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
    chatHistory.value[chatHistory.value.length - 1].bot_response = "Error getting response from bot";
    scrollToBottom();
  }
};

const sendFeedback = async (chat, type) => {
  if (chat.feedback) {
    console.log("Feedback already submitted.");
    return;
  }
  try {
    await api.post("feedback/post", {
      chat_id: chat.chat_id,
      response: type
    });
    chat.feedback = type;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === "Feedback for this chat_id already exists"
    ) {
      chat.feedback = type;
    } else {
      console.error("Feedback Error:", error.response?.data || error);
    }
  }
};

const hasFeedback = (chat, type) => {
  return chat.feedback === type;
};
</script>

<template>
<div>
<Navbar/>
  <div class="d-flex flex-column">
    <!-- Chat Section -->
    <div class="flex flex-col w-full max-w-screen-2xl mx-auto h-screen p-4 bg-[#f5f7fa] rounded-lg shadow-lg chat-box pt-20">
      <!-- Chat History -->
      <div class="px-60 w-100 flex-1 overflow-y-auto p-3 rounded bg-white space-y-6">

        <!-- Bot Greeting with Example Queries -->
        <div class="flex justify-start mb-2">
          <div class="flex items-start space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=Chatbot+PNJ&background=10B981&color=fff&size=36"
              alt="Bot"
              class="w-12 h-12 rounded-full shadow-md border-2 border-green-300"
            />
            <div class="bg-gradient-to-br from-green-100 to-white border border-green-300 px-6 py-4 rounded-2xl shadow-md max-w-xl">
              <p class="leading-relaxed text-green-900 mb-4 font-semibold text-lg">
                Halo, selamat datang di <b>HaloPNJ</b>!<br />
                <span class="font-normal text-green-800 text-base">
                  Silakan tanyakan informasi seputar prosedur kampus,
                  administrasi, atau hal akademik lainnya.<br>
                  Kami siap membantu kapan saja!
                </span>
              </p>
              <!-- Example Queries -->
              <div class="mb-1 flex flex-wrap gap-2">
                <span
                  v-for="(ex, i) in exampleQueries"
                  :key="i"
                  @click="sendMessage(ex)"
                  class="cursor-pointer px-3 py-2 bg-white border border-green-400 text-green-800 rounded-full text-xs font-medium flex items-center shadow hover:bg-green-100 hover:border-green-600 hover:shadow-lg transition"
                >
                  <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8m-4-4v8" /></svg>
                  {{ ex }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Bot Greeting -->

        <div v-for="(chat, index) in chatHistory" :key="index">
          <!-- User Message -->
          <div v-if="chat.user_message" class="mb-2">
            <div class="flex justify-end items-center space-x-2">
              <div class="max-w-lg px-6 py-3 bg-white border border-[#2ed477] rounded-2xl shadow-md text-base font-normal text-[#1d4734]">
                <p class="text-justify leading-relaxed">
                  {{ chat.user_message }}
                </p>
              </div>
              <div class="bg-[#23af59] w-10 h-10 flex items-center justify-center rounded-full text-white text-base font-bold ml-2 shadow border-2 border-white">
                U
              </div>
            </div>
          </div>

          <!-- Bot Response -->
          <div v-if="chat.bot_response || !chat.bot_response" class="mb-2">
            <div class="flex justify-start">
              <div class="flex items-start space-x-3">
                <img
                  src="https://ui-avatars.com/api/?name=Chatbot+PNJ&background=10B981&color=fff&size=36"
                  alt="Bot"
                  class="w-10 h-10 rounded-full shadow border-2 border-green-200"
                />
                <div class="p-5 bg-gradient-to-br from-gray-100 to-green-50 rounded-2xl shadow max-w-xl border border-green-100">
                  <p class="text-justify leading-relaxed font-normal text-gray-700 text-base" v-if="chat.bot_response">
                    {{ chat.bot_response }}
                  </p>
                  <div v-else class="flex space-x-2 items-center">
                    <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div>
                    <span class="ml-2 text-gray-400 text-sm">Typing…</span>
                  </div>
                  <!-- Feedback -->
                  <div class="flex justify-start mt-3 space-x-2">
                    <svg 
                      v-if="!chat.feedback || hasFeedback(chat, 'good')"
                      @click = "sendFeedback(chat, 'good')"
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" height="20"
                      :fill="hasFeedback(chat, 'good') ? 'green' : 'currentColor'" 
                      class="bi bi-hand-thumbs-up cursor-pointer transition hover:scale-110" 
                      viewBox="0 0 16 16">
                      <title>Feedback baik</title>
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                    <svg 
                      v-if="!chat.feedback || hasFeedback(chat, 'bad')"
                      @click = "sendFeedback(chat, 'bad')"
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" height="20"
                      :fill="hasFeedback(chat, 'bad') ? 'red' : 'currentColor'"
                      class="bi bi-hand-thumbs-down cursor-pointer transition hover:scale-110" 
                      viewBox="0 0 16 16">
                      <title>Feedback kurang baik</title>
                      <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Input Section -->
      <div class="bg-white px-4 py-3 border-t border-gray-200">
        <div class="max-w-3xl mx-auto flex items-center space-x-3">
          <input
            v-model="message"
            @keyup.enter="sendMessage()"
            class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Type a message..."
          />
          <button
            @click="sendMessage"
            class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          </button>
        </div>
      </div>
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
.bi-hand-thumbs-up:hover {
  fill: green !important;
  transform: scale(1.1);
}
.bi-hand-thumbs-down:hover {
  fill: red !important;
  transform: scale(1.1);
}
svg {
  transition: all 0.2s ease;
}
</style>
