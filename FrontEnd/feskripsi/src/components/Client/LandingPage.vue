<script setup lang="ts">
import Navbar from '../Navbar.vue';
import HeroSection from './HeroSection.vue';
import AboutUs from './AboutUs.vue';
import FeaturesChat from './FeaturesChat.vue';
import FAQ from './FAQ.vue';
import ContactUs from './ContactUs.vue';
</script>

<template>
  <div class="bg-gradient-to-b from-green-50 to-white min-h-screen">
    <Navbar/>
    <HeroSection/>  
    <AboutUs/>
    <FeaturesChat/>
    <FAQ/>
    <ContactUs/>
  </div>
</template>

<style>
html { scroll-behavior: smooth; }
</style>
