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
              <label class="block text-gray-700 font-bold mb-2" for="nipp">NIPP</label>
              <input
                class="w-full px-4 py-3 rounded border border-gray-300 focus:ring focus:ring-blue-300"
                id="nipp"
                name="nipp"
                type="text"
                placeholder="2107412040"
                required
              />
            </div>
  
            <!-- Password Field -->
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
              <input
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
  export default {
    methods: {
      loginUser() {
        // Handle login logic here
        console.log("Logging in...");
      },
    },
  };
  </script>
  