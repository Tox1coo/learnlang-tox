<template>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    class="input"
    :class="{ input__error: typeInput === errorType || error }"
    :type="typeInput"
    :placeholder="placeholderInput"
  />
  <slot></slot>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    typeInput: {
      type: String,
      default: "text",
    },
    placeholderInput: {
      required: true,
      type: String,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorType: String,
    modelValue: [String, Number],
  },
};
</script>

<style scoped lang="scss">
</style>