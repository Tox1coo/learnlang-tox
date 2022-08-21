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
          :tableInfoList="groupList"
          :tableList="infoTableList"
          :nameGroup="activeTableGroup"
        ></DictionaryTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DictionaryTable from "@/components/dictionary/DictionaryTable.vue";
export default {
  data() {
    return {
      wordInDictionary: "",
      infoTableList: [
        "Original",
        "Translation",
        "Name group",
        "Date",
        "Progress",
      ],
      activeTableGroup: "All groups",
    };
  },
  computed: {
    ...mapGetters({
      allGroupList: "lang/allGroupList",
    }),
    ...mapState({
      groupList: (state) => state.lang.groupList,
    }),
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