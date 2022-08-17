<template>
  <div
    :class="{ current: isCurrent, incurrent: isCurrent === false }"
    class="recording"
  >
    <div class="recording__word" ref="recordingWords">
      <p v-if="recordingWord">{{ recordingWord }}</p>
      <p v-else>Say word...</p>
    </div>
    <div
      @click="toggleMic()"
      :class="{ active: isActive }"
      class="recording__microphone"
    >
      <img :src="micURL" />
    </div>
    <audio ref="audioCorrect">
      <source :src="require(`@/assets/correct.mp3`)" :type="typeAudio" />
    </audio>
    <audio ref="audioFail">
      <source :src="require(`@/assets/fail.wav`)" :type="typeAudio" />
    </audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
const recognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || "";
let sr;
if (recognition) {
  sr = "" || new recognition();
}

export default {
  props: {
    currentLanguage: {
      type: String,
      required: true,
    },
    isShowing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      currentWord: (state) => state.lang.currentWord,
    }),
    getMicURL() {
      return this.micURL;
    },
  },
  data() {
    return {
      isRecording: false,
      micURL: "https://img.icons8.com/ios-filled/24/000000/microphone--v1.png",
      isActive: false,
      recordingWord: "",
      isCurrent: null,
      audioURL: "",
      typeAudio: "",
    };
  },

  mounted() {
    if (recognition) {
      sr.lang = this.currentLanguage;
      sr.continuous = true;
      sr.onstart = () => {
        this.isRecording = true;
      };
      sr.onend = () => {
        this.isRecording = false;
        sr.onresult = (evt) => {
          const result = evt.results;
          if (
            result[0][0].transcript.toLocaleLowerCase() ===
            this.currentWord.def[0].text.toLocaleLowerCase()
          ) {
            this.audioURL = "correct.mp3";
            this.typeAudio = "audio/mpeg";
            this.isCurrent = true;
            this.$refs.audioCorrect.play();
          } else {
            this.audioURL = "fail.wav";
            this.typeAudio = "audio/wav";
            this.$refs.audioFail.play();

            this.isCurrent = false;
          }
          this.recordingWord = result[0][0].transcript.toLocaleLowerCase();
        };
      };
    } else {
      this.$emit("update:isShowing", false);
    }
  },

  methods: {
    toggleMic() {
      if (this.isRecording) {
        this.micURL =
          "https://img.icons8.com/ios-filled/24/000000/microphone--v1.png";
        sr.stop();
        this.isActive = false;
      } else {
        this.isCurrent = null;
        this.recordingWord = "";
        this.isActive = true;
        this.micURL =
          "https://img.icons8.com/ios-filled/24/000000/no-microphone--v1.png";
        sr.start();
      }
    },
  },

  watch: {
    currentLanguage(lang) {
      sr.lang = lang;
    },
  },
};
</script>

<style scoped lang="scss">
.recording {
  width: 90%;
  background-color: $background-accent;
  height: 90px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__microphone {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    margin-right: 10px;
  }
  &__word {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $font-size-card;
    text-transform: uppercase;
  }
  @media (max-width: 795px) {
    height: 60px;
  }
  @media (max-width: 910px) {
    height: 75px;
  }
}
.current {
  animation: resultWord 2s ease;
  background-color: #d0ffb0;
}
.incurrent {
  animation: resultWord 2s ease;
  background-color: #ff8080;
}

.active {
  position: relative;
  width: 50px;
  height: 50px;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(#fff, 0.5);
    z-index: -1;
    border-radius: 50%;
    animation: microphone-fade 1s ease infinite;
  }
}

@keyframes resultWord {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes microphone-fade {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}
</style>