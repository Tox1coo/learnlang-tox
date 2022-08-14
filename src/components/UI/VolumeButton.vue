<template>
  <div class="volume">
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
    };
  },
  mounted() {
    this.getVoices().then((voices) => {
      this.voices = voices;
    });
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
  },
};
</script>

<style scoped lang="scss">
</style>