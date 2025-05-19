<script>
// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const nippm = ref(null)
  const role = ref(null)

  const setUser = (userData) => {
    nippm.value = userData.nippm
    role.value = userData.role
  }

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    restoreUserFromToken() // Refresh user info
  }

  const restoreUserFromToken = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken)
        token.value = savedToken
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

  restoreUserFromToken()

  return {
    token,
    nippm,
    role,
    setUser,
    setToken,
    restoreUserFromToken
  }
})


</script>