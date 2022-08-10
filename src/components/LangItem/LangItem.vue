<template>
  <div class="lang">
    <div class="subtitle subtitle--choice">{{ titleName }} language</div>
    <div class="choice__swiper-item">
      <img class="choice__img" :src="lang?.urlPhoto" :alt="lang?.title" />
      {{ lang?.title }}
      <div class="lang__remove">
        <div @click="removeLang" class="lang__remove-item"></div>
      </div>
    </div>
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
.lang {
  position: relative;
  &__remove {
    position: absolute;
    top: -8px;
    left: -10px;
    cursor: pointer;

    &-item {
      position: relative;
      width: 25px;
      height: 25px;
      background-color: transparent;
      backdrop-filter: blur(5px);
      border: 1px solid #ccc;
      border-radius: 50%;
      transition: all 0.4s ease 0s;
      &:hover {
        background-color: rgba(#fff, 0.5);
      }
      &:after {
        content: "";
        display: block;
        width: 3px;
        height: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: $error;
        position: absolute;
      }
      &:before {
        content: "";
        display: block;
        width: 3px;
        height: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        background-color: $error;
        position: absolute;
      }
    }
  }
}
</style>