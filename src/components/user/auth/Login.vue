<template>
  <form @submit.prevent class="login">
    <MyInput
      v-model="email"
      :typeInput="'email'"
      :placeholderInput="'Your email'"
      v-model:errorType="errorType"
    ></MyInput>
    <MyInput
      v-model="password"
      :typeInput="'password'"
      v-model:errorType="errorType"
      :placeholderInput="'Your password'"
    ></MyInput>
    <span v-if="error" class="error">{{ errorText }}</span>
    <MyButtonAuth @click="LoginUser()">Login</MyButtonAuth>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { messages } from "@/utils/messages/messages.js";
import { mapActions, mapMutations, mapState } from "vuex";
import { required, email } from "@vuelidate/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorKey: "",
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.user.error,
      errorMessage: (state) => state.user.errorMessage,
    }),
    errorType: {
      get() {
        return messages.filter(
          (message) => message.key === this.errorMessage
        )[0]?.type;
      },
    },
    errorText: {
      get() {
        return messages.filter(
          (message) => message.key === this.errorMessage
        )[0]?.text;
      },
    },
  },
  validations() {
    return {
      password: { required },
      email: { required, email },
    };
  },
  methods: {
    ...mapMutations({
      updateError: "user/updateError",
      updateErrorMessage: "user/updateErrorMessage",
    }),
    ...mapActions({
      signInUser: "user/signInUser",
    }),
    LoginUser() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.updateError(false);
      this.updateErrorMessage("");

      try {
        // eslint-disable-next-line no-unused-vars
        const signin = this.signInUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        if (this.error) {
          console.log(messages);
          for (const key in messages) {
            console.log(key);
            if (key === this.errorMessage) {
              console.log(messages[key].text);
              this.errorText = messages[key].text;
              this.errorKey = messages[key].type;
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
</style>