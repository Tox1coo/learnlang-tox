<template>
  <div class="question__button">
    {{ answer }}
  </div>
</template>

<script>
export default {
  props: {
    /*     currentAnswer: {
      type: String,
      required: true,
    }, */
    answer: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>