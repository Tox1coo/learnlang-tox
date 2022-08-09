<template>
  <div class="choice">
    <div class="choice__inner">
      <div class="profile">
        <img :src="userInfo.photoURL" alt="" />
        <svg
          v-if="userInfo.photoURL != null"
          width="40"
          height="40"
          viewBox="0 0 487 487"
        >
          <g>
            <g>
              <path
                d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
			 M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
			v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
			 M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
			 M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>

      <div class="choice__native">
        <div v-if="nativeLang === null" class="choice__native-item">
          <div class="subtitle subtitle--choice">
            Choice your native language
          </div>

          <SwiperLang :type="'native'" :langLists="allLang"></SwiperLang>
        </div>
        <LangItem v-else :lang="nativeLang" :titleName="'Native'"></LangItem>
      </div>
      <div class="choice__learn">
        <div
          v-if="nativeLang != null && learnLang === null"
          class="choice__learn-item"
        >
          <div class="subtitle subtitle--choice">Choice learn language</div>

          <SwiperLang :type="'learn'" :langLists="allLearnLang"></SwiperLang>
        </div>
        <LangItem
          v-else-if="learnLang !== null && nativeLang !== null"
          :lang="learnLang"
          :titleName="'Learn'"
        ></LangItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SwiperLang from "@/components/UI/SwiperLang.vue";
import LangItem from "@/components/LangItem/LangItem.vue";
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      nativeLang: (state) => state.lang.nativeLang,
      learnLang: (state) => state.lang.learnLang,
    }),
    ...mapGetters({
      allLang: "lang/allLang",
      allLearnLang: "lang/allLearnLang",
    }),
  },
  methods: {
    ...mapActions({
      getCommLang: "lang/getCommLang",
    }),
  },
  components: { SwiperLang, LangItem },
  mounted() {
    this.getCommLang();
  },
};
</script>

<style lang="scss">
.choice {
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__container {
    width: 400px;
  }
  &__img {
    width: 75px;
    height: 50px;
  }
  &__swiper {
    &-item {
      border: 1px solid rgba(#999, 0.5);
      width: 130px;
      height: 100px;
      border-radius: 10px;
      transition: all 0.4s ease 0s;
      background-color: transparent;
      backdrop-filter: blur(5px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      &:hover {
        background-color: rgba(#fff, 0.5);
      }
    }
  }
}
.profile {
  border: 1px solid #999;
  border-radius: 50%;
  position: relative;
  width: 100px;
  height: 100px;
  backdrop-filter: blur(5px);
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>