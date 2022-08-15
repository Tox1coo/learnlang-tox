<template>
  <div v-if="isLoading" class="main">
    <NavBar v-if="isUser"></NavBar>
    <Welcome v-else-if="!isUser"></Welcome>
  </div>
  <Loading v-else></Loading>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Welcome from "@/views/Welcome";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: { Welcome },
  computed: {
    ...mapState({
      isUser: (state) => state.user.isUser,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  async mounted() {
    // eslint-disable-next-line no-unused-vars
    this.onAuthUser()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(async () => {
        setTimeout(async () => {
          await this.checkLearnLangs(this.userInfo.uid).finally(() => {
            setTimeout(() => {
              this.isLoading = true;
            }, 450);
          });
        }, 1000);
      });

    /* user.then((response) => {

      console.log(response);
    }); */
  },
  methods: {
    ...mapActions({
      signOutUser: "user/signOutUser",
      onAuthUser: "user/onAuthUser",
      checkLearnLangs: "lang/checkLearnLangs",
    }),
    ...mapMutations({
      updateIsUser: "user/updateIsUser",
      updateIsRegistered: "user/updateIsRegistered",
      updateAuthStage: "user/updateAuthStage",
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
  overflow: hidden;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main {
  position: relative;
  height: 100%;
}
</style>
