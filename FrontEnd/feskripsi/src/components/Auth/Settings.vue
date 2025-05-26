<template>
  <div class="relative flex flex-col w-full bg-white shadow-soft-xl rounded-2xl">
    <!-- Header -->
    <div class="p-6 border-b">
      <h1 class="text-3xl font-bold text-gray-800">Settings Page</h1>
      <p class="text-gray-600">
        Welcome, <span class="font-semibold text-green-700">{{ userStore.role || 'NIPPM not found' }}</span>!
      </p>
    </div>

    <!-- Profile Info -->
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border">
        <div>
          <p class="text-sm text-gray-500">NIPPM</p>
          <p class="text-lg font-semibold">{{ userStore.nippm || '-' }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Role</p>
          <p class="text-lg font-semibold capitalize">{{ userStore.role || '-' }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Created At</p>
          <p class="text-lg font-semibold">{{ formatDate(userStore.createdAt) || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Reset Password Section -->
    <div class="p-6 flex justify-end">
      <button
        @click="openModal"
        class="px-5 py-2 bg-green-700 hover:bg-green-600 text-white font-medium rounded-lg shadow transition"
      >
        Reset Password
      </button>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-show="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <h2 class="text-2xl font-bold mb-4">Reset Password</h2>

          <form @submit.prevent="resetPassword">
            <div class="mb-4">
              <label for="nippm" class="block text-sm font-medium">NIPPM</label>
              <input
                id="nippm"
                v-model="updateAdmin.nippm"
                readonly
                class="w-full mt-1 p-3 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            <div class="mb-4">
              <label for="oldpassword" class="block text-sm font-medium">Old Password</label>
              <input
                type="password"
                id="oldpassword"
                v-model="updateAdmin.oldpassword"
                placeholder="********"
                class="w-full mt-1 p-3 border rounded-lg"
              />
            </div>

            <div class="mb-4">
              <label for="newpassword" class="block text-sm font-medium">New Password</label>
              <input
                type="password"
                id="newpassword"
                v-model="updateAdmin.newpassword"
                placeholder="********"
                class="w-full mt-1 p-3 border rounded-lg"
              />
            </div>

            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
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




<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../Stores/UserStore.vue'; // Adjust path as needed
import api from "../../services/axios.js";

const userStore = useUserStore();
const isModalOpen = ref(false);
const updateAdmin = ref({
  nippm: '',
  oldpassword: '',
  newpassword: ''
});

// Format Date
const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

const openModal = () => {
  updateAdmin.value.nippm = userStore.nippm;
  isModalOpen.value = true;
};

const closeModal = () => {
  updateAdmin.value.oldpassword = '';
  updateAdmin.value.newpassword = '';
  isModalOpen.value = false;
};

const resetPassword = async () => {
  try {
    const response = await api.get('reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateAdmin.value),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || 'Unknown error');

    alert(result.message || 'Password updated successfully');
    closeModal();
  } catch (err) {
    alert(err.message);
  }
};

onMounted(() => {
  // If needed, you can also fetch more profile info here
});
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
