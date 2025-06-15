<template>
  <footer class="pt-20">
    <div class="bg-black rounded-2xl mx-4 lg:mx-12 -translate-y-12 shadow-lg">
      <div
        class="py-9 px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto"
      >
        <h2 class="text-white text-3xl font-bold text-center md:text-left">
          БУДЬТЕ В КУРСЕ НАШИХ ПОСЛЕДНИХ ПРЕДЛОЖЕНИЙ
        </h2>
        <div class="flex flex-col gap-2 w-full md:max-w-md">
          <div class="flex items-center bg-white rounded-full p-3">
            <input
              v-model="emailInput"
              type="email"
              placeholder="Введите ваш email"
              class="border-none outline-none bg-transparent placeholder-gray-500 text-center w-full"
            />
          </div>
          <button
            @click="subscribeToNewsletter"
            class="bg-white rounded-full py-3 px-4 font-medium hover:bg-gray-200 disabled:opacity-50"
            :disabled="!isValidEmail"
          >
            Подписаться на рассылку
          </button>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 py-10">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="flex flex-col lg:flex-row justify-between gap-10">
          <div class="flex flex-col gap-6 text-center lg:text-left">
            <h3 class="text-[32px] font-bold text-black">SHOP.CO</h3>
            <p class="text-sm text-gray-600 max-w-xs">
              У нас есть одежда, которая соответствует вашему стилю и которой вы будете гордиться.
            </p>
            <div class="flex gap-3">
              <a
                href="#"
                class="w-10 h-10 bg-white border rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white"
                aria-label="VKontakte"
              >
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" class="fill-current">
                  <path
                    d="M0 6.72C0 3.55215 0 1.96824 0.984121 0.984121C1.96824 0 3.55215 0 6.72 0H7.28C10.4478 0 12.0317 0 13.0159 0.984121C14 1.96824 14 3.55215 14 6.72V7.28C14 10.4478 14 12.0317 13.0159 13.0159C12.0317 14 10.4478 14 7.28 14H6.72C3.55215 14 1.96824 14 0.984121 13.0159C0 12.0317 0 10.4478 0 7.28V6.72Z"
                    fill="black"
                  />
                  <path
                    d="M7.44919 10.0859C4.25835 10.0859 2.43838 7.89836 2.36255 4.25836H3.96088C4.01338 6.93003 5.19169 8.0617 6.12502 8.29503V4.25836H7.63008V6.56253C8.55174 6.46336 9.51996 5.41336 9.84663 4.25836H11.3517C11.1008 5.6817 10.0508 6.7317 9.30416 7.16336C10.0508 7.51336 11.2467 8.4292 11.7017 10.0859H10.045C9.68916 8.97753 8.80258 8.12003 7.63008 8.00336V10.0859H7.44919Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white border rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white"
                aria-label="Telegram"
              >
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" class="fill-current">
                  <path
                    d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.16859 6.92609C5.20924 6.03702 6.56998 5.45089 7.25084 5.1677C9.19481 4.35913 9.59875 4.21868 9.86204 4.21404C9.91994 4.21302 10.0494 4.22737 10.1333 4.29542C10.2041 4.35289 10.2236 4.43051 10.2329 4.48499C10.2422 4.53947 10.2538 4.66358 10.2446 4.76056C10.1393 5.86742 9.68345 8.55349 9.45155 9.7932C9.35343 10.3178 9.16022 10.4936 8.97317 10.5109C8.56666 10.5483 8.25798 10.2422 7.86426 9.98413C7.24817 9.58027 6.90012 9.32887 6.3021 8.93478C5.61098 8.47935 6.059 8.22903 6.45287 7.81994C6.55595 7.71288 8.34701 6.08378 8.38167 5.93599C8.38601 5.91751 8.39003 5.84861 8.3491 5.81223C8.30817 5.77585 8.24776 5.78829 8.20417 5.79819C8.14238 5.81221 7.15817 6.46274 5.25153 7.74977C4.97216 7.94161 4.71912 8.03507 4.49241 8.03017C4.24247 8.02478 3.76169 7.88886 3.40429 7.77268C2.96591 7.63018 2.6175 7.55484 2.64784 7.31283C2.66364 7.18678 2.83723 7.05787 3.16859 6.92609Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white border rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white"
                aria-label="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" class="fill-current">
                  <path
                    d="M13.7212 3.60818C13.642 3.31033 13.486 3.0385 13.2688 2.81989C13.0516 2.60128 12.7808 2.44355 12.4835 2.36249C11.3889 2.06818 7.01392 2.06818 7.01392 2.06818C7.01392 2.06818 2.63892 2.06818 1.54437 2.36249C1.24704 2.44355 0.976217 2.60128 0.759 2.81989C0.541784 3.0385 0.385794 3.31033 0.306643 3.60818C0.0139161 4.70749 0.013916 6.99999 0.013916 6.99999C0.013916 6.99999 0.0139161 9.29249 0.306643 10.3918C0.385794 10.6897 0.541784 10.9615 0.759 11.1801C0.976217 11.3987 1.24704 11.5564 1.54437 11.6375C2.63892 11.9318 7.01392 11.9318 7.01392 11.9318C7.01392 11.9318 11.3889 11.9318 12.4835 11.6375C12.7808 11.5564 13.0516 11.3987 13.2688 11.1801C13.486 10.9615 13.642 10.6897 13.7212 10.3918C14.0139 9.29249 14.0139 6.99999 14.0139 6.99999C14.0139 6.99999 14.0139 4.70749 13.7212 3.60818Z"
                    fill="black"
                  />
                  <path
                    d="M5.58203 9.08174V4.91833L9.24112 7.00004L5.58203 9.08174Z"
                    fill="#FEFEFE"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-10 text-center sm:text-left">
            <div class="flex flex-col gap-5">
              <h4 class="text-black font-medium tracking-[3px]">КОМПАНИЯ</h4>
              <nav class="flex flex-col gap-3">
                <a href="#" class="text-gray-600 hover:text-black">О нас</a>
                <a href="#" class="text-gray-600 hover:text-black">Возможности</a>
                <a href="#" class="text-gray-600 hover:text-black">Карьера</a>
              </nav>
            </div>
            <div class="flex flex-col gap-5">
              <h4 class="text-black font-medium tracking-[3px]">ПОМОЩЬ</h4>
              <nav class="flex flex-col gap-3">
                <a href="#" class="text-gray-600 hover:text-black">Поддержка</a>
                <a href="#" class="text-gray-600 hover:text-black">Доставки</a>
                <a href="#" class="text-gray-600 hover:text-black">Условия и положения</a>
              </nav>
            </div>
            <div class="flex flex-col gap-5">
              <h4 class="text-black font-medium tracking-[3px]">АККАУНТ</h4>
              <nav class="flex flex-col gap-3">
                <a href="#" class="text-gray-600 hover:text-black">Управление доставкой</a>
                <a href="#" class="text-gray-600 hover:text-black">Заказы</a>
                <a href="#" class="text-gray-600 hover:text-black">Платежи</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 py-6 bg-gray-200">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-600 text-sm">Shop.co © 2000-{{ currentYear }}, Все права защищены</p>
          <div class="flex gap-3">
            <div
              class="w-[60px] h-10 bg-white border rounded-lg flex items-center justify-center hover:-translate-y-0.5"
            >
              <svg width="36" height="14" viewBox="0 0 34 12" fill="none">
                <path
                  d="M17.0221 1.12124L14.8479 11.2848H12.2188L14.3933 1.12124H17.0221ZM28.0838 7.68387L29.468 3.86711L30.2645 7.68387H28.0838ZM31.0172 11.2848H33.4491L31.327 1.12124H29.0823C28.5779 1.12124 28.1523 1.41461 27.9628 1.86689L24.0184 11.2848H26.7794L27.3275 9.76709H30.7007L31.0172 11.2848ZM24.1554 7.96631C24.1667 5.2838 20.4458 5.13615 20.4715 3.93789C20.4792 3.57278 20.827 3.18547 21.5865 3.08607C21.9638 3.03685 23.0012 2.99922 24.1792 3.54125L24.6405 1.38598C24.0078 1.1563 23.1936 0.935303 22.1809 0.935303C19.5824 0.935303 17.7533 2.31693 17.7379 4.29527C17.7215 5.75828 19.0436 6.57471 20.0398 7.0611C21.0641 7.55938 21.4083 7.87849 21.4038 8.32402C21.397 9.00631 20.5867 9.30676 19.8307 9.31866C18.5086 9.33957 17.7414 8.96192 17.1299 8.67691L16.6535 10.9039C17.2676 11.186 18.4015 11.4312 19.5779 11.4437C22.3395 11.4437 24.1464 10.0791 24.1554 7.96631ZM13.2652 1.12124L9.00549 11.2848H6.22584L4.12976 3.17357C4.00237 2.674 3.89171 2.49128 3.50473 2.28058C2.87327 1.93799 1.82941 1.61598 0.911011 1.41654L0.973739 1.12124H5.44737C6.01739 1.12124 6.53047 1.50082 6.65979 2.15737L7.76702 8.03901L10.5029 1.12124H13.2652Z"
                  fill="#1434CB"
                />
              </svg>
            </div>
            <div
              class="w-[60px] h-10 bg-white border rounded-lg flex items-center justify-center hover:-translate-y-0.5"
            >
              <svg width="28" height="18" viewBox="0 0 26 16" fill="none">
                <path d="M16.2699 1.84839H9.40663V14.1819H16.2699V1.84839Z" fill="#FF5F00" />
                <path
                  d="M9.84245 8.01514C9.84137 6.82733 10.1105 5.65484 10.6296 4.58644C11.1486 3.51804 11.9039 2.58173 12.8383 1.84838C11.6812 0.938865 10.2915 0.37325 8.82815 0.216185C7.36478 0.0591194 5.88674 0.316937 4.56296 0.96018C3.23919 1.60342 2.1231 2.60614 1.34226 3.8537C0.561418 5.10127 0.147339 6.54336 0.147339 8.01514C0.147339 9.48692 0.561418 10.929 1.34226 12.1766C2.1231 13.4241 3.23919 14.4269 4.56296 15.0701C5.88674 15.7133 7.36478 15.9712 8.82815 15.8141C10.2915 15.657 11.6812 15.0914 12.8383 14.1819C11.9039 13.4485 11.1486 12.5122 10.6296 11.4438C10.1105 10.3754 9.84138 9.20294 9.84245 8.01514Z"
                  fill="#EB001B"
                />
                <path
                  d="M25.5289 8.01514C25.5289 9.48689 25.1149 10.929 24.3341 12.1765C23.5533 13.4241 22.4372 14.4268 21.1135 15.0701C19.7897 15.7133 18.3117 15.9712 16.8484 15.8141C15.385 15.657 13.9954 15.0914 12.8383 14.1819C13.7719 13.4478 14.5266 12.5113 15.0455 11.4431C15.5645 10.3749 15.8341 9.20275 15.8341 8.01514C15.8341 6.82752 15.5645 5.6554 15.0455 4.58717C14.5266 3.51893 13.7719 2.58247 12.8383 1.84838C13.9954 0.938864 15.385 0.373246 16.8484 0.216183C18.3117 0.0591193 19.7897 0.316948 21.1135 0.960198C22.4372 1.60345 23.5533 2.60616 24.3341 3.85373C25.1149 5.1013 25.5289 6.54338 25.5289 8.01514Z"
                  fill="#F79E1B"
                />
                <path
                  d="M24.7805 12.8756V12.6231H24.8824V12.5716H24.6231V12.6231H24.7249V12.8756H24.7805ZM25.284 12.8756V12.5711H25.2045L25.1131 12.7805L25.0216 12.5711H24.9421V12.8756H24.9982V12.6459L25.0839 12.8439H25.1421L25.2279 12.6454V12.8756H25.284Z"
                  fill="#F79E1B"
                />
              </svg>
            </div>
            <div
              class="w-[60px] h-10 bg-white border rounded-lg flex items-center justify-center hover:-translate-y-0.5"
            >
              <svg width="33" height="12" viewBox="0 0 31 10" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.00271 0.899834C3.27073 0.898231 4.06726 0.826491 4.40465 1.9652C4.63192 2.73224 4.99396 3.9887 5.49075 5.73457H5.69307C6.22583 3.89395 6.59182 2.63749 6.79102 1.9652C7.13192 0.814629 7.9842 0.899856 8.32511 0.899856L10.9553 0.89986V9.08166H8.27454V4.25999H8.09477L6.60038 9.08166H4.58344L3.08905 4.25641H2.90928V9.08166H0.228516V0.89986L3.00271 0.899834ZM14.8048 0.89986V5.72512H15.0187L16.8365 1.75734C17.1893 0.967744 17.9414 0.89986 17.9414 0.89986H20.5356V9.08167H17.7988V4.25641H17.585L15.8028 8.22419C15.45 9.01022 14.6623 9.08167 14.6623 9.08167H12.0681V0.89986H14.8048ZM29.995 4.78791C29.6133 5.8697 28.4144 6.64444 27.0872 6.64444H24.2171V9.08167H21.6146V4.78791H29.995Z"
                  fill="#0F754E"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.2127 0.899841H21.4781C21.6146 2.72139 23.1833 4.28076 24.8072 4.28076H30.1758C30.4857 2.76683 29.4191 0.899841 27.2127 0.899841Z"
                  fill="url(#paint0_linear_290_70-283819_new)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_290_70-283819_new"
                    x1="30.2285"
                    y1="3.02658"
                    x2="21.4781"
                    y2="3.02658"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1F5CD7" />
                    <stop offset="1" stop-color="#02AEFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const emailInput = ref('')
const currentYear = computed(() => new Date().getFullYear())
const isValidEmail = computed(() => /^[^@]+@[^@]+\.[^@]+$/.test(emailInput.value))

const subscribeToNewsletter = () => {
  if (!isValidEmail.value) return
  console.log('Подписка на рассылку:', emailInput.value)
  alert('Спасибо за подписку!')
  emailInput.value = ''
}
</script>
