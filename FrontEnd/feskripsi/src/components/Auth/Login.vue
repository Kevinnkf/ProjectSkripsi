<template>
  <div class="flex items-center justify-center">
    <!-- Left Column (Image Section) -->
    <div class="hidden md:flex w-1/2 items-center justify-center">
      <img src="@/assets/vector-login.jpg" alt="Login Illustration" class="w-3/4" />
    </div>

    <!-- Right Column (Login Form) -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md bg-white p-3 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-6">Login</h2>

        <form @submit.prevent="loginUser">
          <!-- NIPPM Field -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="nippm">NIPPM</label>
            <input
              v-model="nippm"
              class="w-full px-4 py-3 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              id="nippm"
              name="nippm"
              type="text"
              placeholder="2107412040"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
            <input
              v-model="password"
              class="w-full px-4 py-3 rounded border border-gray-300 focus:ring focus:ring-blue-300"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

  <script>
  import { useUserStore } from '../Stores/UserStore.vue';
  import Swal from 'sweetalert2';
  import api from "../../services/axios.js";
  import axios from 'axios';

  export default {
    data() {
      return {
        nippm: '',
        password: ''
      };
    },
    methods: {
    async loginUser() {
      try {
        // const response = await api.post('http://localhost:5000/api/admins/login', {
        const response = await api.post('admins/login', {
            nippm: parseInt(this.nippm, 10),
            password: this.password
          },
          {
            withCredentials: true 
          }
        );

        localStorage.setItem('token', response.data.token);

        const storedToken = localStorage.getItem('token');
        console.log("Token retrieved from localStorage immediately:", storedToken);


        // Set user in your store
        const userStore = useUserStore();
        userStore.setUser(response.data.user);

        Swal.fire("Success!", "Successfully Logged in.", "success").then(() => {
          const redirectPath = localStorage.getItem('redirectPath') || '/dashboard';
          localStorage.removeItem('redirectPath');
          this.$router.push(redirectPath);
        });
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Login failed", "error");
      }
    }
  }
  };
  </script>
