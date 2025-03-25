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
  },
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard Page</h1>
    <p>Welcome to the Dashboard section!</p>
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
        <!-- <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onclick="window.location.href=''">
                Add Asset
            </button>  -->
      </div>
    </div>
    <div class="flex-auto px-0 pt-0 pb-2 space-x-5">
      <div class="p-4 overflow-x-auto">
        <!-- <form action="{{ route('searchAssets') }}" method="GET" class="mb-4">
                <div class="flex items-center">
                    <input type="text" name="search" placeholder="Search name, brand, model, series, category, serial number, type, condition" class="p-2 border rounded w-[50%]">
                    <button type="submit" class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Search</button>
                </div>
            </form> -->

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
      <div class="flex flex-wrap justify-evenly gap-2 p-2 bg-white">
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-4"
        >
          <a href="#">
            <img class="rounded-t-lg" src="" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                Base Knowledge
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Update SOP here!</p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-4"
        >
          <a href="#">
            <img class="rounded-t-lg" src="" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                Admins
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">See who has access</p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div
          class="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-4"
        >
          <a href="#">
            <img class="rounded-t-lg" src="" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                Settings
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">KCI</p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
