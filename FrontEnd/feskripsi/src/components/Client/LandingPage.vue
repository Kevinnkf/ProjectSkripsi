<script setup lang="ts">
import Navbar from '../Navbar.vue';
import AboutUs from './AboutUs.vue';
import FAQ from './FAQ.vue';
import FeaturesChat from './FeaturesChat.vue';
import HeroSection from './HeroSection.vue';

</script>

<template>
    <div>
        <Navbar/>
        <HeroSection/>  
        <AboutUs/>
        <FeaturesChat/>
        <FAQ/>
    </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>