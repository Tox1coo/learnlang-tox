<template>
  <div class="lang">
    <div class="subtitle subtitle--choice">{{ titleName }} language</div>
    <div class="choice__swiper-item">
      <img class="choice__img" :src="lang?.urlPhoto" :alt="lang?.title" />
      {{ lang?.title }}
    </div>
    <div @click="removeLang" class="lang__remove">убрать</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    titleName: {
      type: String,
      required: true,
    },
    lang: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  methods: {
    ...mapMutations({
      updateNativeLang: "lang/updateNativeLang",
      updateLearnLang: "lang/updateLearnLang",
    }),
    removeLang() {
      if (this.titleName === "Native") {
        this.updateNativeLang(null);
        this.updateLearnLang(null);
      } else {
        this.updateLearnLang(null);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>