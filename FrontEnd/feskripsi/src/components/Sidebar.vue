<template>
  <div class="w-64 sticky h-screen left-0 top-0 bottom-0 bg-[#064E3B] border-r border-gray-700 flex flex-col justify-between overflow-y-auto z-10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Logo Section -->
      <div class="pt-6 px-4 pb-2">
        <div class="flex items-center justify-center">
          <div 
            @click="goToDashboard"
            class="flex items-center justify-center p-2 rounded-xl bg-[#064E3B] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <img class="h-24 w-auto" src="@/assets/pnj-logo.png" alt="PNJ Logo"/>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-2">
        <ul class="space-y-1">
          <!-- Dashboard Item -->
          <li>
            <button
              @click="goToDashboard"
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="text-sm font-medium">Dashboard</span>
            </button>
          </li>

          <!-- Base Knowledge Item -->
          <li>
            <button
              @click="goToBaseKnowledge"
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span class="text-sm font-medium">Base Knowledge</span>
            </button>
          </li>

          <!-- Chat History Item -->
          <li>
            <button
              @click="goToChatHistory"
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m-4 8h10a2 2 0 002-2V6a2 2 0 00-2-2H7l-4 4v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-sm font-medium">Chat History</span>
            </button>
          </li>

          <!-- Admins Item -->
          <li>
            <button
              @click="goToAdmins"
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="text-sm font-medium">Admins</span>
            </button>
          </li>

          <li>
            <button
              @click="goToChatbot"
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-green-400"
                fill="green"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                <path 
                  d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" 
                  stroke="#000000" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round">
                </path></g>
              </svg>
              <span class="text-sm font-medium">Chatbot</span>
            </button>
          </li>

          <!-- Divider -->
          <li class="border-t border-gray-800 my-2"></li>

          <!-- Settings Item -->
          <li>
            <button
              class="group relative flex items-center w-full p-3 font-medium text-left rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <div class="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-3 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-sm font-medium">Settings</span>
            </button>
          </li>
          <li>
            <button 
              @click="logout" 
              class="mt-4 w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-gray-800">
      <div class="flex items-center">
        <div class="relative">
          <img
            class="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover"
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
            alt="User"
          />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
        </div>
        <div class="ml-3">
          <!-- <p class="text-sm font-medium text-white">{{ userStore.user?.name || 'Guest' }}Guest </p>
          <p class="text-xs text-gray-400">{{ userStore.user?.email || 'Guest' }} Guest</p> -->
          <p class="text-sm font-medium text-white"> {{ userStore.nippm || 'Could not fetch NIPPM' }} </p>
          <p class="text-xs text-gray-400">{{ userStore.role || 'Could not fetch role' }} </p>
          {{ console.log (userStore) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/components/Stores/UserStore.vue'
import Swal from 'sweetalert2'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }

  },
  data() {
    return {
      masterData: [{ description: 'Master 1', condition: 'FIELD', typegcm: 'Type A' }],
      dropdownIndex: null,
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard')
    },
    toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('hidden')
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index
    },
    getInnerMasters(typegcm) {
      return this.masterData.filter(
        (item) => item.condition === 'FIELD_VALUE' && item.typegcm === typegcm,
      )
    },
    goToBaseKnowledge() {
      this.$router.push('/base-knowledge')
    },
    goToChatHistory() {
      this.$router.push('/chat-history')
    },
    goToAdmins() {
      this.$router.push('/admins')
    },
    goToChatbot() {
      this.$router.push('/chatbot')
    },
    logout() {  
      Swal.fire({
        title: "Are you sure you want to log out?",
        text: "You will have to re-login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#064E3B",
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');  // Remove the token from localStorage
          this.$router.push('/login');       // Redirect to login page
        }
      });
    },
  },
}
</script>

<style scoped>
/* Smooth transitions for dropdowns */
.dropdown-hidden {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Glow effect on hover */
.hover-glow:hover {
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
}
</style>
