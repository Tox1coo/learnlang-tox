<template>
  <div class="synonym">
    <div class="synonym__inner">
      <SynonymsCardItem
        v-for="(synonymWord, index) in synonymWords"
        :key="`${index}-${synonymWord.pos}`"
        :synonymWord="synonymWord"
        :numberWord="index + 1"
      ></SynonymsCardItem>
    </div>
  </div>
</template>

<script>
import SynonymsCardItem from "@/components/SynonymsCard/SynonymsCardItem.vue";
export default {
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
  height: calc(100% - 60px);
  min-width: 100%;
  margin-top: 60px;
  background-color: rgba($background-accent, 0.7);
  border-radius: 10px;
  font-size: calc($font-size-card - 2px);
}
</style>