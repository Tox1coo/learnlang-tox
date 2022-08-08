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
  background-color: rgba(#000, 0.3);
  position: fixed;
}
</style>