<script setup lang="ts">
</script>

<template>
  <section id="features" class="px-6 py-32 bg-gradient-to-t from-green-100 to-white">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-extrabold text-[#064E3B] mb-12 text-center">
        Fitur <span class="text-green-700">HaloPNJ</span>
      </h2>
      <!-- Feature Cards -->
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <!-- 1. Pencarian Otomatis -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- Search SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <path fill="#064E3B" d="M62.828,57.172L50.402,44.746C53.902,40.07,56,34.289,56,28C56,12.535,43.465,0,28,0S0,12.535,0,28 s12.535,28,28,28c6.289,0,12.074-2.098,16.75-5.598l12.422,12.426c1.562,1.562,4.094,1.562,5.656,0S64.391,58.734,62.828,57.172z M28,48C16.953,48,8,39.047,8,28S16.953,8,28,8s20,8.953,20,20S39.047,48,28,48z"></path>
                <circle fill="#ffffff" cx="28" cy="28" r="20"></circle>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Pencarian Otomatis</h3>
          <p class="text-gray-600">Cari informasi berdasarkan topik dengan cepat dan mudah.</p>
        </div>
        <!-- 2. Respon 24/7 -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- Clock SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <circle fill="#ffffff" cx="32" cy="32" r="24"></circle>
                <g>
                  <path fill="#064E3B" d="M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M51.547,45.895 l-2.578-2.578l-0.031-0.031c-1.559-1.562-4.074-1.543-5.645,0.012c-1.562,1.566-1.543,4.109,0.016,5.68l2.574,2.574 C41.961,54.344,37.18,56,32,56c-5.184,0-9.969-1.66-13.895-4.453l2.578-2.578l0.031-0.031c1.562-1.559,1.543-4.074-0.016-5.641 c-1.562-1.566-4.105-1.547-5.676,0.012l-2.574,2.574c-2.059-2.887-3.477-6.246-4.09-9.887H12h0.043 C14.25,36,16.016,34.207,16.02,32c0.004-2.215-1.809-4-4.02-4.008H8.359c0.613-3.641,2.039-6.996,4.094-9.887l2.578,2.578 l0.031,0.031c1.559,1.562,4.074,1.543,5.637-0.012c1.57-1.566,1.551-4.109-0.008-5.68l-2.574-2.574C22.039,9.656,26.82,8,32,8 c5.184,0,9.969,1.66,13.895,4.453l-2.578,2.578l-0.031,0.031c-1.562,1.559-1.547,4.074,0.016,5.637 c1.562,1.566,4.105,1.551,5.672-0.012l2.578-2.578c2.055,2.891,3.477,6.25,4.09,9.891H52h-0.043c-2.207,0-3.977,1.789-3.977,4 s1.809,4,4.02,4h3.641C55.027,39.645,53.602,43.004,51.547,45.895z"></path>
                  <path fill="#064E3B" d="M32,12c-2.211,0-4,1.789-4,4v16c0,2.211,1.789,4,4,4s4-1.789,4-4V16C36,13.789,34.211,12,32,12z"></path>
                </g>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Respon 24/7</h3>
          <p class="text-gray-600">Layanan tersedia setiap saat tanpa batasan waktu.</p>
        </div>
        <!-- 3. Sesuai SOP PNJ -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- SOP SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <rect x="12" y="8" fill="#ffffff" width="40" height="48"></rect>
                <g>
                  <path fill="#064E3B" d="M56,0H8C5.789,0,4,1.789,4,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V4C60,1.789,58.211,0,56,0z M52,56H12V8h40V56z"></path>
                  <path fill="#064E3B" d="M24,44h16c2.211,0,4-1.789,4-4s-1.789-4-4-4H24c-2.211,0-4,1.789-4,4S21.789,44,24,44z"></path>
                  <path fill="#064E3B" d="M24,28h8c2.211,0,4-1.789,4-4s-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4S21.789,28,24,28z"></path>
                </g>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Sesuai SOP PNJ</h3>
          <p class="text-gray-600">Informasi dijamin sesuai dengan prosedur resmi PNJ.</p>
        </div>
        <!-- 4. Akses Mudah -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- Device SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <path fill="#064E3B" d="M60,52H4c-2.211,0-4,1.789-4,4s1.789,4,4,4h56c2.211,0,4-1.789,4-4S62.211,52,60,52z"></path>
                <path fill="#064E3B" d="M56,4H8C5.789,4,4,5.789,4,8v40h56V8C60,5.789,58.211,4,56,4z M52,40H12V12h40V40z"></path>
                <rect x="12" y="12" fill="#ffffff" width="40" height="28"></rect>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Akses Mudah</h3>
          <p class="text-gray-600">Dapat diakses dari berbagai perangkat, kapan saja.</p>
        </div>
        <!-- 5. Informasi Ringkas -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- Summary SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <path fill="#394240" d="M62.828,16.484L47.512,1.172c-1.562-1.562-4.094-1.562-5.656,0L0,43.031V64h20.973l41.855-41.855 C64.391,20.578,64.391,18.051,62.828,16.484z M18,56H8V46l0.172-0.172l10,10L18,56z M23.828,50.172l-10-10L44,10l10,10 L23.828,50.172z"></path>
                <polygon fill="#ffffff" points="18,56 8,56 8,46 8.172,45.828 18.172,55.828 "></polygon>
                <rect x="26.843" y="8.751" transform="matrix(0.7071 0.7071 -0.7071 0.7071 31.2072 -15.1689)" fill="#064E3B" width="14.142" height="42.669"></rect>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Informasi Ringkas</h3>
          <p class="text-gray-600">Rangkuman yang jelas dan praktis untuk kebutuhanmu.</p>
        </div>
        <!-- 6. Live Chat -->
        <div class="bg-white shadow-lg rounded-xl p-7 text-center hover:shadow-xl transition duration-300 border border-green-50">
          <div class="mb-4 flex justify-center">
            <!-- Chat SVG -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="w-16 h-16">
              <g>
                <g>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#064E3B" d="M48,12H4c-2.211,0-4,1.789-4,4v28c0,2.211,1.789,4,4,4h8v12 c0,1.617,0.973,3.078,2.469,3.695C14.965,63.902,15.484,64,16,64c1.039,0,2.062-0.406,2.828-1.172L33.656,48H48 c2.211,0,4-1.789,4-4V16C52,13.789,50.211,12,48,12z M44,40H32c-1.023,0-2.047,0.391-2.828,1.172L20,50.344V44 c0-2.211-1.789-4-4-4H8V20h36V40z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" fill="#064E3B" d="M60,0H16c-2.211,0-4,1.789-4,4v4h40c2.211,0,4,1.789,4,4v24h4 c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z"></path>
                </g>
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#f2f2f2" d="M44,40H32c-1.023,0-2.047,0.391-2.828,1.172L20,50.344V44 c0-2.211-1.789-4-4-4H8V20h36V40z"></path>
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Live Chat</h3>
          <p class="text-gray-600">Langsung mulai percakapan dengan chatbot resmi PNJ.</p>
        </div>
      </div>
    </div>
  </section>
</template>
