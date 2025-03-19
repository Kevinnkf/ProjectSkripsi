<template>
  <div
    class="w-72 fixed xl:relative bg-green-800 shadow h-full flex-col justify-between hidden xl:flex overflow-y-auto z-10"
  >
    <div class="px-8">
      <div class="h-20 w-full flex items-center">
        <img
          class="h-16 cursor-pointer"
          src="@/assets/image.png"
          alt="Logo"
          @click="goToDashboard"
        />
        <button
          @click="toggleSidebar"
          class="m-2 xl:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <ul>
        <h5 class="mb-0">
          <button
            @click="goToDashboard"
            class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <rect x="4" y="4" width="6" height="6" rx="1"></rect>
              <rect x="14" y="4" width="6" height="6" rx="1"></rect>
              <rect x="4" y="14" width="6" height="6" rx="1"></rect>
              <rect x="14" y="14" width="6" height="6" rx="1"></rect>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2"
              x="0px"
              y="0px"
              width="18"
              height="28"
              viewBox="0 0 50 50"
            >
              <path
                d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"
              ></path>
            </svg>
            <span class="text-base ml-2">DASHBOARD</span>
          </button>
        </h5>

        <!-- <li v-for="(masters, index) in masterData" :key="index">
          <h5 class="mb-0">
            <button
              @click="toggleDropdown(index)"
              class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pr-0.5 pt-05"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                <rect x="14" y="14" width="6" height="6" rx="1"></rect>
              </svg>
              <span class="text-base pl-0.5 ml-2">{{ masters.description }}</span>
              <i
                :class="dropdownIndex === index ? 'fa fa-minus' : 'fa fa-plus'"
                class="absolute right-0 pt-1 mr-4 text-xs"
              ></i>
            </button>
          </h5>

          <ul v-show="dropdownIndex === index" class="dropdown-hidden">
            <li
              v-for="(innerMasters, innerIndex) in getInnerMasters(masters.description)"
              :key="innerIndex"
              class="p-0.5"
            >
              <div class="p-3 leading-normal text-base bg-opacity-10 bg-black">
                <a :href="'/master/show/' + innerMasters.description" class="text-white">{{
                  innerMasters.description
                }}</a>
              </div>
            </li>
          </ul>
        </li> -->

        <li>
          <h5 class="mb-0">
            <button
              @click="goToBaseKnowledge"
              class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white"
            >
              <i class="fas fa-book mr-2"></i>
              <span class="text-base ml-2">Base Knowledge</span>
            </button>
          </h5>
        </li>
        <li>
          <h5 class="mb-0">
            <button
              @click="goToAdmins"
              class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b cursor-pointer text-white"
            >
              <i class="fas fa-book mr-2"></i>
              <span class="text-base ml-2">Admins</span>
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
      masterData: [{ description: 'Master 1', condition: 'FIELD', typegcm: 'Type A' }],
      dropdownIndex: null,
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard')
    },
    toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('hidden')
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index
    },
    getInnerMasters(typegcm) {
      return this.masterData.filter(
        (item) => item.condition === 'FIELD_VALUE' && item.typegcm === typegcm,
      )
    },
    goToBaseKnowledge() {
      this.$router.push('/base-knowledge')
    },
    goToAdmins() {
      this.$router.push('/admins')
    },
  },
}
</script>

<style scoped>
.dropdown-hidden {
  display: none;
}
</style>
