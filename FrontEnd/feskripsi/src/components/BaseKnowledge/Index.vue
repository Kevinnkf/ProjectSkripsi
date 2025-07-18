<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import model from "../../services/axios.js";
import ragApi from '@/services/ragAxios.js';


export default {
  data() {
    return {
      tableData: [],
      isModalOpen: false,
      newKnowledge: {
        file: "",
      },
      currentPage: 1,
      limit: 5,
      hasMore: true, // Tracks if more pages are available
    };
  },
  mounted() {
    this.fetchKnowledgeData();
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

    async onChangeFileUpload(event){
      const file = event.target.files[0];
      if (!file) return;

      const allowedExtensions = ['pdf', 'xlsx'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire(
          "Invalid File Type",
          "Only PDF and XLSX files are allowed.",
          "error"
        );
        event.target.value = ""; // Reset the file input
        this.newKnowledge.file = null;
        return;
      }

      this.newKnowledge.file = file;
      console.log("Selected file:", this.newKnowledge);
    },

    async addKnowledge() {
      if (!this.newKnowledge.file) {
        Swal.fire("No File Selected", "Please select a file first.", "warning");
        return;
      }

      let formData = new FormData();
      formData.append("file", this.newKnowledge.file); // File
      console.log(formData)
      
      try {
            const sendFile = await ragApi.post(`/upload-bk/`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("ragAPI:", ragApi);
            console.log("Upload success:", sendFile);
            Swal.fire("Success!", "PDF uploaded and processed successfully.", "success");
            this.newKnowledge.file = "";
            this.closeModal();
      } catch (error) {
        console.error("Error: ", error);
        Swal.fire("Upload Failed", error.message || "Something went wrong", "error");
      }
    },    
    async fetchKnowledgeData(page = 1) {
      try {
        const { data } = await ragApi.get(`/get-data?page=${page}&limit=${this.limit}`);
        this.tableData = data.data;
        this.currentPage = page;
        this.hasMore = data.has_more;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async searchKnowledge(filename, page = 1) {
      try {
        const { data } = await ragApi.get(`/search-file`, {
        // const { data } = await axios.get(`http://localhost:8000/search-file`, {
          params: {
            filename: filename,
            page: page,
            limit: 10
          }
        });

        this.tableData = data.data;
        this.currentPage = page;
        this.hasMore = data.has_more;
      } catch (error) {
        console.error("Error searching data", error);
      }
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.perPage) || 1;
   },
  },
};
</script>

<template>
  <div class="p-6 bg-white rounded-2xl shadow-soft-xl">
    <!-- Intro Section -->
    <div class="p-6">
      <h1 class="text-3xl font-bold text-black mb-2 drop-shadow">Base Knowledge Page</h1>
      <p>Welcome to the Base Knowledge page!</p>
    </div>

    <!-- List Header & Action -->
    <div class="flex items-center justify-between mb-4 px-6">
      <div>
        <h2 class="text-xl font-semibold text-black mb-2 drop-shadow">List of SOP</h2>
      </div>
      <div>
        <button
          @click="openModal"
          class="inline-flex items-center mx-2 px-4 py-2 bg-green-100 text-[#064E3B] hover:bg-green-200 border border-bg-[#064E3B] rounded-lg shadow transition font-semibold"
        >
          <svg class="w-5 h-5 mr-2 text-[#064E3B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Add Knowledge
        </button>
            <input type="text" v-model="searchKeyword" @input="searchKnowledge(searchKeyword)" placeholder="Search by filename..." class="w-full md:w-64 mx-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition"/>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto px-6 pb-6">
      <div class="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <table class="min-w-full rounded-2xl overflow-hidden">
          <thead class="bg-[#064E3B]">
            <tr>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">ID</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Filename</th>
              <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Notes</th>
              <!-- <th class="px-6 py-4 text-left font-bold uppercase text-xs text-white tracking-widest border-b">Created At</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="transition-all duration-200 border-b last:border-0 hover:bg-blue-50 cursor-pointer even:bg-blue-50/50"
            >
              <td class="px-6 py-3 text-gray-700 font-mono">{{ item.id + 1}}</td>
              <td class="px-6 py-3 text-gray-800">{{ item.payload.filename }}</td>
              <td class="px-6 py-3 text-gray-800">{{ item.payload.text }}</td>
              <!-- <td class="px-6 py-3 text-gray-800 truncate max-w-xs">
                {{ item.notes && item.notes.length > 60 ? item.notes.slice(0,60) + '…' : item.notes }}
                <span v-if="item.notes && item.notes.length > 60" class="text-blue-500 ml-2 text-xs">(hover for more)</span>
              </td> -->
              <td class="px-6 py-3 text-gray-600 font-mono">{{ item.created_at }}</td>
            </tr>
          </tbody>
        </table>
          <div class="flex justify-between items-center px-6 mt-4">
            <button
              @click="fetchKnowledgeData(currentPage - 1)"
              :disabled="currentPage === 1"
              class="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages() }}</span>
            <button
              @click="fetchKnowledgeData(currentPage + 1)"
              :disabled="!hasMore"
              class="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      >
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-blue-200">
          <h2 class="text-xl font-bold text-[#064E3B] mb-4">Add new knowledge</h2>
          <form @submit.prevent="addKnowledge">
            <!-- File Input -->
            <div class="mb-4">
              <label for="files" class="block text-sm font-semibold">Files</label>
              <input
                class="w-full p-2.5 border rounded"
                type="file"
                id="file"
                ref="file"
                accept=".pdf, .xlsx"
                @change="onChangeFileUpload"
              />
            </div>
            <!-- Notes Input -->
            <!-- <div class="mb-4">
              <label for="notes" class="block text-sm font-semibold">Notes</label>
              <textarea
                class="w-full p-2.5 border rounded"
                v-model="newKnowledge.notes"
                placeholder="Add notes here..."
              ></textarea>
            </div> -->
            <div class="mb-4 hidden">
              <label for="created_at" class="block text-sm font-semibold">Time</label>
              <input
                type="datetime-local"
                id="created_at"
                v-model="newKnowledge.created_at"
                class="w-full p-2.5 border rounded"
              />
            </div>
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
    </transition>
  </div>
</template>

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