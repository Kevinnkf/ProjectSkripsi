<script>
import axios from 'axios';

export default {
  data() {
    return {
      chatData: [], // Initialize an empty array to store the API data
      isModalOpen: false,
      newKnowledge: {
        bk_id: "",
        content: "",
        notes: "",
        created_at: new Date().toISOString(),
        created_by: "Kevin", // Will change this to current user logged on later on
      },
    };
  },
  mounted() {
    this.fetchKnowledgeData();
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async onChangeFileUpload(event){
      this.newKnowledge.content = event.target.files[0];
      console.log("Selected file:", this.newKnowledge);
    },

    async addKnowledge() {
      if (!this.newKnowledge) {
        alert("Please select a file first.");
        return;
      }

      let formData = new FormData();
      formData.append("content", this.newKnowledge.content); // File
      formData.append("notes", this.newKnowledge.notes || ""); // Notes (optional)
      formData.append("created_by", this.newKnowledge.created_by || "Unknown"); // Example additional fields

      console.log(formData)

      try {
        const response = await axios.post("http://localhost:5000/api/knowledge/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads!
          },
        });

        console.log("Upload success:", response);
      } catch (error) {
        console.error("Error: ", error);
      }
    },


    async fetchKnowledgeData() {
      try {
        const response = await fetch("http://localhost:5000/api/knowledge");
        const data = await response.json();
        this.tableData = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <div
      class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
    >
    <div class="p-6">
      <h1 class="text-2xl font-bold">Base Knowledge Page</h1>
      <p>Welcome to the Base Knowledge page!</p>
    </div>
      <div class="flex-col justify-between">
        <div class="p-6 pb-0 mb-2 bg-white rounded-t-2xl"></div>
      </div>
      <div class="flex-auto px-0 pt-0 pb-2 space-x-5">
        <div class="p-4 overflow-x-auto">
          <div class="flex justify-between">
            <div class="p-6">
              <h1 class="text-2xl font-bold">List of SOP</h1>
              <p>See the chatbot knowlege about Standard Operational Procedure</p>
            </div>
            <div class="p-6">
              <button
                @click="openModal"
                class="px-4 py-2 bg-green-800 hover:bg-green-600 text-white rounded-lg transition"
              >
                Add knowledge
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
                <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                  ID
                </th>
                <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                  Filename
                </th>
                <th class="px-4 py-2 text-left font-bold uppercase border border-gray-200">
                  Notes
                </th>
                <th class="px-4 py-2 text-center font-bold uppercase border border-gray-200">
                  Time
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
                  {{ item.bk_id }}
                </td>
                <td class="px-4 py-2 border border-gray-200 text-gray-600">
                  {{ item.filename }}
                </td>
                <td class="px-4 py-2 border border-gray-200 text-gray-600">
                  {{ item.notes }}
                </td>
                <td class="px-4 py-2 border border-gray-200 text-gray-600">
                  {{ item.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal -->
        <div
          v-show="isModalOpen"
          class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
        >
          <div class="bg-white p-6 rounded-md w-96 overflow-y-auto max-h-[90vh]">
            <h2 class="text-xl font-bold mb-4">Add new knowledge</h2>
            <form @submit.prevent="addKnowledge">
              <!-- File Input -->
              <div class="mb-4">
                <label for="files" class="block text-sm font-semibold">Files</label>
                <input class="w-full p-2.5 border rounded" type="file" id="file" ref="file" @change="onChangeFileUpload" />
              </div>

              <!-- Notes Input -->
              <div class="mb-4">
                <label for="notes" class="block text-sm font-semibold">Notes</label>
                <textarea
                  class="w-full p-2.5 border rounded"
                  v-model="newKnowledge.notes"
                  placeholder="Add notes here..."
                ></textarea>
              </div>

              <!-- Hidden Date Field -->
              <div class="mb-4 hidden">
                <label for="created_at" class="block text-sm font-semibold">Time</label>
                <input
                  type="datetime-local"
                  id="created_at"
                  v-model="newKnowledge.created_at"
                  class="w-full p-2.5 border rounded"
                />
              </div>

              <!-- Buttons -->
              <div class="flex justify-end">
                <button type="button" @click="closeModal" class="bg-gray-200 text-black px-4 py-2 rounded mr-2">
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
  </div>
</template>
