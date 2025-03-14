<template>
  <h1 class="text-3xl font-bold mb-4">Hi, this is a heading</h1>
  <table class="ml-52 h-[85vh] flex flex-col bg-white">
    <thead class="bg-gray-200"> 
      <tr class="flex">
        <th
          v-for="key in Object.keys(tableData[0] || {})"
          :key="key"
          class="bg-green-300 p-3 m-0 text-center text-xl font-semibold text-gray-700 flex-1 border-b"
        >
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody class="flex flex-col flex-1 overflow-auto">
      <tr
        v-for="(item, index) in tableData"
        :key="index"
        class="flex border-b hover:bg-gray-100"
      >
        <td
          v-for="value in Object.values(item)"
          :key="value"
          class="p-3 flex-1 text-gray-600"
        >
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // Initialize an empty array to store the API data
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/admins"); // Replace with your API URL
        const data = await response.json();
        this.tableData = data;
        console.log(this.tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
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
