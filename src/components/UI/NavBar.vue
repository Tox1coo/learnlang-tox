<template>
  <nav class="nav">
    <ul class="nav__list">
      <router-link class="nav__link" to="/profile">
        <Profile
          :width="50"
          :height="50"
          :photoURL="userInfo.photoURL"
          class="nav__link-profile"
        ></Profile>
      </router-link>
      <router-link class="nav__link" to="/"
        ><img src="https://img.icons8.com/officel/45/000000/home.png"
      /></router-link>
      <router-link class="nav__link" to="/mydictionary"
        ><img
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/45/000000/external-dictionary-online-education-flaticons-lineal-color-flat-icons.png"
      /></router-link>
      <router-link class="nav__link" to="/testing"
        ><img src="https://img.icons8.com/dusk/45/000000/test-passed.png"
      /></router-link>
    </ul>
    <button
      style="padding: 0 0 5px 0; width: 45px"
      class="btn"
      @click="signOutUser"
    >
      <img src="https://img.icons8.com/dusk/45/000000/exit-sign.png" />
    </button>
  </nav>
  <router-view />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions({
      signOutUser: "user/signOutUser",
    }),
  },
};
</script>

<style scoped lang="scss">
.nav {
  width: $widthnavdecs;
  height: 100%;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  background-color: rgba(#000, 0.2);
  position: fixed;
  z-index: 999;
  backdrop-filter: blur(5px);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 50px;
    list-style: none;
    align-items: center;
    @media (max-width: 450px), (max-height: 379px) {
      gap: 35px;
    }
    @media (max-width: 400px) {
      gap: 20px;
    }
    @media (max-width: 320px) {
      gap: 10px;
    }
  }

  &__link {
    width: 50px;
    height: 50px;
    &-profile {
      width: 50px;
      height: 50px;
      margin-top: 15px;
    }
    img {
      width: 100%;
    }
    @media (max-width: 400px) {
      width: 30px;
      height: 30px;
      img {
      }
    }
  }

  @media (max-width: 795px) {
    width: $widthwithaoutnav;
    height: $heightnavmob;
    flex-direction: row;
    bottom: 0;
    padding-right: 15px;
    padding-left: 15px;
    border-bottom-right-radius: 0;
    border-top-left-radius: 5px;
    &__list {
      flex-direction: row;
      align-items: baseline;
    }
    &__link-profile {
      margin-top: 0;
    }
  }
}
</style>