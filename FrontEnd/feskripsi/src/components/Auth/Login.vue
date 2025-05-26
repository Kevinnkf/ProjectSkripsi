<template>
  <div class="flex items-center justify-center">
    <!-- Left Column (Image Section) -->
    <div class="hidden md:flex w-1/2 items-center justify-center">
      <img src="@/assets/vector-login.jpg" alt="Login Illustration" class="w-3/4">
    </div>

    <!-- Right Column (Login Form) -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md bg-white p-3 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-6">Login</h2>

        <form @submit.prevent="loginUser">
          <!-- NIPP Field -->
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

          <!-- Remember Me Checkbox -->
          <div class="flex items-center mb-4">
            <input class="mr-2" type="checkbox" name="remember" id="remember" />
            <label for="remember" class="text-gray-600 text-sm">Remember me</label>
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
import axios from 'axios';
import { useUserStore } from '../Stores/UserStore.vue';
import Swal from 'sweetalert2';
import api from "../../services/axios.js";

export default {
  data() {
    return {
      nippm: '',  // Corrected to match the input's v-model
      password: ''
    };
  },
  methods: {
    async loginUser() {
      const nippmInt = parseInt(this.nippm, 10);  // Convert to an integer
      if (isNaN(nippmInt)) {
        alert('Please enter a valid NIPP');
        return;
      }
      try {
        const response = await api.post(
          'admins/login', // Change to your backend route
          {
            nippm: nippmInt,  // Send the integer value of nippm
            password: this.password
          },
          {
            withCredentials: true // Allow cookies
          }
        );
        const userData = {
          nippm: response.data.nippm,
          role: response.data.role
          
        }
        const userStore = useUserStore()
        userStore.setUser(userData);

        // Store token in localStorage (or use cookies if preferred)
        localStorage.setItem('token', response.data.token);

        Swal.fire("Success!", "Successfully Logged in.", "success").then(() => {
          this.$router.push('/dashboard');
        });

      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Login failed");
      }
    }
  }
};
</script>
