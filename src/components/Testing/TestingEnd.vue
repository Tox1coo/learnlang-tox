<template>
  <div class="testing__end">
    <h1 class="title">
      <slot></slot>
    </h1>
    <MyButtonAuth @click="$emit('eventEnd')">Close test</MyButtonAuth>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.testing__end {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
}
</style>