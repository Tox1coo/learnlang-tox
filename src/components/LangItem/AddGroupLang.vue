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
      <MyButtonAuth class="btn--addgroup"> Add group </MyButtonAuth>
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
        this.addGroupLang({
          groupName: this.groupName,
          userID: this.userInfo.uid,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.addgroup {
  & .btn--addgroup {
    margin-left: 5px;
    @media (max-width: 496px) {
      margin-top: 10px;
    }
  }
}
</style>