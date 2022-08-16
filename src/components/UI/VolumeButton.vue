<template>
  <div v-if="voice != null" @click="speak()" class="volume">
    <img :src="require('@/assets/volume.png')" alt="" />
  </div>
</template>

<script>
export default {
  name: "VolumeButton",
  data() {
    return {
      speech: window.speechSynthesis,
      voices: [],
      voice: null,
    };
  },
  props: {
    voiceLanguage: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getVoices().then((voices) => {
      this.voices = voices;
      this.voice =
        voices.filter((voice) => voice.lang.includes(this.voiceLanguage))[0] ||
        null;
    });
  },
  watch: {
    voiceLanguage(lang) {
      this.voice =
        this.voices.filter((voice) => voice.lang.includes(lang))[0] || null;
    },
  },
  methods: {
    getVoices() {
      let intervalID;
      return new Promise((resolve) => {
        intervalID = setInterval(() => {
          if (this.speech.getVoices().length > 0) {
            resolve(this.speech.getVoices());
            clearInterval(intervalID);
          }
        });
      });
    },
    speak() {
      if (this.speech.speaking) {
        console.error("speechSynthesis.speaking");
        return;
      }

      if (this.word != "") {
        const utterThis = new SpeechSynthesisUtterance(this.word);

        utterThis.voice = this.voice;
        utterThis.pitch = 1;
        utterThis.rate = 1;
        this.speech.speak(utterThis);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.volume {
  cursor: pointer;
}
</style>