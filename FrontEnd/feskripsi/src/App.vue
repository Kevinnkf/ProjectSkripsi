<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/Layout/DefaultLayout.vue'

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})
</script>

<template>
  <component :is="layout" />
</template>
