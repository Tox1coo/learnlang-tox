<template>
  <div class="block">
    <div class="block__inner">
      <div class="block__inner-left block__left">
        <div class="block__left-top">

          <div class="block__left-addgroup">
            <MyButtonAuth @click="showGroup = true" class="btn--selectgroup">
              select group
            </MyButtonAuth>

            <MyButtonAuth class="btn--addgroup" @click="show = true">Add Group</MyButtonAuth>
          </div>
        </div>
        <div v-if="this.currentGroup !== ''" class="block__left-cards">
          <CardList v-if="groupListCard[currentGroup]?.length > 1" :language="activeLang"
            :cards="groupListCard[currentGroup]" @cardAccepted="handleCardAccepted" @cardRejected="handleCardRejected"
            @hideCard="removeCardFromDeck"></CardList>
          <div v-else class="block__left-empty block__left-empty--word">
            <div class="title">Please add more word</div>
          </div>
          <div class="block__left-btns">
            <MyButtonAuth @click="activeLang = commLearnLang?.substr(0, 2)" class="btn--lang">{{ commLearnLang }}
            </MyButtonAuth>
            <MyButtonAuth @click="activeLang = commLearnLang?.substr(3, 5)" class="btn--lang">{{
              commLearnLang?.substr(3, 5)
            }}-{{
  commLearnLang?.substr(0, 2)
}}</MyButtonAuth>
          </div>
          <RecordingBlock v-if="isShowRecorder" v-model:isShowing="isShowRecorder" :currentLanguage="activeLang">
          </RecordingBlock>
        </div>
        <div v-else class="block__left-empty">
          <div class="title">Please select/add group</div>
        </div>
      </div>
      <div class="block__inner-right">
        <SynonymsCard v-if="currentWord != null" :synonymWords="currentWord.def"></SynonymsCard>
      </div>
    </div>
  </div>
  <Modal v-model:show="show">
    <AddGroupLang></AddGroupLang>
  </Modal>
  <Modal v-model:show="showGroup">
    <SelectGroupLang @addWord="addWordsToGroup" @selectGroup="selectGroup" @removeGroup="removeGroup"
      v-model:show="showGroup"></SelectGroupLang>
  </Modal>
  <Modal v-model:show="showGroupAddingWord">
    <ModalAddNewWord v-model:show="showGroupAddingWord" :group="groupAddingWord" :activeLang="activeLang">
    </ModalAddNewWord>
  </Modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import AddGroupLang from "@/components/LangItem/AddGroupLang.vue";
import SelectGroupLang from "@/components/LangItem/SelectGroupLang.vue";
import CardList from "@/components/Cards/CardList.vue";
import SynonymsCard from "@/components/SynonymsCard/SynonymsCard.vue";
import RecordingBlock from "@/components/Recording/RecordingBlock.vue";
import ModalAddNewWord from "@/components/LangItem/ModalAddNewWord.vue";
export default {
  name: "Home",
  data() {
    return {
      word: "",
      wordArr: [],
      show: false,
      showGroup: false,
      visibleCards: ["Test", "Vue.js", "Webpack"],
      activeLang: "",
      isShowRecorder: true,
      groupListCard: {},
      showGroupAddingWord: false,
      groupAddingWord: ''
    };
  },
  computed: {
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
  mounted() {
    this.checkGroupList(this.userInfo.uid).then((result) => {
      this.groupListCard = result || [];
      this.groupListCard[this.currentGroup] = this.groupListCard[
        this.currentGroup
      ].sort(() => Math.random() - 0.5);
    });

    this.activeLang = this.commLearnLang.match(/\w+\b/)[0];
    this.updateNativeLangForDictionary(this.commLearnLang.match(/\w+\b/)[0]);
    this.updateLearningLangForDictionary(
      this.commLearnLang.match(/-\b\w+/)[0].slice(1)
    );
    this.listenerGroupList(this.userInfo.uid);
  },
  beforeUnmount() {
    this.groupListCard = {};
    this.activeLang = "";
  },
  methods: {
    ...mapMutations({
      updateCurrentGroup: "lang/updateCurrentGroup",
      updateWord: "lang/updateWord",
      updateNativeLangForDictionary: "dictionary/updateNativeLangForDictionary",
      updateLearningLangForDictionary:
        "dictionary/updateLearningLangForDictionary",
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
          group: this.currentGroup,
        };
        this.checkWordInDictionary(config);
      } catch (error) {
        console.log(error);
      } finally {
        this.updateWord("");

        const index = this.groupList[this.currentGroup]?.findIndex(
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
            this.word != "" &&
            this.word.length > 1 &&
            !this.errorLang &&
            this.currentGroup != "" &&
            index === -1 &&
            this.wordInGroup
          ) {
            this.wordArr.push(this.wordInGroup);
            this.word = "";
            clearInterval(interval);
          }
        }, 200);
      }
    },

    removeCardFromDeck(card) {
      const deleteElementIndex = this.groupListCard[
        this.currentGroup
      ].findIndex((myCard) => myCard[this.activeLang] === card);
      const deleteElement = this.groupListCard[this.currentGroup].splice(
        deleteElementIndex,
        1
      );

      this.groupListCard[this.currentGroup].push(deleteElement[0]);
    },
    removeGroup(group) {
      let confirm = window.confirm(
        `Are you sure you want to delete the "${group}" group?`
      );
      if (confirm)
        this.deleteGroupInList({ groupName: group, userID: this.userInfo.uid });
    },
    selectGroup(group) {
      this.updateCurrentGroup(group);
      this.groupListCard[group] = this.groupListCard[group].sort(
        () => Math.random() - 0.5
      );
    },


    handleCardAccepted(cardItem) {
      this.setProgressWord({ dictionaryItem: cardItem, status: true });
    },
    handleCardRejected(cardItem) {
      this.setProgressWord({ dictionaryItem: cardItem, status: false });
    },
    addWordsToGroup(group) {
      this.groupAddingWord = group;
      this.showGroupAddingWord = true
    }
  },
  components: {
    AddGroupLang,
    SelectGroupLang,
    CardList,
    SynonymsCard,
    RecordingBlock,
    ModalAddNewWord
  },
};
</script>

<style lang="scss" scoped>
.block {
  &__inner {
    &-form {
      position: relative;
      width: 300px;
    }

    &-right {
      width: 50%;

      @media (max-width: 700px) {
        width: 100%;
      }
    }
  }

  &__left-empty {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;

    @media (max-width: 700px) {
      height: 100vh;
    }

    &--word {
      height: 50vh;
    }
  }

  &__left {
    width: 50%;
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: flex-start;

    &-top {
      width: 100%;
      display: flex;
      gap: 15px;
      align-items: center;

      @media (max-width: 800px) {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }

    &-addgroup {
      display: flex;
      flex: 1 1 auto;
      gap: 5px;
      align-items: flex-start;
      justify-content: center;

    }

    &-cards {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 100%;
      justify-content: center;
      align-items: center;

      @media (max-width: 1px) {
        gap: 15px;
      }
    }

    @media (max-width: 700px) {
      width: 100%;
    }
  }
}
</style>
