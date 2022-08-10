<template>
  <div class="card">
    <div class="card__item"></div>
  </div>
</template>

<script>
export default {
  props: {
    cardItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>