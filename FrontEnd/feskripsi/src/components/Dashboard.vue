<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard Page</h1>
    <p>Welcome to the Dashboard section!</p>
    
    <!-- Logout Button -->
    <button 
      @click="logout" 
      class="mt-4 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
      Logout
    </button>
  </div>

  <div
    class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
  >
    <div class="flex-row justify-between">
      <div class="flex flex-wrap justify-between gap-4 p-6 bg-white">
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Questions Asked</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 28</p>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Users per Day</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 30</p>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Base Knowledge</h5>
          <p class="font-normal text-xl text-gray-700">{{}} 12</p>
        </div>
      </div>
    </div>
    <div class="flex-col justify-between">
      <div class="p-6 pb-0 mb-2 bg-white rounded-t-2xl">
      </div>
    </div>
    <div class="flex-auto px-0 pt-0 pb-2 space-x-5">
      <div class="p-4 overflow-x-auto">
        <div class="p-6">
          <h1 class="text-2xl font-bold">Frequently Asked Questions</h1>
          <p>See what's user has been up to here</p>
        </div>

        <!-- Data Table -->
        <table
          id="data-table"
          class="table-fixed w-full border-collapse border border-gray-200 text-slate-500"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                ID Chat
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                ID User
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                User Message
              </th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                Bot Response
              </th>
              <th class="px-4 py-2 text-center font-bold uppercase border border-gray-200">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="border border-gray-200 hover:bg-gray-100"
            >
              <td
                v-for="value in Object.values(item)"
                :key="value"
                class="px-4 py-2 border border-gray-200 text-gray-600"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatData: [], // Initialize an empty array to store the API data
    }
  },
  mounted() {
    this.fetchChatData()
  },
  methods: {
    async fetchChatData() {
      try {
        const response = await fetch('http://localhost:5000/api/chats')
        const data = await response.json()
        this.tableData = data
        console.log(this.tableData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    logout() {
      localStorage.removeItem('token');  // Remove the token from localStorage
      this.$router.push('/login');  // Redirect to the login page
    }
  },
}
</script>
