<template>
  <div class="modal__item">
    <h1 class="title">
      {{ textItem }}
    </h1>
    <div class="modal__item-word">
      {{ getWord }}
    </div>

    <div class="modal__item-example">
      <div v-for="speechItem in partOfSpeech" :key="speechItem.title">
        <h3
          v-if="
            modalItemLang.def[
              modalItemLang.def.findIndex(
                (item) => item.pos === speechItem.type
              )
            ]?.pos === speechItem.type
          "
          class="subtitle"
        >
          {{ speechItem.title }}
        </h3>
        <div
          v-if="
            modalItemLang.def[
              modalItemLang.def.findIndex(
                (item) => item.pos === speechItem.type
              )
            ]?.pos === speechItem.type
          "
          class="example"
        >
          <p>
            {{
              modalItemLang.def[
                modalItemLang.def.findIndex(
                  (item) => item.pos === speechItem.type
                )
              ]?.text
            }}
          </p>
          <div class="example__translate">
            <span
              v-for="speechTranslate in modalItemLang.def[
                modalItemLang.def.findIndex(
                  (item) => item.pos === speechItem.type
                )
              ]?.tr"
              :key="speechTranslate.text"
            >
              {{ speechTranslate.text }}<span>,&ensp;</span>
            </span>
          </div>
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
        {
          title: "Pronoun",
          type: "pronoun",
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
  computed: {
    getWord() {
      if (!this.modalItemLang.def[0].text) {
        return "";
      }
      return (
        this.modalItemLang.def[0].text[0].toUpperCase() +
        this.modalItemLang.def[0].text.slice(1)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.modal__item {
  margin: auto 0;
  max-height: 550px;
  width: 550px;
  font-size: 1rem;
  margin-bottom: 15px;
  .title {
    text-align: start;
    margin-bottom: 15px;
    color: #fff;
    @media (max-width: 560px) {
      font-size: 2.5em;
    }
  }
  &-word {
    height: 60px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 2em;
    text-indent: 15px;
    color: #000;
    align-items: center;
    display: flex;
    @media (max-width: 560px) {
      font-size: 1.7em;
    }
  }
  &-example {
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px;
    height: 400px;
    padding: 15px;
    .subtitle {
      text-align: start;
      font-size: 2.5em;
      margin-bottom: 10px;
      @media (max-width: 560px) {
        font-size: 1.7em;
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
      background-color: #ccc;
      border-radius: 10px;
      &-thumb {
        background-color: #999;
      }
    }
  }
  @media (max-width: 1125px) {
    width: 450px;
  }
  @media (max-width: 930px) {
    width: 300px;
    .example {
      p {
        min-width: 120px;
      }
    }
  }
  @media (max-width: 630px) {
    width: 250px;
  }
  @media (max-width: 535px) {
    width: 100%;
  }
  @media (max-width: 735px) {
    .example {
      p {
        min-width: 70px;
      }
    }
  }
  @media (min-width: 370px) and (max-width: 470px) {
    min-width: 170px;
  }
  @media (max-width: 535px) {
    min-width: 180px;
  }
  @media (max-width: 400px) {
    min-width: 150px;
    max-width: 150px;
  }
}

.example {
  display: flex;
  font-size: 1.6rem;
  text-align: start;
  margin-bottom: 10px;
  p {
    min-width: 200px;
  }

  &__translate {
    color: #919292;
    span {
      &:last-child {
        span {
          display: none;
        }
      }
    }
  }
  @media (max-width: 470px) {
    flex-direction: column;
    p {
      margin-bottom: 7px;
    }
  }
}
</style>