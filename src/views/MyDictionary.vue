<template>
  <div class="block">
    <div class="block__inner dictionary">
      <div class="dictionary__top">
        <h1 class="title">My dictionary</h1>
        <p class="text">
          In this interactive dictionary to follow the progress of the study and
          learn more detailed information about them
        </p>
      </div>
      <div class="dictionary__filter">
        <MyInput
          :placeholderInput="'Enter a search term'"
          v-model="wordInDictionary"
        ></MyInput>
        <MySelect
          v-model:activeTableGroup="activeTableGroup"
          :selectDrop="allGroupList"
        ></MySelect>
      </div>
      <div class="dictionary__body">
        <DictionaryTable
          @showInfoItem="showInfoItem"
          @sortedDictionary="sortedDictionary"
          :tableInfoList="groupList"
          :tableList="infoTableList"
          :nameGroup="activeTableGroup"
        ></DictionaryTable>
      </div>
    </div>
  </div>
  <DictionaryModal
    :modalItem="activeDictionaryItem.item"
    :nativeLang="activeDictionaryItem.nativeLang"
    :learningLang="activeDictionaryItem.learningLang"
    v-model:show="showDictionaryModal"
  >
  </DictionaryModal>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import DictionaryTable from "@/components/dictionary/DictionaryTable.vue";
import DictionaryModal from "@/components/dictionary/modal/DictionaryModal.vue";
export default {
  data() {
    return {
      wordInDictionary: "",
      showDictionaryModal: false,
      infoTableList: [
        {
          value: "original",
          title: "Original",
          direction: null,
        },
        {
          value: "translate",
          title: "Translation",
          direction: null,
        },
        {
          value: "group",
          title: "Name group",
          direction: null,
        },
        {
          value: "date",
          title: "Date",
          direction: null,
        },
        {
          value: "progress",
          title: "Progress",
          direction: "top",
        },
      ],
      activeTableGroup: "All groups",
      activeDictionaryItem: {
        item: {},
        nativeLang: "",
        learningLang: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      allGroupList: "lang/allGroupList",
    }),
    ...mapState({
      groupList: (state) => state.lang.groupList,
      commLearnLang: (state) => state.lang.commLearnLang,
      importantItem: (state) => state.dictionary.importantItem,
      importantGroup: (state) => state.dictionary.importantGroup,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    setTimeout(() => {
      this.getTableInfoList();
      this.checkGroupList(this.userInfo.uid);
      this.updateNativeLangForDictionary(this.commLearnLang.match(/\w+\b/)[0]);
      this.updateLearningLangForDictionary(
        this.commLearnLang.match(/-\b\w+/)[0].slice(1)
      );
    }, 200);
  },
  methods: {
    ...mapMutations({
      updateDictionaryList: "dictionary/updateDictionaryList",
      updateNativeLangForDictionary: "dictionary/updateNativeLangForDictionary",
      updateLearningLangForDictionary:
        "dictionary/updateLearningLangForDictionary",
      updateSortedType: "dictionary/updateSortedType",
      updateSearchDictionary: "dictionary/updateSearchDictionary",
    }),

    ...mapActions({
      checkGroupList: "lang/checkGroupList",
    }),

    showInfoItem(dictionaryItem, show) {
      this.activeDictionaryItem = dictionaryItem;
      this.showDictionaryModal = show;
    },

    sortedDictionary(value) {
      if (value.direction === null) {
        value.direction = "top";
      } else if (value.direction === "down") {
        value.direction = "top";
      } else {
        value.direction = "down";
      }

      this.infoTableList.forEach((infoItem) => {
        if (infoItem === value) {
          this.updateSortedType(value);
        } else {
          infoItem.direction = null;
        }
      });
    },
    getTableInfoList() {
      let item = [];
      if (this.activeTableGroup === "All groups") {
        for (const key in this.groupList) {
          if (this.groupList[key] !== "") {
            this.groupList[key]?.forEach((element) => {
              if (element) {
                item.push(element);
              }
            });
          }
        }
      }
      if (this.groupList[this.activeTableGroup] !== undefined) {
        if (this.groupList[this.activeTableGroup] !== "") {
          this.groupList[this.activeTableGroup]?.forEach((element) => {
            if (element) {
              item.push(element);
            }
          });
        }
      }
      this.updateDictionaryList(item);
    },
  },

  watch: {
    activeTableGroup() {
      this.getTableInfoList();
    },
    wordInDictionary(search) {
      this.updateSearchDictionary(search);
    },
    importantGroup(group) {
      if (this.activeDictionaryItem.nativeLang != "") {
        const index = group?.findIndex(
          (word) =>
            word[this.activeDictionaryItem.nativeLang]?.def[0].text ===
            this.activeDictionaryItem.item[this.activeDictionaryItem.nativeLang]
              ?.def[0]?.text
        );

        if (index != -1) {
          this.activeDictionaryItem.item = group[index];
        }
      }
      this.getTableInfoList();
    },
    groupList() {
      this.getTableInfoList();
    },
  },
  components: { DictionaryTable, DictionaryModal },
};
</script>

<style lang="scss">
.dictionary {
  display: block !important;
  text-align: left;
  padding: 15px;
  &__top {
    margin-bottom: 15px;
    .title {
      margin-bottom: 15px;
      @media (max-width: 835px) {
        font-size: 3.2rem;
      }
    }
  }

  &__filter {
    display: flex;
    gap: 15px;
    @media (max-width: 340px) {
      input {
        width: 160px;
      }
      gap: 5px;
    }
  }
  &__body {
    overflow-y: hidden;
    &::-webkit-scrollbar {
      height: 10px;
      background-color: #ddd;
      border-radius: 30px;
      &-thumb {
        border-radius: 10px;
        background-color: #ccc;
      }
    }
  }
  @media (max-width: 835px) {
    padding: 5px;
    .text {
      font-size: 1.6rem;
    }
  }
}
</style>