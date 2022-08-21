<template>
  <div @click="visibleDrop = !visibleDrop" class="select">
    <button :class="{ 'active-button': visibleDrop }" class="select__btn">
      {{ activeTableGroup }}
    </button>
    <ul :class="{ 'active-drop': visibleDrop }" class="select__drop">
      <li
        class="select__drop-item"
        @click="$emit('update:activeTableGroup', 'All groups')"
      >
        All groups
      </li>
      <li
        v-for="selectItem in selectDrop"
        :key="selectItem"
        class="select__drop-item"
        @click="$emit('update:activeTableGroup', selectItem)"
      >
        {{ selectItem }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  data() {
    return {
      visibleDrop: false,
    };
  },
  props: {
    selectDrop: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeTableGroup: {
      type: String,
      required: true,
      default: "All groups",
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  width: 90px;
  position: relative;
  &__btn {
    cursor: pointer;
    background: none;
    border: none;
    color: #000;
    padding: 15px;
    padding-left: 0;
    font-style: italic;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      height: 0;
      width: 0;
      border-width: 5px 5px 0 5px;
      border-color: #000 transparent transparent transparent;
      border-style: solid;
      top: 50%;
      transform: translateY(-50%);
      right: 0px;
      pointer-events: none;
      transition: all 0.2s ease 0s;
    }
  }
  &__drop {
    width: 100%;
    visibility: hidden;
    opacity: 0;
    list-style: none;
    height: fit-content;
    min-height: 50px;
    background-color: transparent;
    backdrop-filter: blur(5px);
    position: absolute;
    top: 70%;
    transform: translateY(-20%);

    border-radius: 10px;
    border: 1px solid #999;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    &-item {
      width: fit-content;
      margin-left: 10px;
      margin-top: 4px;
      font-size: 1.4rem;
    }
    transition: all 0.3s ease;
  }
}
.active {
  &-button {
    &::after {
      transform: rotate(-180deg) translateY(50%);
    }
  }
  &-drop {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}
</style>