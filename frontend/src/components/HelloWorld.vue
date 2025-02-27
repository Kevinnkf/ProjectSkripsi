<template>
  <div>
    <h1>Vue + Express</h1>
    <p v-if="messages.length > 0">Messages from Backend:</p>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>

    <input v-model="newMessage" placeholder="Type a message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: ""
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get("/");
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async sendMessage() {
      try {
        const response = await this.$axios.post("/", { message: this.newMessage });
        this.messages = response.data.messages;
        this.newMessage = ""; // Reset input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
