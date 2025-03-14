<template>
  <div class="w-72 fixed xl:relative bg-blue-700 shadow h-full flex-col justify-between hidden xl:flex overflow-y-auto z-10">
    <div class="px-8">
      <div class="h-20 w-full flex items-center">
        <img class="h-16 cursor-pointer" src="@/assets/image.png" alt="Logo" @click="goToDashboard">
        <button @click="toggleSidebar" class="m-2 xl:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <ul>
        <h5 class="mb-0">
          <button @click="goToDashboard" class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <rect x="4" y="4" width="6" height="6" rx="1"></rect>
              <rect x="14" y="4" width="6" height="6" rx="1"></rect>
              <rect x="4" y="14" width="6" height="6" rx="1"></rect>
              <rect x="14" y="14" width="6" height="6" rx="1"></rect>
            </svg>
            <span class="text-base ml-2">DASHBOARD</span>
          </button>
        </h5>

        <li v-for="(masters, index) in masterData" :key="index">
          <h5 class="mb-0">
            <button @click="toggleDropdown(index)" class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="pr-0.5 pt-05" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                <rect x="14" y="14" width="6" height="6" rx="1"></rect>
              </svg>
              <span class="text-base pl-0.5 ml-2">{{ masters.description }}</span>
              <i :class="dropdownIndex === index ? 'fa fa-minus' : 'fa fa-plus'" class="absolute right-0 pt-1 mr-4 text-xs"></i>
            </button>
          </h5>

          <ul v-show="dropdownIndex === index" class="dropdown-hidden">
            <li v-for="(innerMasters, innerIndex) in getInnerMasters(masters.description)" :key="innerIndex" class="p-0.5">
              <div class="p-3 leading-normal text-base bg-opacity-10 bg-black">
                <a :href="'/master/show/' + innerMasters.description" class="text-white">{{ innerMasters.description }}</a>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <h5 class="mb-0">
            <button @click="goToBaseKnowledge" class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white">
              <i class="fas fa-book mr-2"></i>
              <span class="text-base ml-2">Base Knowledge</span>
            </button>
          </h5>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      masterData: [
        { description: "Master 1", condition: "FIELD", typegcm: "Type A" },
      ],
      dropdownIndex: null,
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    toggleSidebar() {
      document.getElementById("sidebar").classList.toggle("hidden");
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },
    getInnerMasters(typegcm) {
      return this.masterData.filter((item) => item.condition === "FIELD_VALUE" && item.typegcm === typegcm);
    },
    goToBaseKnowledge(){
      this.$router.push("/base-knowledge")
    }
  },
};
</script>

<style scoped>
.dropdown-hidden {
  display: none;
}
</style>
