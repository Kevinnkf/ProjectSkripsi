<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import { useUserStore } from './components/Stores/UserStore.vue'
import  BlankLayout  from './Layout/BlankLayout.vue'

onMounted(() => {
  useUserStore().restoreUserFromToken()
})

const route = useRoute()

const layout = computed(() => {
  const layoutName = route.meta.layout
  if (layoutName === 'blank') return BlankLayout
  return DefaultLayout
})
</script>

<template>
  <component :is="layout" />
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
