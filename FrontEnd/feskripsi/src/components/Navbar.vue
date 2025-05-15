<template>
  <header class="bg-white shadow-md fixed top-0 w-full z-50">
    <nav class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <!-- Logo -->
      <div class="text-2xl font-bold text-green-700">
        <a :href="homeHref">HaloPNJ</a>
      </div>

      <!-- Hamburger (mobile) -->
      <button
        class="md:hidden text-gray-700 focus:outline-none"
        @click="showMenu = !showMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="showMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <ul
        class="flex-col md:flex-row md:flex md:items-center md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out"
        :class="showMenu ? 'flex' : 'hidden'"
      >
        <li>
          <a :href="getLinkHash('home')" class="block px-6 py-2 text-gray-700 font-semibold hover:text-green-600">Home</a>
        </li>
        <li>
          <a :href="getLinkHash('about')" class="block px-6 py-2 text-gray-700 font-semibold hover:text-green-600">About Us</a>
        </li>
        <li>
          <a :href="getLinkHash('features')" class="block px-6 py-2 text-gray-700 font-semibold hover:text-green-600">Features</a>
        </li>
        <li>
          <a :href="getLinkHash('faq')" class="block px-6 py-2 text-gray-700 font-semibold hover:text-green-600">FAQ</a>
        </li>
        <li>
          <a :href="getLinkHash('contact')" class="block px-6 py-2 text-gray-700 font-semibold hover:text-green-600">Contact Us</a>
        </li>
        <li>
          <a
            href="/chatbot"
            class="block px-6 py-2 mt-2 md:mt-0 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            💬 Chat
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    isChatbot() {
      return this.$route.path === '/chatbot';
    }
  },
  methods: {
    getLinkHash(hash) {
      return this.isChatbot ? `/hero#${hash}` : `#${hash}`;
    }
  }
}
</script>
