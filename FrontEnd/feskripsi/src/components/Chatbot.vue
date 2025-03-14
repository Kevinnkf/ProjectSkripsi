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

    message.value = ""; // Clear input after sending
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
  <div class="d-flex flex-column vh-100">
    <!-- Header -->
    <div
      :style="{ backgroundColor: 'hsla(160, 100%, 37%, 1)', color: 'white' }"
      class="text-center py-3 shadow"
    >
      <h3>Chatbot</h3>
    </div>

    <!-- Chat Section -->
    <div
      class="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-3"
    >
      <div class="chat-container w-100 h-100 p-3 rounded shadow-lg bg-white">
        <!-- Chat History -->
        <div class="chat-box p-3 border rounded bg-light" ref="chatBox">
          <div
            v-for="(chat, index) in chatHistory"
            :key="index"
            class="mb-3 d-flex"
            :class="
              chat.role === 'user' ? 'justify-content-end' : 'justify-content-start'
            "
          >
            <!-- Message Bubble -->
            <div
              class="message p-2 rounded"
              :class="
                chat.role === 'user' ? 'bg-primary text-white' : 'bg-primary text-white'
              "
            >
              <p class="fw-bold mb-1">{{ chat.role === "user" ? "You" : "Bot" }}:</p>
              <p class="mb-0">{{ chat.content }}</p>
            </div>
          </div>
        </div>

        <!-- Input Section -->index
        <div class="input-group mt-3">
          <input
            v-model="message"
            @keyup.enter="sendMessage"
            class="form-control"
            placeholder="Type a message..."
          />
          <button @click="sendMessage" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Chat container */
.chat-container {
  max-width: 1540px;
  margin-left: 13rem;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
}

/* Chatbox styles */
.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 70vh;
}

/* Message bubble */
.message {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
}
</style>
