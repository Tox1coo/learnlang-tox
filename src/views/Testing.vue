<template>
  <div class="block testing">
    <div class="container">
      <TestingEnd
        v-if="
          indexQuestion !== 0 && indexQuestion === getQuestionForTesting.length
        "
        @eventEnd="endTesting"
      >
        You have finished the test!
      </TestingEnd>
      <div
        v-if="isLoadingTests && indexQuestion < getQuestionForTesting.length"
        class="testing__progressbar"
      >
        <div class="progressbar">
          <div class="progressbar__start">0</div>
          <div ref="progressbarLine" class="progressbar__line"></div>
          <div class="progressbar__end">
            {{ getQuestionForTesting.length }}
          </div>
        </div>
      </div>
      <div v-if="!showTesting && !isLoadingTests" class="testing__preview">
        <TestingSettings></TestingSettings>
        <h1 class="title">Are you ready to take the test?</h1>
        <MyButtonAuth @click="(showTesting = true), startTesting()"
          >Ready</MyButtonAuth
        >
      </div>
      <Loading v-else-if="!isLoadingTests || isNextQuestion"></Loading>
      <div
        v-else-if="
          isLoadingTests && getQuestionForTesting[indexQuestion] !== undefined
        "
        class="testing__questions questions"
      >
        <TestingQuestion
          :question="getQuestionForTesting[indexQuestion]"
          @nextQuestion="nextQuestion"
        ></TestingQuestion>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import TestingQuestion from "@/components/Testing/TestingQuestion.vue";
import TestingEnd from "@/components/Testing/TestingEnd.vue";
import TestingSettings from "../components/Testing/TestingSettings.vue";
export default {
  data() {
    return {
      showTesting: false,
      indexQuestion: 0,
      isNextQuestion: false,
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
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (from.name !== "Testing") next();
      else if (
        from.name === "Testing" &&
        this.getQuestionForTesting.length > 0
      ) {
        const confirm = window.confirm(
          "Are you sure? You will not be able to continue the test later."
        );
        if (confirm) {
          this.endTesting();
          next();
        } else next(false);
      } else next();
    });
  },
  methods: {
    ...mapMutations({
      updateShowTesting: "testing/updateShowTesting",
      updateAnswer: "testing/updateAnswer",
    }),
    ...mapActions({
      initQuestions: "testing/initQuestions",
      getAllWordInTesting: "testing/getAllWordInTesting",
      clearTest: "testing/clearTest",
    }),
    async startTesting() {
      await this.initQuestions();
    },
    nextQuestion() {
      this.isNextQuestion = true;
      this.indexQuestion++;

      const progress =
        (this.indexQuestion / this.getQuestionForTesting.length) * 100;
      this.$refs.progressbarLine.style.width = `${progress}%`;

      setTimeout(() => {
        this.isNextQuestion = false;
        this.updateAnswer(null);
      }, 1000);
    },
    endTesting() {
      this.indexQuestion = 0;
      this.showTesting = false;
      this.isNextQuestion = false;
      this.clearTest();

      this.updateAnswer(null);
    },
  },
  components: { TestingQuestion, TestingEnd, TestingSettings },
};
</script>

<style scoped lang="scss">
.block {
  .container {
    max-width: 800px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    margin: 0 auto;
  }
  padding: 0px 0px 0px 0px;
}
.testing {
  &__preview {
    .title {
      margin-bottom: 50px;
    }
  }
  &__questions {
    flex: 1 0 70%;
  }
}
.testing__progressbar {
  width: 100%;
  position: relative;
  flex: 1 1 30%;
  margin: 100px 0 30px;
}

.progressbar {
  width: 100%;
  height: 8px;
  border: 1px solid #ccc;
  border-radius: 25px;
  position: relative;
  &__start {
    position: absolute;
    left: -25px;
    top: -14px;
    width: 32px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $accent;
    font-size: 1.5rem;
  }
  &__line {
    position: absolute;
    max-width: 100%;
    background-color: $primary-correct;
    height: 100%;
    transition: width 1s ease 0s;
  }
  &__end {
    @extend .progressbar__start;
    left: auto;
    right: -25px;
  }
}
</style>