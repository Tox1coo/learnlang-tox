<template>
  <div class="home">
    <div class="home__inner">
      <div class="home__inner-left home__left">
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
export default {
  name: "Home",
  data() {
    return {
      word: "",
      wordArr: [],
      show: false,
      showGroup: false,
    };
  },
  computed: {
    ...mapState({
      errorLang: (state) => state.lang.errorLang,
      userInfo: (state) => state.user.userInfo,
      currentGroup: (state) => state.lang.currentGroup,
      groupList: (state) => state.lang.groupList,
    }),
  },
  mounted() {
    this.checkGroupList(this.userInfo.uid);
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
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          if (
            !this.wordArr.includes(this.word) &&
            this.word != "" &&
            !this.errorLang &&
            this.currentGroup != "" &&
            !this.groupList[this.currentGroup].includes(this.word)
          ) {
            this.wordArr.push(this.word);
            this.word = "";
          } else {
            console.log("error");
          }
        }, 300);
      }
    },
    removeGroup(group) {
      this.deleteGroupInList({ groupName: group, userID: this.userInfo.uid });
    },
    selectGroup(group) {
      this.updateCurrentGroup(group);
      console.log(group);
    },

    removeWord(word) {
      const index = this.wordArr.indexOf(word);
      this.wordArr.splice(index, 1);
    },
  },
  components: { AddGroupLang, SelectGroupLang },
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
  }
  &__left {
    display: flex;
    gap: 15px;
    align-items: center;
  }
}
</style>
