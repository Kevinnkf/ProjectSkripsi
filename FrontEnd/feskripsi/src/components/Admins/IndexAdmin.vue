<template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-2xl font-bold">Admins Page</h1>
      <p>Welcome to the Admins section!</p>
    </div>

    <!-- Header & Action -->
    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-semibold">List of Active Admins</h2>
      <button
        @click="openModal"
        class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg transition"
      >
        Register Admin
      </button>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto px-6 pb-6">
      <table
        id="data-table"
        class="table-fixed w-full border-collapse border border-gray-200 text-slate-500"
      >
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-center font-bold uppercase border">NIPPM</th>
            <th class="px-4 py-2 text-center font-bold uppercase border">Role</th>
            <th class="px-4 py-2 text-center font-bold uppercase border">Time</th>
            <!-- <th class="px-4 py-2 text-center font-bold uppercase border">Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            class="border border-gray-200 hover:bg-gray-100"
          >
            <td class="px-4 py-2 text-center border text-gray-600">{{ item.nippm }}</td>
            <td class="px-4 py-2 text-center border text-gray-600">{{ item.role }}</td>
            <td class="px-4 py-2 text-center border text-gray-600">{{ item.created_at }}</td>
            <!-- <td class="px-4 py-2 text-center border text-gray-600">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editAdmin(item)"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteAdmin(item)"
                    class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white p-6 rounded-md w-96 overflow-y-auto max-h-[90vh]">
          <h2 class="text-xl font-bold mb-4">Register New Admin</h2>

          <form @submit.prevent="registerAdmin">
            <div class="mb-4">
              <label for="nippm" class="block text-sm font-semibold">NIPPM</label>
              <input
                id="nippm"
                v-model="newAdmin.nippm"
                placeholder="Example: 2107412040"
                class="w-full p-2.5 border rounded"
              />
            </div>

            <div class="mb-4">
              <label for="password" class="block text-sm font-semibold">Password</label>
              <input
                type="password"
                id="password"
                v-model="newAdmin.password"
                placeholder="*********"
                class="w-full p-2.5 border rounded"
              />
            </div>

            <div class="mb-4">
              <label for="role" class="block text-sm font-semibold">Role</label>
              <select
                id="role"
                v-model="newAdmin.role"
                class="w-full p-2.5 border rounded bg-white"
              >
                <option disabled value="">Please Select one</option>
                <option>Super Admin</option>
                <option>Admin</option>
              </select>
            </div>

            <input
              type="datetime-local"
              v-model="newAdmin.created_at"
              class="hidden"
            />

            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-200 text-black px-4 py-2 rounded mr-2"
              >
                Back
              </button>
              <button
                type="submit"
                class="bg-green-800 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2"
import api from '../../services/axios.js'; 

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

    async deleteAdmin() {
      try {
        const response = await axios.delete("http://localhost:5000/api/admins/deleteById")
        console.log(response.data)
      } catch (error) {
        console.error(error)  
      }
    },

    async registerAdmin() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admins/register",
          this.newAdmin
        );
        console.log("Success:", response.data);
        Swal.fire("Success!", "Admin has been registered", "success");
        // Refresh the table data
        await this.fetchData();
        this.closeModal();

        // Reset form
        this.newAdmin = { nippm: "", password: "", role: "", created_at: "" };
      } catch (error) {
        Swal.fire("Registering Admin Failed", error.message || "Something went wrong", "error");
      }
    },
    async fetchData() {
      try {
        const response = await api.get("/admins");

        this.tableData = response.data;
        console.log("Fetched Data:", this.tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  },
  mounted() {
    this.fetchData(); // Fetch data when component is mounted
  },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
