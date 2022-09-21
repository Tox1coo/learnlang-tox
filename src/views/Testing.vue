<template>
  <div class="testing">
    <div class="container">
      <div v-if="!showTesting && !isLoadingTests" class="testing__preview">
        <h1 class="title">Are you ready to take the test?</h1>
        <MyButtonAuth @click="(showTesting = true), startTesting()"
          >Ready</MyButtonAuth
        >
      </div>
      <Loading v-else-if="!isLoadingTests"></Loading>
      <TestingQuestion
        v-else
        :question="getQuestionForTesting[indexQuestion]"
      ></TestingQuestion>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import TestingQuestion from "@/components/Testing/TestingQuestion.vue";
export default {
  data() {
    return {
      showTesting: false,
      indexQuestion: 0,
    };
  },
  computed: {
    ...mapState({
      groupList: (state) => state.lang.groupList,
      indexWord: (state) => state.testing.indexWord,
      isLoadingTests: (state) => state.testing.isLoadingTests,
    }),
    ...mapGetters({
      getQuestionForTesting: "testing/getQuestionForTesting",
    }),
  },
  methods: {
    ...mapMutations({
      updateShowTesting: "testing/updateShowTesting",
    }),
    ...mapActions({
      initQuestions: "testing/initQuestions",
      getAllWordInTesting: "testing/getAllWordInTesting",
    }),
    async startTesting() {
      await this.initQuestions();
    },
  },
  mounted() {},
  components: { TestingQuestion },
};
</script>

<style scoped lang="scss">
.testing {
  height: 100vh;
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  &__preview {
    .title {
      margin-bottom: 50px;
    }
  }
}
</style>