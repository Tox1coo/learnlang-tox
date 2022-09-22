<template>
  <div class="testing__question question">
    <h3 class="subtitle">{{ question?.question }}</h3>
    <p class="text">Choice correct answer</p>
    <div class="question__buttons">
      <TestingQuestionButton
        v-for="answer in newQuestion.answers.sort(() => Math.random() - 0.5)"
        :key="answer.wordInNatureLang"
        :answer="answer"
      >
      </TestingQuestionButton>
    </div>
    <MyButtonAuth @click="goToNextQuestion">Next question</MyButtonAuth>
  </div>
</template>

<script>
import TestingQuestionButton from "@/components/Testing/TestingQuestionButton.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newQuestion: null,
    };
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      answerCheck: (state) => state.testing.answerCheck,
      commLearnLang: (state) => state.lang.commLearnLang,
      wordsInTesting: (state) => state.testing.wordsInTesting,
    }),
  },
  created() {
    this.newQuestion = this.question;
  },
  methods: {
    ...mapActions({
      setProgressWord: "dictionary/setProgressWord",
    }),
    goToNextQuestion() {
      if (this.answerCheck !== null) {
        const word = this.wordsInTesting.find(
          (word) =>
            word.group === this.question.group &&
            word[this.commLearnLang.match(/\w+\b/)[0]].def[0].text ===
              this.question.word
        );
        if (this.answerCheck.correct) {
          this.setProgressWord({ dictionaryItem: word, status: true });
        } else {
          this.setProgressWord({ dictionaryItem: word, status: false });
        }
        this.$emit("nextQuestion");
      }
    },
  },
  components: { TestingQuestionButton },
};
</script>

<style lang="scss" scoped >
.question {
  &__buttons {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 50px 0;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>