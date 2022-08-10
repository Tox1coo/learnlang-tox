<template>
  <div class="addgroup">
    <form @submit.prevent="addGroupUser" action="">
      <!-- сделать ошибку, что уже есть такая группа -->
      <MyInput
        v-model="groupName"
        :placeholderInput="'Enter group name. '"
        :error="errorGroup"
        :clear="true"
      ></MyInput>
      <MyButtonAuth style="width: 160px; font-size: 1rem; margin-left: 10px">
        Add group
      </MyButtonAuth>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      groupName: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      errorGroup: (state) => state.lang.errorGroup,
    }),
  },
  methods: {
    ...mapActions({
      addGroupLang: "lang/addGroupLang",
    }),
    addGroupUser() {
      if (!this.groupName.match(/\d/)) {
        console.log(2);
        this.addGroupLang({
          groupName: this.groupName,
          userID: this.userInfo.uid,
        });
      }
    },
  },
};
</script>

<style>
</style>