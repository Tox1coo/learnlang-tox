<template>
  <div class="drop">
    <div class="drop__inner">
      <div v-for="dropItem in dropList" :key="dropItem" class="drop__item">
        {{ dropItem }}
        <div @click="$emit('removeWord', dropItem)" class="remove">
          <div class="remove__item"></div>
        </div>
      </div>
      <a
        @click.stop="updatingGroupWord()"
        class="btn btn--auth btn--word"
        style="width: 130px; font-size: 1rem"
      >
        Add Words
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DropLang",
  props: {
    dropList: Array,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      groupList: (state) => state.lang.groupList,
      currentGroup: (state) => state.lang.currentGroup,
    }),
  },
  methods: {
    ...mapActions({
      updateGroupWord: "lang/updateGroupWord",
    }),
    updatingGroupWord() {
      this.groupList[this.currentGroup] = [
        ...this.groupList[this.currentGroup],
        ...this.dropList,
      ];
      this.$emit("update:dropList", []);
      this.updateGroupWord({ userID: this.userInfo.uid });
    },
  },
};
</script>

<style scoped lang="scss">
.drop {
  position: absolute;
  width: 100%;
  min-height: 100px;
  height: fit-content;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(#ccc, 0.6);
  backdrop-filter: blur(5px);
  &__inner {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    position: relative;
  }
  &__item {
    font-size: 1.5rem;
    position: relative;
  }
}

.remove {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  right: -12px;
  cursor: pointer;
  &__item {
    position: relative;
    width: 12px;
    height: 12px;
    background-color: transparent;
    backdrop-filter: blur(5px);
    border: 1px solid #ccc;
    border-radius: 50%;
    transition: all 0.4s ease 0s;
    &:hover {
      background-color: rgba(#fff, 0.5);
    }
    &:after {
      content: "";
      display: block;
      width: 2px;
      height: 9px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: $error;
      position: absolute;
    }
    &:before {
      content: "";
      display: block;
      width: 2px;
      height: 9px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background-color: $error;
      position: absolute;
    }
  }
}
</style>