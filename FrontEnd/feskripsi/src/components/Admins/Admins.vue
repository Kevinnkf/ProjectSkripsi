<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Admins Page</h1>
    <p>Welcome to the Admins section!</p>
  </div>

  <div
    class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
  >
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
          <h1 class="text-2xl font-bold">List of active Admins</h1>
          <p>See the active admins</p>
        </div>

        <!-- Data Table -->
        <table
          id="data-table"
          class="table-fixed w-full border-collapse border border-gray-200 text-slate-500"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">ID</th>
              <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                Role
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
              <td class="px-4 py-2 border border-gray-200 text-gray-600">
                {{ item.nippm }}
                <!-- Fixed this line -->
              </td>
              <td class="px-4 py-2 border border-gray-200 text-gray-600">
                {{ item.role }}
              </td>
              <td class="px-4 py-2 border border-gray-200 text-gray-600">
                {{ item.created_at }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="flex flex-wrap justify-evenly gap-2 p-2 bg-white">test</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // Initialize an empty array to store the API data
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/admins') // Replace with your API URL
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

<style scoped>
/* .data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: sans-serif;
  max-width: 1540px;
  margin-left: 13rem;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
} */

/* .data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
} */

/* .data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 70vh;
} */

/* .data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
} */

/* .data-table tbody tr:hover {
  background-color: #e0e0e0;
} */
</style>
