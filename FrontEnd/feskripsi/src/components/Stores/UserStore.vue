<script>
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const nippm = ref(null)
  const role = ref(null)

  const setUser = (userData) => {
    nippm.value = userData.nippm
    role.value = userData.role
    localStorage.setItem('token', userData.token); // optional: store token
  }

  const clearUser = () => {
    nippm.value = null
    role.value = null
    localStorage.removeItem('token')
  }

  const restoreUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      nippm.value = payload.nippm;
      role.value = payload.role;
    } catch (error) {
      console.error('Failed to decode token:', error);
      clearUser();
    }
  }

  return {
    nippm,
    role,
    setUser,
    clearUser,
    restoreUserFromToken
  }
})
</script>
