<template>
  <div class="recording">
    <button @click="toggleMic()" class="btn">mic</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
const recognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || "";
console.log(recognition);
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
  },
  data() {
    return {
      isRecording: false,
    };
  },

  mounted() {
    if (recognition) {
      sr.continuous = true;
      sr.interimResults = true;
      sr.onstart = () => {
        console.log("SR Started");
        this.isRecording = true;
      };
      sr.onend = () => {
        console.log("SR Stopped");
        this.isRecording = false;
        sr.onresult = (evt) => {
          const result = evt.results;
          console.log(result);
          if (
            result[0][0].transcript.toLocaleLowerCase() ===
              this.currentWord.def[0].text &&
            result[0].isFinal
          ) {
            console.log(true);
          } else if (result[0].isFinal) {
            console.log(false);
          }
        };
      };
    } else {
      this.$emit("update:isShowing", false);
    }
  },

  methods: {
    toggleMic() {
      if (this.isRecording) {
        sr.stop();
      } else {
        console.log(3);
        sr.start();
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>