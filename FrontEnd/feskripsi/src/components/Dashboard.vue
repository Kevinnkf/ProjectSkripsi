<template>
  <table class="data-table col-sm">
    <thead>
      <tr>
        <th v-for="key in Object.keys(tableData[0] || {})" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td v-for="value in Object.values(item)" :key="value">{{ value }}</td>
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

    async postData(){
      // const response = await 
    }
  },
};
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: sans-serif;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tbody tr:hover {
  background-color: #e0e0e0;
}
</style>
