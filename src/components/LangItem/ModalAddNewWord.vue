<template>
  <div class="words">
    <form @submit.prevent="addWordToLearn" class="words__form" action="">
      <MyInput v-model="word" :clear="true" :error="errorLang" :placeholderInput="'Write words and press Enter'">
      </MyInput>
    </form>
    <DropLang @removeWord="removeWord" v-if="wordArr.length > 0" v-model:dropList="wordArr" :dropLang="activeLang"
      :group="group">
    </DropLang>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      word: '',
      wordArr: []
    };

  },
  computed: {
    ...mapGetters({
      allGroupList: "lang/allGroupList",
    }),
    ...mapState({
      errorLang: (state) => state.lang.errorLang,
      userInfo: (state) => state.user.userInfo,
      currentGroup: (state) => state.lang.currentGroup,
      groupList: (state) => state.lang.groupList,
      wordInGroup: (state) => state.lang.wordInGroup,
      commLearnLang: (state) => state.lang.commLearnLang,
      currentWord: (state) => state.lang.currentWord,
    }),
    getDate() {
      let day, month, year;
      if (new Date().getDate().toString().length > 1) {
        day = new Date().getDate();
      } else {
        day = "0" + (new Date().getDate() + 1);
      }
      if (new Date().getUTCMonth().toString().length > 1) {
        month = new Date().getUTCMonth() + 1;
      } else {
        month = "0" + (new Date().getUTCMonth() + 1);
      }
      year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    ...mapMutations({
      updateCurrentGroup: "lang/updateCurrentGroup",
      updateWord: "lang/updateWord",
      updateNativeLangForDictionary: "dictionary/updateNativeLangForDictionary",
      updateLearningLangForDictionary:
        "dictionary/updateLearningLangForDictionary",
      updateErrorLang: 'lang/updateErrorLang'
    }),
    ...mapActions({
      checkWordInDictionary: "lang/checkWordInDictionary",
      checkGroupList: "lang/checkGroupList",
      deleteGroupInList: "lang/deleteGroupInList",
      listenerGroupList: "lang/listenerGroupList",
      setProgressWord: "dictionary/setProgressWord",
    }),
    async addWordToLearn() {
      try {
        const config = {
          word: this.word,
          date: this.getDate,
          group: this.group,
        };
        this.checkWordInDictionary(config);
      } catch (error) {
        console.log(error);
      } finally {
        this.updateWord("");

        const index = this.groupList[this.group]?.findIndex(
          (element) => {
            if (element != "" && element != undefined) {
              return element[this.activeLang]?.def[0].text === this.word;
            }
          }
        );

        const resultWordArr = this.wordArr?.findIndex(
          (word) => word[this.activeLang]?.def[0]?.text === this.word
        );
        const interval = setInterval(() => {
          if (
            resultWordArr === -1 &&
            this.word.trim() != "" &&
            !this.errorLang &&
            this.group != "" &&
            index === -1 &&
            this.wordInGroup
          ) {
            this.wordArr.push(this.wordInGroup);
            this.word = "";
            clearInterval(interval);
          } else {
            this.updateErrorLang(true);
            setTimeout(() => {
              this.updateErrorLang(false);

            }, 300);
            clearInterval(interval);
          }
        }, 200);
      }
    },
    removeWord(word) {
      const index = this.wordArr.indexOf(word);
      this.wordArr.splice(index, 1);
    },
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    group: {
      type: String,
      default: ""
    },
    activeLang: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss">
.words {
  &__form {
    margin-bottom: 1.5rem;

    input {
      outline: none;
    }
  }
}
</style>