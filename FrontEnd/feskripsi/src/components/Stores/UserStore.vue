<script>
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const nippm = ref(null)
  const role = ref(null)

  const setUser = (userData) => {
    nippm.value = userData.nippm
    role.value = userData.role
  }

  const clearUser = () => {
    nippm.value = null
    role.value = null
  }

  return {
    nippm,
    role,
    setUser,
    clearUser
  }
})
</script>
