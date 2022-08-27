<template>
  <div class="modal__progress">
    <h1 class="title modal__progress-title">Your Progress:</h1>
    <div class="modal__progress-inner">
      <div class="modal__progress-count">
        <div
          v-for="modalProgressItem in progress"
          :key="modalProgressItem.type"
          class="progress__item"
        >
          <div
            v-if="this.modalItem[this.progress[2].type] != undefined"
            class="progress__item-count"
          >
            <img
              :src="require(`@/assets/${modalProgressItem.type}.png`)"
              alt=""
            />
            <pre>{{ modalProgressItem.title }}</pre>
            <div v-if="modalProgressItem.colors != undefined">
              <span :class="classProgress">{{ modalItem.progress }} %</span>
            </div>
            <div v-else>
              <span>{{ modalItem[modalProgressItem.type] }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__progress testing">
        <MyButtonAuth @click="$router.push('/testing')"
          >Go to testing</MyButtonAuth
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      progress: [
        {
          title: `Correct
answer`,
          type: "correct",
        },
        {
          title: `Incorrect
answer`,
          type: "incorrect",
        },
        {
          title: `Percentage of
correct answers`,
          type: "progress",
          colors: [
            { 25: "#ff1345" },
            { 50: "#ff9" },
            { 75: "lightgreen" },
            { 100: "green" },
          ],
        },
      ],
    };
  },
  computed: {
    classProgress() {
      return {
        verybad: this.modalItem[this.progress[2].type] <= 25,
        bad:
          this.modalItem[this.progress[2].type] < 50 &&
          this.modalItem[this.progress[2].type] > 25,
        good:
          this.modalItem[this.progress[2].type] < 70 &&
          this.modalItem[this.progress[2].type] >= 50,
        verygood:
          this.modalItem[this.progress[2].type] >= 70 &&
          this.modalItem[this.progress[2].type] < 100,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.modal__progress {
  &-title {
    text-align: start;
    color: #fff;
    margin-bottom: 15px;
    margin-top: 10px;

    @media (max-width: 560px) {
      font-size: 2.5rem;
    }
  }
  &-inner {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    align-items: center;
    @media (max-width: 922px) {
      .btn--auth {
        width: 200px;
      }
      padding: 5px;
    }
    @media (max-width: 400px) {
      .btn--auth {
        width: 120px;
        text-transform: none;
      }
    }
  }
  &-count {
    display: flex;
    width: 55%;
    flex: 0 1 auto;
    justify-content: space-around;
    @media (max-width: 710px) {
      width: 80%;
    }
  }
}
.progress__item {
  &-count {
    font-weight: 700;
    font-size: 1.8rem;
    span {
      font-style: italic;
    }
    div {
      margin-top: 5px;
    }
    img {
      display: none;
    }
    @media (max-width: 560px) {
      font-size: 1.5rem;
    }
    @media (max-width: 630px) {
      pre {
        display: none;
      }
      img {
        display: block;
        margin: auto;
      }
    }
  }
}
.verybad {
  color: #ff1345;
}
.bad {
  color: #d2d20d;
}
.good {
  color: lightgreen;
}
.verygood {
  color: green;
}
</style>