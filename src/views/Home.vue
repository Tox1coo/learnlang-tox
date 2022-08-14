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
                :width="300"
                :error="errorLang"
                :placeholderInput="'Write words and press Enter'"
              ></MyInput>
              <DropLang
                @removeWord="removeWord"
                v-if="wordArr.length > 0"
                v-model:dropList="wordArr"
              ></DropLang>
            </form>
          </div>
          <div class="home__left-addgroup">
            <MyButtonAuth
              style="width: 160px; font-size: 1rem; margin-right: 5px"
              @click="showGroup = true"
            >
              select group
            </MyButtonAuth>

            <MyButtonAuth
              @click="show = true"
              style="width: 150px; font-size: 1rem"
              >Add Group</MyButtonAuth
            >
          </div>
        </div>
        <div class="home__left-cards">
          <CardList
            v-if="this.currentGroup != ''"
            :language="activeLang"
            :cards="groupList[currentGroup]"
            @cardAccepted="handleCardAccepted"
            @cardRejected="handleCardRejected"
            @hideCard="removeCardFromDeck"
          ></CardList>

          <div class="home__left-btns">
            <MyButtonAuth
              @click="activeLang = commLearnLang?.substr(0, 2)"
              style="width: 150px"
              >{{ commLearnLang }}</MyButtonAuth
            >
            <MyButtonAuth
              @click="activeLang = commLearnLang?.substr(3, 5)"
              style="width: 150px"
              >{{ commLearnLang?.substr(3, 5) }}-{{
                commLearnLang?.substr(0, 2)
              }}</MyButtonAuth
            >
          </div>
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
    }),
    ...mapActions({
      checkWordInDictionary: "lang/checkWordInDictionary",
      checkGroupList: "lang/checkGroupList",
      deleteGroupInList: "lang/deleteGroupInList",
    }),
    async addWordToLearn() {
      try {
        this.checkWordInDictionary(this.word);

        console.log(this.wordArr);
      } catch (error) {
        console.log(error);
      } finally {
        const index = this.groupList[this.currentGroup]?.findIndex(
          (element) => {
            if (element != "" && element != undefined) {
              console.log(element);
              return element.en.def[0].text === this.word;
            }
          }
        );
        setTimeout(() => {
          if (
            !this.wordArr.includes(this.word) &&
            this.word != "" &&
            !this.errorLang &&
            this.currentGroup != "" &&
            index === -1
          ) {
            this.wordArr.push(this.wordInGroup);
            this.word = "";
          } else {
            console.log("error");
          }
        }, 300);
      }
    },
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
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
  components: { AddGroupLang, SelectGroupLang, CardList, SynonymsCard },
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
    height: 100%;
    padding: 5px;
    &-form {
      position: relative;
      width: 300px;
    }
    &-right {
      width: 50%;
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
    }
    &-addgroup {
      display: flex;
      flex: 1 1 auto;
      gap: 5px;
      align-items: flex-start;
    }
    &-cards {
      margin-left: 150px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
}
</style>
