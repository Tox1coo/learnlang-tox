<template>
  <div
    @click="checkAnswer"
    class="question__button"
    :class="{
      question__button_correct: isCorrect,
      question__button_incorrect: inCorrect,
    }"
  >
    {{ answer.wordInLerningLang }}
    <div class="question__button_effect"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isCorrect: false,
      inCorrect: false,
    };
  },
  props: {
    answer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      answerCheck: (state) => state.testing.answerCheck,
      wordsInTesting: (state) => state.testing.wordsInTesting,
    }),
  },
  methods: {
    ...mapMutations({
      updateAnswer: "testing/updateAnswer",
    }),
    checkAnswer() {
      if (this.answerCheck === null) {
        if (this.answer.correct) {
          this.isCorrect = true;
        } else this.inCorrect = true;
        this.updateAnswer(this.answer);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.question {
  &__button {
    flex: 0 1 45%;
    width: 100%;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 25px;
    backdrop-filter: blur(10px);
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    color: $error;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    font-weight: 700;
    transition: color 0.2s;
    &_effect {
      position: absolute;
      background-color: $accent;
      opacity: 0.2;
      width: 100%;
      height: 100%;
      z-index: -1;
      transform: translateX(-100%);
      transition: transform 0.4s ease 0s;
    }
    &:hover {
      .question__button_effect {
        transform: translateX(0);
      }
    }
    &_correct {
      background-color: $primary-correct;
      animation: correct 1.5s ease;
    }
    &_incorrect {
      background-color: $error;
      animation: incorrect 1.5s ease;
      color: #fff;
    }
  }
}

@keyframes correct {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes incorrect {
  0% {
    transform: scale(0.7);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>