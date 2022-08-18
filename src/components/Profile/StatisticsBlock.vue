<template>
  <div class="user__statistics-block">
    <p class="text">{{ count }}</p>
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.user__statistics-block {
  .text {
    font-size: 2.2rem;
    font-weight: 700;
  }
  font-size: 1.8rem;
  font-style: italic;
  border: 1px solid #ccc;
  background: transparent;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 10px;
  @media (max-width: 459px) {
    font-size: 1.5rem;
    flex-wrap: wrap;
  }
  @media (max-width: 335px) {
    font-size: 1.3rem;
  }
}
</style>