<script setup>
import Chatbot from "./components/Chatbot.vue";
import Dashboar from "./components/Dashboard.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import TheWelcome from "./components/TheWelcome.vue";
import WelcomeItem from "./components/WelcomeItem.vue";
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
    <div class="wrapper">
    <a href="http://localhost:5173/">Link to dashboard</a>
    </div> -->
    <Sidebar />
    <!-- <Navbar/> -->
  </header>

  <main>
    <Chatbot />
    <Dashboar />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: left;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
