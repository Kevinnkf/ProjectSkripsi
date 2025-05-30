<template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-3xl font-bold text-black mb-2 drop-shadow">Admins Page</h1>
      <p>Welcome to the Admins section!</p>
    </div>

    <!-- Header & Action -->
    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-xl font-semibold text-black mb-2 drop-shadow">List of Active Admins</h2>
      <button
        @click="openModal"
        class="inline-flex items-center px-4 py-2 bg-green-100 text-[#064E3B] hover:bg-green-200 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
      >
        <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Register Admin
      </button>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto px-6 pb-6">
      <div class="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <table class="min-w-full rounded-2xl overflow-hidden">
          <thead class="bg-[#064E3B]">
            <tr>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">NIPPM</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Role</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Created At</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.nippm }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ item.role }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">{{ formatDate(item.created_at) }}</td>
              <td class="px-4 py-2 text-center border text-gray-600">
                <div class="flex justify-center gap-2">
                   <button
                    @click="deleteAdmin(item.id)"
                    class="inline-flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-200 border border-[#064E3B] rounded-lg shadow transition font-semibold">
                    <!-- SVG icon here -->
                    <svg fill="#fffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-29.7 -29.7 356.40 356.40" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.00297001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="7.722026"> <g> <g> <g> <path d="M220.879,138.078l2.194-36.772h6.967c5.458,0,9.884-4.425,9.884-9.884V67.619c0-19.301-15.703-35.004-35.004-35.004 h-30.227V9.884c0-5.458-4.425-9.884-9.884-9.884H99.578c-5.458,0-9.884,4.425-9.884,9.884v22.732H59.466 c-19.301,0-35.004,15.703-35.004,35.004v23.803c0,5.458,4.425,9.884,9.884,9.884h6.967l11.124,186.399 c0.312,5.221,4.637,9.295,9.866,9.295h139.78c5.229,0,9.554-4.074,9.866-9.295l1.938-32.467 c32.355-0.085,58.652-26.429,58.652-58.804C272.539,166.429,249.945,141.617,220.879,138.078z M109.461,19.767h45.464v12.849 h-45.464V19.767z M44.23,81.539v-13.92c0-8.401,6.835-15.236,15.236-15.236h145.453c8.402,0,15.237,6.835,15.237,15.236v13.92 H44.23z M203.241,101.8l-2.221,37.228c-3.462,0.766-6.815,1.827-10.02,3.175V101.8H203.241z M73.386,277.233h-1.772L61.145,101.8 h12.241V277.233z M104.837,277.233H93.153V101.306h11.684V277.233z M139.782,277.233h-15.179V101.8h15.179V277.233z M159.549,101.306h11.684v54.547c-4.892,5.121-8.882,11.11-11.684,17.725V101.306z M171.234,277.234H159.55v-0.001v-57.94 c2.801,6.615,6.792,12.604,11.684,17.725V277.234z M192.773,277.233H191v-26.566c1.077,0.453,2.174,0.865,3.283,1.255 L192.773,277.233z M213.732,235.475c-21.527,0-39.04-17.513-39.04-39.04c0-21.527,17.513-39.04,39.04-39.04 c21.527,0,39.04,17.513,39.04,39.04C252.772,217.962,235.259,235.475,213.732,235.475z"></path> <path d="M237.029,173.138c-3.861-3.859-10.117-3.859-13.978,0l-9.319,9.319l-9.319-9.319c-3.861-3.859-10.117-3.859-13.978,0 c-3.86,3.86-3.86,10.118,0,13.978l9.319,9.319l-9.319,9.319c-3.86,3.86-3.86,10.118,0,13.978c1.93,1.929,4.459,2.895,6.989,2.895 c2.53,0,5.059-0.965,6.989-2.895l9.319-9.319l9.319,9.319c1.93,1.929,4.459,2.895,6.989,2.895c2.53,0,5.059-0.965,6.989-2.895 c3.86-3.86,3.86-10.118,0-13.978l-9.319-9.319l9.319-9.319C240.889,183.256,240.889,176.998,237.029,173.138z"></path> </g> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M220.879,138.078l2.194-36.772h6.967c5.458,0,9.884-4.425,9.884-9.884V67.619c0-19.301-15.703-35.004-35.004-35.004 h-30.227V9.884c0-5.458-4.425-9.884-9.884-9.884H99.578c-5.458,0-9.884,4.425-9.884,9.884v22.732H59.466 c-19.301,0-35.004,15.703-35.004,35.004v23.803c0,5.458,4.425,9.884,9.884,9.884h6.967l11.124,186.399 c0.312,5.221,4.637,9.295,9.866,9.295h139.78c5.229,0,9.554-4.074,9.866-9.295l1.938-32.467 c32.355-0.085,58.652-26.429,58.652-58.804C272.539,166.429,249.945,141.617,220.879,138.078z M109.461,19.767h45.464v12.849 h-45.464V19.767z M44.23,81.539v-13.92c0-8.401,6.835-15.236,15.236-15.236h145.453c8.402,0,15.237,6.835,15.237,15.236v13.92 H44.23z M203.241,101.8l-2.221,37.228c-3.462,0.766-6.815,1.827-10.02,3.175V101.8H203.241z M73.386,277.233h-1.772L61.145,101.8 h12.241V277.233z M104.837,277.233H93.153V101.306h11.684V277.233z M139.782,277.233h-15.179V101.8h15.179V277.233z M159.549,101.306h11.684v54.547c-4.892,5.121-8.882,11.11-11.684,17.725V101.306z M171.234,277.234H159.55v-0.001v-57.94 c2.801,6.615,6.792,12.604,11.684,17.725V277.234z M192.773,277.233H191v-26.566c1.077,0.453,2.174,0.865,3.283,1.255 L192.773,277.233z M213.732,235.475c-21.527,0-39.04-17.513-39.04-39.04c0-21.527,17.513-39.04,39.04-39.04 c21.527,0,39.04,17.513,39.04,39.04C252.772,217.962,235.259,235.475,213.732,235.475z"></path> <path d="M237.029,173.138c-3.861-3.859-10.117-3.859-13.978,0l-9.319,9.319l-9.319-9.319c-3.861-3.859-10.117-3.859-13.978,0 c-3.86,3.86-3.86,10.118,0,13.978l9.319,9.319l-9.319,9.319c-3.86,3.86-3.86,10.118,0,13.978c1.93,1.929,4.459,2.895,6.989,2.895 c2.53,0,5.059-0.965,6.989-2.895l9.319-9.319l9.319,9.319c1.93,1.929,4.459,2.895,6.989,2.895c2.53,0,5.059-0.965,6.989-2.895 c3.86-3.86,3.86-10.118,0-13.978l-9.319-9.319l9.319-9.319C240.889,183.256,240.889,176.998,237.029,173.138z"></path> </g> </g> </g> </g></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      >
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-blue-200">
          <h2 class="text-xl font-bold text-[#064E3B] mb-4">Register New Admin</h2>
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    async deleteAdmin(id) {
        const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D33",
        cancelButtonColor: "#064E3B",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        try {
          // const id = this.tableData.id;
          // const response = await api.delete(`http://localhost:5000/api/admins/delete/${id}`);
          const response = await api.delete(`/admins/delete/${id}`);
          Swal.fire("Deleted!", "FAQ has been deleted.", "success");
          await this.fetchData();
        } catch (error) {
          Swal.fire("Deleting faq failed", error.message || "Something went wrong", "error");
        }
      }
    },

    async registerAdmin() {
      try {
        const response = await api.post(
          "admins/register",
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
        // const response = await api.get("/admins");
        const response = await api.get("http://localhost:5000/api/admins");

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
table td, table th { 
  word-break: break-word; 
}
</style>
