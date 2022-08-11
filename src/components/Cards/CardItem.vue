<template>
  <div
    v-if="cardItem != undefined"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    :style="{ transform: transformString }"
    class="card"
  >
    {{ cardItem.def[0]?.text }}
    {{ cardItem.def[0]?.tr[0].text }}
    {{ cardItem.def[0]?.pos }}
    {{ cardItem.def[0]?.ts }}
  </div>
</template>

<script>
import interact from "interactjs";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactXThreshold: 100,
  },
  props: {
    cardItem: {
      type: Object,
      default: () => {},
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, rotation } = this.interactPosition;
        return `translateX(${x}px) rotate(${rotation}deg)`;
      }

      return null;
    },
  },
  data() {
    return {
      // isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        rotation: 0,
      },
    };
  },
  mounted() {
    const element = this.$refs.interactElement;
    console.log(element);
    if (element != undefined) {
      interact(element).draggable({
        onstart: () => {
          this.isInteractAnimating = false;
        },

        onmove: (event) => {
          const { interactMaxRotation, interactXThreshold } =
            this.$options.static;
          const x = this.interactPosition.x + event.dx;

          let rotation = interactMaxRotation * (x / interactXThreshold);

          if (rotation > interactMaxRotation) rotation = interactMaxRotation;
          else if (rotation < -interactMaxRotation)
            rotation = -interactMaxRotation;

          this.interactSetPosition({ x, rotation });
        },

        onend: () => {
          const { x } = this.interactPosition;
          const { interactXThreshold } = this.$options.static;
          this.isInteractAnimating = true;

          if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
          else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
          else this.resetCardPosition();
        },
      });
    }
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        // this.isShowing = false;
        this.interactPosition.x = 0;
        this.interactPosition.rotation = 0;

        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const { interactOutOfSightXCoordinate, interactMaxRotation } =
        this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          });
          this.$emit(REJECT_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, rotation };
    },

    interactUnsetElement() {
      // interact(this.$refs.interactElement).unset(); для того, чтобы убрать элементы
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, rotation: 0 });
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  width: 300px;
  height: 500px;
  background-color: $background-accent;
  color: $linearWel;
  font-weight: 700;
  font-size: 2.2rem;

  &.isAnimating {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}
</style>