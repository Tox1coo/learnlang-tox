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
          @sortedDictionary="sortedDictionary"
          :tableInfoList="groupList"
          :tableList="infoTableList"
          :nameGroup="activeTableGroup"
        ></DictionaryTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import DictionaryTable from "@/components/dictionary/DictionaryTable.vue";
export default {
  data() {
    return {
      wordInDictionary: "",
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
    };
  },

  computed: {
    ...mapGetters({
      allGroupList: "lang/allGroupList",
      sortedDictionaryList: "dictionary/sortedDictionaryList",
    }),
    ...mapState({
      groupList: (state) => state.lang.groupList,
      commLearnLang: (state) => state.lang.commLearnLang,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.getTableInfoList();

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
    }),
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
  },
  components: { DictionaryTable },
};
</script>

<style scoped lang="scss">
.dictionary {
  display: block;
  text-align: left;
  padding: 15px;
  &__top {
    margin-bottom: 15px;
    .title {
      margin-bottom: 15px;
    }
  }
  &__filter {
    display: flex;
    gap: 15px;
  }
}
</style>