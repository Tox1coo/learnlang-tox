<template>
  <div class="synonym" @click="showInformation = !showInformation" :class="{'synonym--hide': !showInformation}">
    <div class="synonym__inner">
      <SynonymsCardItem v-for="(synonymWord, index) in synonymWords" :key="`${index}-${synonymWord.pos}`"
        :synonymWord="synonymWord" :numberWord="index + 1"></SynonymsCardItem>
    </div>
  </div>
</template>

<script>
import SynonymsCardItem from "@/components/SynonymsCard/SynonymsCardItem.vue";
export default {
  data() {
    return {
      showInformation: false
    }
  },
  props: {
    synonymWords: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: { SynonymsCardItem },
};
</script>

<style scoped lang="scss">
.synonym {
  position: relative;
  height: calc(100% - 60px);
  min-width: 100%;
  margin-top: 60px;
  background-color: rgba($background-accent, 0.7);
  border-radius: 10px;
  overflow-y: scroll;
  font-size: calc($font-size-card - 2px);
  cursor: pointer;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 910px) {
    font-size: calc($font-size-card - 4px);
  }

  @media (max-width: 700px) {
    margin-top: 15px;
  }

  &.synonym--hide {
    &::before {
      content: 'Click to more information';
      width: 100%;
      height: 100%;
      z-index: 1000;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $background-accent;
    }
  }
}
</style>