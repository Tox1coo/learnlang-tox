<template>
  <div class="testing__question question">
    <h3 class="subtitle">{{ question.question }}</h3>
    <p class="text">Choice correct answer</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped >
</style>