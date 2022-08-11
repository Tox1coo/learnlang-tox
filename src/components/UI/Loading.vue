<template>
  <div class="loading">
    <div class="loading__inner"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped lang="scss">
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;

  &__inner {
    width: 100%;
    height: 100%;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: loading-first 3s cubic-bezier(0.14, 0.47, 0.2, 1.15) infinite;
      border-radius: 50%;
      border: 1px solid rgba($background-accent, 0.5);
    }
    &::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: loading-last 1.5s cubic-bezier(0.14, 0.47, 0.2, 1.15) infinite;
      border-radius: 50%;
      border: 1px solid rgba($background-accent, 0.5);
    }
  }
}
@keyframes loading-first {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }

  50% {
    transform: scale(60);
    opacity: 1;
  }

  100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
}
@keyframes loading-last {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(70);
    opacity: 1;
  }
  100% {
    transform: scale(0.1);
    opacity: 0.5;
  }
}
</style>