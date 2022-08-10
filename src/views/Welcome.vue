<template>
  <div class="welcome">
    <div v-if="!isRegistered" class="welcome__login">
      <h1 class="title">Welcome!</h1>
      <h2 class="subtitle">let's start learning languages :)</h2>
      <Login></Login>
      <div class="create">
        Not a member?
        <a
          @click="
            updateIsRegistered(true), updateError(false), updateErrorMessage('')
          "
          >Sign up now</a
        >
      </div>
    </div>
    <div v-else-if="isRegistered && authStage === 1" class="welcome__register">
      <h1 class="title">Register Account</h1>
      <Register></Register>
      <div class="create">
        Do you have account?
        <a
          @click="
            updateIsRegistered(false),
              updateError(false),
              updateErrorMessage('')
          "
          >Sign in now</a
        >
      </div>
    </div>
    <div v-else class="welcome__choice">
      <h1 class="title">Welcome, {{ userInfo.displayName }}</h1>
      <ChoiceLang></ChoiceLang>
    </div>
  </div>
</template>

<script>
import Login from "@/components/user/auth/Login";
import Register from "@/components/user/auth/Register.vue";
import { mapMutations, mapState } from "vuex";
import ChoiceLang from "@/components/user/auth/ChoiceLang.vue";

export default {
  data() {
    return {
      isRegister: false,
    };
  },
  components: { Login, Register, ChoiceLang },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isRegistered: (state) => state.user.isRegistered,
      authStage: (state) => state.user.authStage,
    }),
  },
  methods: {
    ...mapMutations({
      updateError: "user/updateError",
      updateErrorMessage: "user/updateErrorMessage",
      updateIsRegistered: "user/updateIsRegistered",
    }),
  },
};
</script>

<style scoped lang="scss">
.welcome {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    margin-bottom: 1rem;
  }
  .create {
    margin-top: 1rem;
    font-size: 1.6rem;
  }
  a {
    cursor: pointer;
    color: $accent;
    font-weight: 700;
  }
}
</style>