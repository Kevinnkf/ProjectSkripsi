<template>
  <div>
    <h1>Data Admin</h1>
    <ul>
      <li v-for="admin in admins" :key="admin.id">
        {{ admin.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admins: []
    }
  },
  mounted() {
    this.$axios.get('/api/admin')
      .then(response => {
        this.admins = response.data
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
}
</script>
