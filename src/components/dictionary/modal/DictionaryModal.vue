<template>
  <div v-if="show" @click.stop="hideDialog()" class="modal">
    <div @click.stop class="modal__inner">
      <div @click="hideDialog()" class="close"></div>
      <div class="modal__inner-item">
        <DictionaryModalItem
          :modalItemLang="modalItem[nativeLang]"
          :textItem="'Original:'"
        ></DictionaryModalItem>
        <DictionaryModalItem
          :modalItemLang="modalItem[learningLang]"
          :textItem="'Translate:'"
        ></DictionaryModalItem>
      </div>
      <MyButtonAuth
        v-if="!modalItem.important"
        class="btn--modal"
        @click="makeImportant(modalItem)"
        >Make it important</MyButtonAuth
      >
      <MyButtonAuth
        v-else
        class="btn--modal"
        @click="removeImportant(modalItem)"
        >Remove from important</MyButtonAuth
      >

      <div class="modal__inner-progress">
        <DictionaryModalProgress
          :modalItem="modalItem"
        ></DictionaryModalProgress>
      </div>
    </div>
  </div>
</template>

<script>
import close from "@/mixins/close.js";
import DictionaryModalItem from "@/components/dictionary/modal/DictionaryModalItem.vue";
import DictionaryModalProgress from "@/components/dictionary/modal/DictionaryModalProgress.vue";
import { mapActions } from "vuex";
export default {
  props: {
    nativeLang: {
      type: String,
      required: true,
    },
    learningLang: {
      type: String,
      required: true,
    },
    modalItem: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  mixins: [close],
  components: { DictionaryModalItem, DictionaryModalProgress },
  methods: {
    ...mapActions({
      makeImportant: "dictionary/makeImportant",
    }),
  },
};
</script>

<style scoped lang="scss">
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1000;
  overflow-y: scroll;
  display: flex;
  cursor: pointer;
  background-color: rgba(#161616, 0.5);
  &::-webkit-scrollbar {
    width: 0;
  }
  &__inner {
    position: relative;
    cursor: default;
    margin: auto;
    &-item {
      gap: 15px;

      @extend %center;
      @media (max-width: 930px) {
        width: 100%;
      }
      @media (max-width: 370px) {
        gap: 5px;
      }
    }
    @media (max-width: 930px) {
      padding: 10px;
    }
  }
}
.close {
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
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
}
</style>