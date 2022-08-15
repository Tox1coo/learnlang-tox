<template>
  <div class="cards">
    <div class="cards__inner">
      <CardItem
        v-for="(card, index) in listWord"
        :key="card"
        :cardItem="card[language]"
        :is-current="index === 0"
        :currentLanguage="language"
        @cardAccepted="$emit('cardAccepted')"
        @cardRejected="$emit('cardRejected')"
        @hideCard="$emit('hideCard', card[language])"
      >
      </CardItem>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/Cards/CardItem.vue";
export default {
  components: { CardItem },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "en",
    },
  },
  computed: {
    listWord() {
      return this.cards.filter((words) => words !== "");
    },
  },
};
</script>

<style scoped lang="scss">
.cards {
  position: relative;
  width: 300px;
  height: 500px;
}
</style>