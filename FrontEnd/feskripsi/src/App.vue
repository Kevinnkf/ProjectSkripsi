<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import { useUserStore } from './components/Stores/UserStore.vue'

onMounted(() => {
  useUserStore().restoreUserFromToken
})

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})
</script>

<template>
  <component :is="layout" />
</template>
