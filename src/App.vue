<template>
  <Welcome v-if="!isUser"></Welcome>
  <NavBar v-else></NavBar>
  <button @click="signOutUser">выйти</button>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Welcome from "@/views/Welcome";
export default {
  data() {
    return {};
  },
  components: { Welcome },
  computed: {
    ...mapState({
      isUser: (state) => state.user.isUser,
    }),
  },
  mounted() {
    this.onAuthUser();
  },
  methods: {
    ...mapActions({
      signOutUser: "user/signOutUser",
      onAuthUser: "user/onAuthUser",
    }),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: url("assets/backdrop.jpg") center;
  background-size: cover;
  background-repeat: no-repeat;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
