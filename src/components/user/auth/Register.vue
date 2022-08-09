<template>
  <form @submit.prevent class="register">
    <MyInputImage v-model:profilePhoto="profilePhoto"></MyInputImage>
    <MyInput
      v-model="name"
      :typeInput="'text'"
      :placeholderInput="'Write your name'"
      v-model:error="v$.name.$error"
    >
      <span class="error error__input" v-if="v$.name.$error">{{
        v$.name.$errors[0].$message
      }}</span></MyInput
    >
    <MyInput
      v-model="email"
      :typeInput="'email'"
      :placeholderInput="'Write your email'"
      v-model:errorType="errorType"
      v-model:error="v$.email.$error"
    >
      <span class="error error__input" v-if="v$.email.$error">{{
        v$.email.$errors[0].$message
      }}</span></MyInput
    >
    <MyInput
      v-model="password"
      :typeInput="'password'"
      :placeholderInput="'Write your password'"
      v-model:error="v$.password.$error"
    >
      <span class="error error__input" v-if="v$.password.$error">{{
        v$.password.$errors[0].$message
      }}</span></MyInput
    >
    <MyInput
      v-model="confirmPassword"
      :typeInput="'password'"
      :placeholderInput="'Repeat your password'"
      v-model:error="v$.confirmPassword.$error"
    >
      <span class="error error__input" v-if="v$.confirmPassword.$error">{{
        v$.confirmPassword.$errors[0].$message
      }}</span></MyInput
    >
    <span v-if="error" class="error">{{ errorText }}</span>

    <MyButtonAuth @click="signIn">Next</MyButtonAuth>
  </form>
</template>

<script>
import { messages } from "@/utils/messages/messages.js";
import { mapActions, mapState, mapMutations } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "@vuelidate/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      profilePhoto: {},
      v$: useVuelidate(),
    };
  },
  props: {
    authStage: Number,
  },
  validations() {
    return {
      password: { required, minLength: minLength(6), maxLength: maxLength(30) },
      email: { required, email },
      confirmPassword: { required, sameAs: sameAs(this.password) },
      name: { required },
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
  methods: {
    ...mapMutations({
      updateError: "user/updateError",
      updateErrorMessage: "user/updateErrorMessage",
    }),
    ...mapActions({
      signUpUser: "user/signUpUser",
    }),
    async signIn() {
      this.updateError(false);
      this.updateErrorMessage("");
      const result = await this.v$.$validate();
      if (result) {
        console.log(result);
        const user = {
          email: this.email,
          name: this.name,
          password: this.password,
          profilePhoto: this.profilePhoto,
        };
        this.signUpUser(user);
        return;
      }
      console.log(this.v$);
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
}
</style>