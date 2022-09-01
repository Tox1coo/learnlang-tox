<template>
  <div
    v-if="cardItem != undefined"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
      nonShadow: shadow === null,
      trueShadow: shadow,
      falseShadow: shadow === false,
    }"
    :style="{ transform: transformString }"
    class="card"
  >
    <div class="card__speech">
      <VolumeButton
        :voiceLanguage="currentLanguage"
        :word="cardItem.def[0]?.text"
      ></VolumeButton>
    </div>
    <div class="card__title">
      <p>
        {{ cardItem.def[0]?.text }}
        [{{ cardItem.def[0]?.pos }}]
      </p>
      <p v-if="cardItem.def[0]?.ts != undefined">
        [ {{ cardItem.def[0]?.ts }} ]
      </p>
    </div>
    <div @click="isVisible = !isVisible" class="card__translate">
      <div v-if="isVisible" class="card__translate-word">
        <p>Translate:</p>
        {{ cardItem.def[0]?.tr[0].text }}
      </div>
      <p v-else class="card__translate-word">Do Click</p>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
import { mapMutations } from "vuex";
export default {
  static: {
    interactMaxRotation: 20,
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
    currentLanguage: {
      type: String,
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
      shadow: null,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        rotation: 0,
      },
      isVisible: false,
      countTouchEvent: 1,
    };
  },
  mounted() {
    const element = this.$refs.interactElement;
    if (this.isCurrent && this.cardItem != undefined) {
      this.updateCurrentWord(this.cardItem);
    }
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
          /*  if (x < 20 && x > -20 && this.shadow !== null) this.shadow = null;
          if (rotation > interactMaxRotation / 2 && this.shadow !== true)
            this.shadow = true;
          if (rotation < -interactMaxRotation / 2 && this.shadow !== false)
            this.shadow = false; */

          if (rotation > interactMaxRotation) rotation = interactMaxRotation;
          else if (rotation < -interactMaxRotation)
            rotation = -interactMaxRotation;

          this.interactSetPosition({ x, rotation });
        },

        onend: () => {
          const { x } = this.interactPosition;
          const { interactXThreshold } = this.$options.static;
          this.isInteractAnimating = true;

          if (x > interactXThreshold) {
            this.playCard(ACCEPT_CARD);
            this.shadow = null;
          } else if (x < -interactXThreshold) {
            this.playCard(REJECT_CARD);
            this.shadow = null;
          } else {
            this.resetCardPosition();
            this.shadow = null;
          }
          // доделать потом систему с прогрессом
        },
      });
    }
  },

  methods: {
    ...mapMutations({
      updateCurrentWord: "lang/updateCurrentWord",
    }),

    hideCard() {
      setTimeout(() => {
        // this.isShowing = false;
        this.interactPosition.x = 0;
        this.interactPosition.rotation = 0;

        this.$emit("hideCard", this.card);
        this.isVisible = false;
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
  watch: {
    isCurrent(current) {
      if (current && this.cardItem != undefined) {
        this.updateCurrentWord(this.cardItem);
      }
    },
    cardItem(card) {
      if (this.isCurrent) {
        this.updateCurrentWord(card);
      }
    },
    currentLanguage() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  width: 100%;
  height: 500px;
  background-color: $background-accent;
  color: $linearWel;
  font-weight: 700;
  font-size: $font-size-card;
  transition: box-shadow 0.15s cubic-bezier(0.17, 0.23, 0.08, 0.94);
  &.isAnimating {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  &.isCurrent {
    z-index: 1000;
    pointer-events: auto;
  }
  &__speech {
    position: absolute;

    top: 30%;
    left: 50%;
    transform: translate(-50%, 30%);
  }
  &__title {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #000;
  }
  &__translate {
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    &-word {
      user-select: none;
    }
  }

  &.nonShadow {
    box-shadow: none;
  }

  &.trueShadow {
    box-shadow: inset 5px 15px 25px green, 10px 10px 10px green,
      inset 10px 10px 25px green;
  }
  &.falseShadow {
    box-shadow: inset 5px 15px 25px red, 10px 10px 10px red,
      inset 10px 10px 25px red;
  }
}
</style>