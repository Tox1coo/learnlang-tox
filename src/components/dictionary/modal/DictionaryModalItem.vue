<template>
  <div class="modal__item">
    <h1 class="title">
      {{ textItem }}
    </h1>
    <div class="modal__item-word">
      <p>
        {{ modalItemLang.def[0].text }}
      </p>
    </div>

    <div class="modal__item-example">
      <div v-for="speechItem in partOfSpeech" :key="speechItem.title">
        <h3 class="subtitle">
          {{
            modalItemLang.def[
              modalItemLang.def.findIndex(
                (item) => item.pos === speechItem.type
              )
            ]?.pos
          }}
        </h3>
        <p>
          {{
            modalItemLang.def[
              modalItemLang.def.findIndex(
                (item) => item.pos === speechItem.type
              )
            ]?.text
          }}
        </p>
        <div
          v-for="speechTranslate in modalItemLang.def[
            modalItemLang.def.findIndex((item) => item.pos === speechItem.type)
          ]?.tr"
          :key="speechTranslate.text"
        >
          {{ speechTranslate.text }}
          <span
            style="margin-right: 15px"
            v-for="speechExample in speechTranslate.ex"
            :key="speechExample.text"
            >{{ speechExample.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partOfSpeech: [
        {
          title: "Noun",
          type: "noun",
        },
        {
          title: "Verb",
          type: "verb",
        },
        {
          title: "Adjective",
          type: "adjective",
        },
        {
          title: "Adverb",
          type: "adverb",
        },
        {
          title: "Participle",
          type: "participle",
        },
      ],
    };
  },
  props: {
    modalItemLang: {
      type: Object,
    },
    textItem: {
      type: String,
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.modal__item {
  margin: auto 0;
  height: 600px;

  .title {
    text-align: start;
    margin-bottom: 15px;
    color: #fff;
  }
  &-word {
    width: 600px;
    height: 60px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    p {
      font-size: 2rem;
      text-align: start;
      display: flex;
      align-items: center;
      height: 100%;
      text-indent: 20px;
      color: #000;
    }
  }
  &-example {
    background-color: #fff;
    border-radius: 5px;
    height: 400px;
  }
}
</style>