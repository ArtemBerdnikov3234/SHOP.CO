<template>
  <div
    class="bg-white p-5 sm:p-6 rounded-2xl shadow-md shrink-0 w-[calc(100vw-60px)] xs:w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
  >
    <div class="flex items-center mb-3 sm:mb-4">
      <img
        v-if="review.avatar"
        :src="review.avatar"
        :alt="review.fullName"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
      />
      <div
        v-else
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl font-semibold mr-3 sm:mr-4 shrink-0"
      >
        {{ review.fullName.charAt(0).toUpperCase() }}
      </div>
      <div class="min-w-0">
        <div class="flex text-yellow-400 mb-1">
          <svg
            v-for="i in 5"
            :key="`star-${i}`"
            class="w-5 h-5 sm:w-6 sm:h-6"
            :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
        <div class="flex items-center">
          <h4 class="font-semibold text-base sm:text-lg text-black truncate">
            {{ review.fullName }}
          </h4>
          <svg
            v-if="review.verifiedBuyer"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 shrink-0"
          >
            <path
              d="M10 0.828979C8.07164 0.828979 6.18657 1.40081 4.58319 2.47215C2.97982 3.54349 1.73013 5.06624 0.992179 6.84782C0.254225 8.6294 0.061142 10.5898 0.437348 12.4811C0.813554 14.3724 1.74215 16.1097 3.10571 17.4733C4.46928 18.8368 6.20656 19.7654 8.09787 20.1416C9.98919 20.5178 11.9496 20.3248 13.7312 19.5868C15.5127 18.8489 17.0355 17.5992 18.1068 15.9958C19.1782 14.3924 19.75 12.5073 19.75 10.579C19.7473 7.99396 18.7192 5.51559 16.8913 3.6877C15.0634 1.85982 12.585 0.831709 10 0.828979ZM14.2806 8.8596L9.03063 14.1096C8.96097 14.1793 8.87826 14.2347 8.78721 14.2724C8.69616 14.3101 8.59857 14.3296 8.5 14.3296C8.40144 14.3296 8.30385 14.3101 8.2128 14.2724C8.12175 14.2347 8.03903 14.1793 7.96938 14.1096L5.71938 11.8596C5.57865 11.7189 5.49959 11.528 5.49959 11.329C5.49959 11.13 5.57865 10.9391 5.71938 10.7984C5.86011 10.6576 6.05098 10.5786 6.25 10.5786C6.44903 10.5786 6.6399 10.6576 6.78063 10.7984L8.5 12.5187L13.2194 7.79835C13.2891 7.72867 13.3718 7.6734 13.4628 7.63568C13.5539 7.59797 13.6515 7.57856 13.75 7.57856C13.8486 7.57856 13.9461 7.59797 14.0372 7.63568C14.1282 7.6734 14.2109 7.72867 14.2806 7.79835C14.3503 7.86804 14.4056 7.95076 14.4433 8.04181C14.481 8.13285 14.5004 8.23043 14.5004 8.32898C14.5004 8.42753 14.481 8.52511 14.4433 8.61615C14.4056 8.7072 14.3503 8.78992 14.2806 8.8596Z"
              fill="#01AB31"
            />
          </svg>
        </div>
      </div>
    </div>
    <p
      class="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-5 mt-3 sm:mt-4"
    >
      {{ review.review }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  review: {
    required: true,
    default: () => ({
      fullName: 'Аноним',
    }),
  },
})
</script>
