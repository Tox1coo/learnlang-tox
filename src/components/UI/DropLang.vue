<template>
  <div class="drop">
    <div class="drop__inner">
      <div v-for="dropItem in dropList" :key="dropItem" class="drop__item">
        {{ dropItem[dropLang].def[0].text }}
        <div @click="$emit('removeWord', dropItem)" class="remove">
          <div class="remove__item"></div>
        </div>
      </div>

    </div>
  </div>
  <button @click.stop="updatingGroupWord()" class="btn btn--auth btn--word" style="width: 130px; font-size: 1rem">
    Add Words
  </button>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DropLang",
  props: {
    dropList: Array,
    dropLang: String,
    group: String,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      groupList: (state) => state.lang.groupList,
    }),
  },
  methods: {
    ...mapActions({
      updateGroupWord: "lang/updateGroupWord",
    }),
    updatingGroupWord() {
      this.groupList[this.group] = [
        ...this.dropList,
        ...this.groupList[this.group],
      ];
      this.$emit("update:dropList", []);
      this.updateGroupWord({ userID: this.userInfo.uid });
    },
  },
};
</script>

<style scoped lang="scss">
.drop {
  width: 100%;
  min-height: 100px;
  height: fit-content;
  border: 1px solid #cbcfd2;
  border-radius: 10px;
  padding: 10px 20px 10px 10px;
  background-color: transparent;

  &__inner {
    z-index: 1000;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    position: relative;
  }

  &__item {
    font-size: 1.5rem;
    position: relative;
  }

  margin-bottom: 1.5rem;


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