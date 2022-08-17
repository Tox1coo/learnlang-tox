<template>
  <div class="home">
    <div class="home__inner">
      <div class="home__inner-left home__left">
        <div class="home__left-top">
          <div class="home__left-input">
            <form
              @submit.prevent="addWordToLearn"
              class="home__inner-form"
              action=""
            >
              <MyInput
                v-model="word"
                :clear="true"
                :error="errorLang"
                :placeholderInput="'Write words and press Enter'"
              ></MyInput>
              <DropLang
                @removeWord="removeWord"
                v-if="wordArr.length > 0"
                v-model:dropList="wordArr"
                :dropLang="activeLang"
              ></DropLang>
            </form>
          </div>
          <div class="home__left-addgroup">
            <MyButtonAuth @click="showGroup = true" class="btn--selectgroup">
              select group
            </MyButtonAuth>

            <MyButtonAuth class="btn--addgroup" @click="show = true"
              >Add Group</MyButtonAuth
            >
          </div>
        </div>
        <div v-if="this.currentGroup !== ''" class="home__left-cards">
          <CardList
            v-if="groupList[currentGroup]?.length > 1"
            :language="activeLang"
            :cards="groupList[currentGroup]"
            @cardAccepted="handleCardAccepted"
            @cardRejected="handleCardRejected"
            @hideCard="removeCardFromDeck"
          ></CardList>
          <div v-else class="home__left-empty home__left-empty--word">
            <div class="title">Please add more word</div>
          </div>
          <div class="home__left-btns">
            <MyButtonAuth
              @click="activeLang = commLearnLang?.substr(0, 2)"
              class="btn--lang"
              >{{ commLearnLang }}</MyButtonAuth
            >
            <MyButtonAuth
              @click="activeLang = commLearnLang?.substr(3, 5)"
              class="btn--lang"
              >{{ commLearnLang?.substr(3, 5) }}-{{
                commLearnLang?.substr(0, 2)
              }}</MyButtonAuth
            >
          </div>
          <RecordingBlock
            v-if="isShowRecorder"
            v-model:isShowing="isShowRecorder"
            :currentLanguage="activeLang"
          ></RecordingBlock>
        </div>
        <div v-else class="home__left-empty">
          <div class="title">Please select/create group</div>
        </div>
      </div>
      <div class="home__inner-right">
        <SynonymsCard
          v-if="currentWord != null"
          :synonymWords="currentWord.def"
        ></SynonymsCard>
      </div>
    </div>
  </div>
  <Modal v-model:show="show"><AddGroupLang></AddGroupLang></Modal>
  <Modal v-model:show="showGroup"
    ><SelectGroupLang
      @selectGroup="selectGroup"
      @removeGroup="removeGroup"
      v-model:show="showGroup"
    ></SelectGroupLang
  ></Modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import AddGroupLang from "@/components/LangItem/AddGroupLang.vue";
import SelectGroupLang from "@/components/LangItem/SelectGroupLang.vue";
import CardList from "@/components/Cards/CardList.vue";
import SynonymsCard from "@/components/SynonymsCard/SynonymsCard.vue";
import RecordingBlock from "@/components/Recording/RecordingBlock.vue";
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
  },
  mounted() {
    this.checkGroupList(this.userInfo.uid);
    this.activeLang = this.commLearnLang?.substr(0, 2);
  },
  methods: {
    ...mapMutations({
      updateCurrentGroup: "lang/updateCurrentGroup",
      updateWord: "lang/updateWord",
    }),
    ...mapActions({
      checkWordInDictionary: "lang/checkWordInDictionary",
      checkGroupList: "lang/checkGroupList",
      deleteGroupInList: "lang/deleteGroupInList",
    }),
    async addWordToLearn() {
      try {
        this.checkWordInDictionary(this.word);
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
        setTimeout(() => {
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
        }, 500);
      }
    },

    removeCardFromDeck(card) {
      const deleteElementIndex = this.groupList[this.currentGroup].findIndex(
        (myCard) => myCard[this.activeLang] === card
      );
      const deleteElement = this.groupList[this.currentGroup].splice(
        deleteElementIndex,
        1
      );

      this.groupList[this.currentGroup].push(deleteElement[0]);
    },
    removeGroup(group) {
      let confirm = window.confirm(
        `Are you sure you want to delete the "${this.currentGroup}" group?`
      );
      if (confirm)
        this.deleteGroupInList({ groupName: group, userID: this.userInfo.uid });
    },
    selectGroup(group) {
      this.updateCurrentGroup(group);
    },

    removeWord(word) {
      const index = this.wordArr.indexOf(word);
      this.wordArr.splice(index, 1);
    },
  },
  components: {
    AddGroupLang,
    SelectGroupLang,
    CardList,
    SynonymsCard,
    RecordingBlock,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: $widthwithnav;
  margin-left: calc($marginwithnav);
  position: relative;
  height: 100%;
  padding: 25px;
  &__inner {
    display: flex;
    background: transparent;
    border-radius: 10px;
    border: 1px solid #999;
    backdrop-filter: blur(5px);
    min-height: 100%;
    max-height: fit-content;
    padding: 5px;
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
    @media (max-width: 900px) and (max-height: 1024px) {
      min-height: 100%;
      padding-bottom: $heightnavmob;
      max-height: fit-content;
    }
    @media (max-width: 700px) {
      flex-direction: column;
      height: fit-content;
      justify-content: center;
      margin-bottom: $heightnavmob;
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
      @media (max-width: 800px) {
        align-items: center;
        justify-content: center;
      }
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
  @media (max-width: 795px) {
    width: 100%;
    margin-left: 0;
    height: calc(100% - $heightnavmob);
  }
}
</style>
