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
        <div class="flex justify-between">
          <div class="p-6">
            <h1 class="text-2xl font-bold">List of active Admins</h1>
            <p>See the active admins</p>
          </div>
          <div class="p-6">
            <button
              @click="openModal"
              class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg transition"
            >
              Register Admin
            </button>
          </div>
        </div>

        <!-- Data Table -->
        <table
          id="data-table"
          class="table-fixed w-full border-collapse border border-gray-200 text-slate-500"
        >
          <thead class="bg-gray-100">
            <tr>
              <th
                class="px-4 py-2 text-center font-bold uppercase border border-gray-200"
              >
                ID
              </th>
              <th
                class="px-4 py-2 text-center font-bold uppercase border border-gray-200"
              >
                Role
              </th>
              <th
                class="px-4 py-2 text-center font-bold uppercase border border-gray-200"
              >
                Time
              </th>
              <th
                class="px-4 py-2 text-center font-bold uppercase border border-gray-200"
              >
                Action
              </th>
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
              <td
                class="px-4 py-2 border border-gray-200 text-gray-600 flex justify-center items-center"
              >
                <button
                  @click="open"
                  class="mx-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  @click="open"
                  class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="flex flex-wrap justify-evenly gap-2 p-2 bg-white">test</div> -->
      <!-- Modal -->
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-md w-96 overflow-y-auto max-h-[90vh]">
          <h2 class="text-xl font-bold mb-4">Register new admin</h2>

          <form @submit.prevent="registerAdmin">
            <!-- Input Fields -->
            <div class="mb-4">
              <label for="nippm" class="block text-sm font-semibold">nippm</label>
              <input
                class="w-full p-2.5 border rounded"
                v-model="newAdmin.nippm"
                placeholder="Example: 2107412040"
              />
            </div>

            <div class="mb-4">
              <label for="password" class="block text-sm font-semibold">Password</label>
              <input
                type="password"
                class="w-full p-2.5 border rounded"
                v-model="newAdmin.password"
                placeholder="*********"
              />
            </div>

            <div class="mb-4">
              <label for="role" class="block text-sm font-semibold">Role</label>
              <select
                v-model="newAdmin.role"
                class="w-full p-2.5 border rounded bg-white"
              >
                <option disabled value="">Please Select one</option>
                <option>Super Admin</option>
                <option>Admin</option>
              </select>
            </div>

            <!-- Created At -->
            <div class="mb-4 hidden">
              <label for="created_at" class="block text-sm font-semibold">Time</label>
              <!-- CHANGED: v-model now binds to newAdmin.created_at -->
              <input
                type="datetime-local"
                id="created_at"
                v-model="newAdmin.created_at"
                class="w-full p-2.5 border rounded"
              />
            </div>

            <!-- Buttons -->
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-200 text-black px-4 py-2 rounded mr-2"
              >
                Back
              </button>
              <button type="submit" class="bg-green-800 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [], // Stores API data
      isModalOpen: false, // Controls modal visibility
      newAdmin: {
        nippm: "",
        password: "",
        role: "",
        created_at: new Date().toISOString(), // Auto timestamp
      },
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async registerAdmin() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admins/register",
          this.newAdmin
        );
        console.log("Success:", response.data);

        // Refresh the table data
        await this.fetchData();
        this.closeModal();

        // Reset form
        this.newAdmin = { nippm: "", password: "", role: "", created_at: "" };
      } catch (error) {
        console.error("Error posting admin:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/admins");
        this.tableData = response.data;
        console.log("Fetched Data:", this.tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when component is mounted
  },
};
</script>
