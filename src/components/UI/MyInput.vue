<template>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    @change="clearInput($event)"
    class="input"
    :style="{ width: width + 'px' }"
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
    clear: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    width: Number,
    errorType: String,
    modelValue: [String, Number],
  },
  methods: {
    clearInput(event) {
      if (this.clear) event.target.value = "";
    },
  },
};
</script>

<style scoped lang="scss">
</style>