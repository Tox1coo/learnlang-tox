<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__link">
        <router-link class="nav__link" to="/">Home</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped lang="scss">
.nav {
  width: $widthnavdecs;
  height: 100%;
  background: none;
  border: 1px solid #ccc;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  background-color: rgba(#000, 0.2);
  position: fixed;
  z-index: 999;
  backdrop-filter: blur(5px);

  &__list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
</style>