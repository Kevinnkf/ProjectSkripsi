<script>
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode  } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
  // State
  const nippm = ref(null)
  const role = ref(null)
  
  // Actions
  const setUser = (userData) => {
    nippm.value = userData.nippm
    role.value = userData.role
  }
  
  const restoreUserFromToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        console.log("token: ", decoded)
        setUser({
          nippm: decoded.nippm,
          role: decoded.role
        })
      } catch (error) {
        console.log("Failed to decode token", error)
        localStorage.removeItem('token')
      }
    }
  }
  
  // Initialize the store when created
  restoreUserFromToken()

  return { 
    nippm,
    role,
    setUser,
    restoreUserFromToken
  }
})

</script>