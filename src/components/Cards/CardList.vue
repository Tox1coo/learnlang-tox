<template>
  <div class="cards">
    <div class="cards__inner">
      <CardItem
        v-for="(card, index) in cards"
        :key="card"
        :cardItem="card[language]"
        :is-current="index === 0"
        @cardAccepted="$emit('cardAccepted')"
        @cardRejected="$emit('cardRejected')"
        @hideCard="$emit('hideCard')"
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
};
</script>

<style scoped lang="scss">
.cards {
  position: relative;
  width: 300px;
  height: 500px;
}
</style>