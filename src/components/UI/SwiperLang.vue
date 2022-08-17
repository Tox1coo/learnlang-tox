<template>
  <div class="choice__container">
    <swiper :pagination="true" :breakpoints="breakpoints">
      <swiper-slide v-for="lang in langLists" :key="lang.code">
        <div @click="updateLang(lang)" class="choice__swiper-item">
          <img class="choice__img" :src="lang.urlPhoto" :alt="lang.title" />
          {{ lang.title }}
        </div></swiper-slide
      >
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// modules styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.scss";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper";
import { mapGetters, mapMutations } from "vuex";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
export default {
  data() {
    return {
      breakpoints: {
        450: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 5,
        },
        415: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        320: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
      },
    };
  },
  props: {
    langLists: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      updateNativeLang: "lang/updateNativeLang",
      updateLearnLang: "lang/updateLearnLang",
    }),
    updateLang(lang) {
      if (this.type === "native") {
        this.updateNativeLang(lang);
      } else {
        this.updateLearnLang(lang);
      }
    },
  },
  computed: {
    ...mapGetters({
      allLang: "lang/allLang",
    }),
  },
  components: { Swiper, SwiperSlide },
};
</script>

<style scoped lang="scss">
</style>