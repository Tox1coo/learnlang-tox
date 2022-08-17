<template>
  <div v-if="show" @click.stop="hideDialog()" class="modal">
    <div @click.stop class="modal__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import close from "@/mixins/close.js";
export default {
  name: "Modal",
  mixins: [close],
};
</script>

<style scoped lang="scss">
.modal {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1000;
  display: flex;
  cursor: pointer;
  &__inner {
    position: relative;
    padding: 20px;
    margin: auto;
    background: #fff;
    border-radius: 12px;
    display: flex;
    border: 1px solid rgba(#999, 0.4);
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    cursor: default;
    display: flex;
    @media (max-width: 510px) {
      width: 90%;
    }
  }
}
/* .close {
  position: absolute;
  z-index: 100;
  right: -30px;
  top: -35px;
  display: flex;
  height: 24px;
  width: 24px;
  z-index: 1100;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::before {
    content: "";
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(45deg);
  }
} */
</style>