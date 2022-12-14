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
      <div class="modal__inner-btn">
        <MyButtonAuth class="btn--modal" @click="removeWordDictionary()"
          >Delete a word</MyButtonAuth
        >
        <MyButtonAuth
          v-if="!modalItem.important"
          class="btn--modal"
          @click="makeImportant({ dictionaryItem: modalItem, status: true })"
          >Make it important</MyButtonAuth
        >

        <MyButtonAuth
          v-else
          class="btn--modal"
          @click="makeImportant({ dictionaryItem: modalItem, status: false })"
          >Remove from important</MyButtonAuth
        >
      </div>

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
      removeWord: "dictionary/removeWord",
    }),
    removeWordDictionary() {
      let confirm = window.confirm(
        `Are you sure you want to delete the "${
          this.modalItem[this.nativeLang].def[0].text
        }" word?`
      );
      if (confirm) {
        this.removeWord(this.modalItem);
        this.hideDialog();
      }
    },
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
  overflow-y: auto;
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
      padding: 3px;
    }
    &-btn {
      display: flex;
      gap: 15px;
      justify-content: flex-end;

      @media (max-width: 630px) {
        .btn {
          width: 200px;
        }
      }
      @media (max-width: 430px) {
        .btn {
          padding: 10px 15px;
          text-transform: none;
          width: 150px;
        }
      }
    }
  }
}
</style>