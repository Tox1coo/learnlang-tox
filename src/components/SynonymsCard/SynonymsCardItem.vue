<template>
  <div class="synonym__item">
    <div class="synonym__item-title">
      <span>{{ numberWord }}</span
      >.
      {{ synonymWord.text }}

      [{{ synonymWord.pos }}]
    </div>

    <div
      v-for="(translate, index) in synonymWord.tr"
      :key="`${index}-${translate.fr}`"
      class="synonym__item-translation translation"
    >
      <span>Translate:</span>
      {{ translate.text }}

      [{{ translate.pos }}]
      <br />
      <div v-if="translate?.ex != undefined" class="translation__example">
        <span>For example: </span>

        <p
          v-for="(example, index) in translate?.ex"
          :key="`ex-${index}`"
          class="translation__example-text"
        >
          {{ example.text }},
          <span class="translation__example-translate">
            {{ example.tr[0].text }}
          </span>
        </p>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    synonymWord: {
      type: Object,
      required: true,
      default: () => {},
    },
    numberWord: {
      type: Number,
    },
  },
};
</script>

<style scoped lang="scss">
.synonym__item {
  text-align: start;
  position: relative;
  padding: 5px;

  span {
    font-weight: 700;
    text-indent: 20px;
  }
  &-title {
    text-indent: 20px;
  }
}

.translation {
  margin-bottom: 5px;
  &__example {
    display: flex;
    flex-wrap: wrap;
    &-text {
      position: relative;
      text-decoration: underline dashed;
      cursor: pointer;
      margin-left: 5px;
      transition: color 0.2s ease 0s;
      &:hover {
        color: #6a8db0;
        & .translation__example-translate {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    &-translate {
      transition: all 0.2s ease 0s;
      position: absolute;
      padding: 5px;
      background-color: #000;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      visibility: hidden;
      opacity: 0;
      font-size: 1.6rem;
      border-radius: 5px;
      color: $background-accent;
      text-decoration: none !important;
      font-weight: 400 !important;
      text-indent: 0 !important;
    }
  }
}
</style>