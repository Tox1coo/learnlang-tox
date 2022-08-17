<template>
  <div class="choice">
    <div class="choice__inner">
      <Profile :photoURL="userInfo.photoURL"></Profile>

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
        <span v-if="errorLang" class="error"
          >Please choice native/learn language
        </span>
      </div>
      <MyButtonAuth @click="setUserLearnLangs(userInfo.uid)"
        >Continue</MyButtonAuth
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import SwiperLang from "@/components/UI/SwiperLang.vue";
import LangItem from "@/components/LangItem/LangItem.vue";
import Profile from "../../UI/Profile.vue";
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      nativeLang: (state) => state.lang.nativeLang,
      learnLang: (state) => state.lang.learnLang,
      errorLang: (state) => state.lang.errorLang,
    }),
    ...mapGetters({
      allLang: "lang/allLang",
      allLearnLang: "lang/allLearnLang",
    }),
  },
  methods: {
    ...mapMutations({
      updateNativeLang: "lang/updateNativeLang",
      updateLearnLang: "lang/updateLearnLang",
    }),
    ...mapActions({
      getCommLang: "lang/getCommLang",
      setUserLearnLangs: "lang/setUserLearnLangs",
    }),
  },
  components: { SwiperLang, LangItem, Profile },
  mounted() {
    this.getCommLang();
    setTimeout(() => {
      this.updateNativeLang("");
      this.updateLearnLang("");
    }, 1000);
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
    @media (max-width: 385px) {
      width: 300px;
    }
  }
  &__img {
    width: 75px;
    height: 50px;
    @media (max-height: 385px) {
      width: 50px;
      height: 35px;
    }
  }
  &__swiper {
    &-item {
      border: 1px solid rgba(#999, 0.5);
      width: 130px;
      margin: 0 auto;
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
      cursor: pointer;
      &:hover {
        background-color: rgba(#fff, 0.5);
      }
      @media (max-height: 385px) {
        height: 80px;
      }
    }
  }
  &__learn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
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
  @media (max-height: 385px) {
    width: 60px;
    height: 60px;
  }
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