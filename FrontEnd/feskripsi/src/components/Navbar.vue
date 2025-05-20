<template>
  <header class="fixed w-full bg-white shadow-md z-50 transition-all duration-200">
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:px-8">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-3">
        <img src="@/assets/pnj-logo.png" alt="HaloPNJ Logo" class="h-9 w-9 rounded shadow-sm"/>
        <a :href="homeHref" class="text-2xl font-extrabold text-green-800 tracking-tight hover:text-green-700 transition">
          HaloPNJ
        </a>
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex flex-1 justify-center items-center space-x-6">
        <li><a :href="getLinkHash('home')" class="nav-link" :class="{ active: activeSection === 'home' }">Home</a></li>
        <li><a :href="getLinkHash('about')" class="nav-link" :class="{ active: activeSection === 'about' }">About Us</a></li>
        <li><a :href="getLinkHash('features')" class="nav-link" :class="{ active: activeSection === 'features' }">Features</a></li>
        <li><a :href="getLinkHash('faq')" class="nav-link" :class="{ active: activeSection === 'faq' }">FAQ</a></li>
        <li><a :href="getLinkHash('contact')" class="nav-link" :class="{ active: activeSection === 'contact' }">Contact Us</a></li>
      </ul>

      <!-- Chat Button (right) -->
      <div class="hidden md:flex ml-6">
        <a
          href="/chatbot"
          class="inline-flex items-center px-5 py-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 shadow transition"
        >💬 Chat</a>
      </div>

      <!-- Mobile Hamburger -->
      <button class="md:hidden focus:outline-none" @click="showMenu = !showMenu" aria-label="Menu">
        <svg class="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            :d="showMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Dropdown -->
    <transition name="fade">
      <div v-if="showMenu" class="md:hidden bg-white border-t shadow px-4 py-3">
        <ul class="flex flex-col space-y-2">
          <li><a :href="getLinkHash('home')" class="nav-link block" @click="closeMenu">Home</a></li>
          <li><a :href="getLinkHash('about')" class="nav-link block" @click="closeMenu">About Us</a></li>
          <li><a :href="getLinkHash('features')" class="nav-link block" @click="closeMenu">Features</a></li>
          <li><a :href="getLinkHash('faq')" class="nav-link block" @click="closeMenu">FAQ</a></li>
          <li><a :href="getLinkHash('contact')" class="nav-link block" @click="closeMenu">Contact Us</a></li>
          <li class="mt-2">
            <a
              href="/chatbot"
              class="w-full inline-flex items-center px-4 py-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 shadow transition"
              @click="closeMenu"
            >💬 Chat</a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      activeSection: '', // for future: set by scroll or route
    };
  },
  computed: {
    isChatbot() {
      return this.$route && this.$route.path === '/chatbot';
    },
    homeHref() {
      return this.isChatbot ? '/#home' : '#home';
    }
  },
  methods: {
    getLinkHash(hash) {
      return this.isChatbot ? `/hero#${hash}` : `#${hash}`;
    },
    closeMenu() {
      this.showMenu = false;
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 font-semibold px-2 py-1 rounded transition hover:text-green-700 hover:bg-green-50;
}
.active {
  @apply text-green-800 bg-green-100;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
