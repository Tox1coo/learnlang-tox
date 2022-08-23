<template>
  <div v-if="show" @click.stop="hideDialog()" class="modal">
    <div @click.stop class="modal__inner">
      <DictionaryModalItem
        :modalItemLang="modalItem[nativeLang]"
        :textItem="'Original:'"
      ></DictionaryModalItem>
      <DictionaryModalItem
        :modalItemLang="modalItem[learningLang]"
        :textItem="'Translate:'"
      ></DictionaryModalItem>
    </div>
  </div>
</template>

<script>
import close from "@/mixins/close.js";
import DictionaryModalItem from "@/components/dictionary/modal/DictionaryModalItem.vue";
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
  components: { DictionaryModalItem },
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
  display: flex;
  cursor: pointer;
  background-color: rgba(#161616, 0.5);
  &__inner {
    margin: auto;
    gap: 50px;
    @extend %center;
  }
}
</style>