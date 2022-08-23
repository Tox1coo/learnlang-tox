<template>
  <table class="dictionary__table">
    <thead>
      <tr>
        <td
          class="dictionary__table-column"
          v-for="tableItem in tableList"
          :key="tableItem"
          @click="$emit('sortedDictionary', tableItem)"
        >
          {{ tableItem.title }}
          <div class="sort">
            <div
              :class="{
                'active-top': tableItem.direction === 'top',
                'active-down': tableItem.direction === 'down',
              }"
              class="sort__item"
            ></div>
          </div>
        </td>
      </tr>
    </thead>
    <tbody>
      <DictionaryTableRow
        v-for="(tableInfoItem, index) in searchAndSorted"
        :key="`${index}-${tableInfoItem.progress}-${tableInfoItem[getOriginalLang].def[0].text}`"
        :tableItem="tableInfoItem"
        :originalLang="getOriginalLang"
        :learningLang="getLearningLang"
        @click="
          $emit(
            'showInfoItem',
            {
              item: tableInfoItem,
              nativeLang: getOriginalLang,
              learningLang: getLearningLang,
            },
            true
          )
        "
      ></DictionaryTableRow>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DictionaryTableRow from "@/components/dictionary/DictionaryTableRow.vue";
export default {
  props: {
    tableList: {
      type: Array,
      required: true,
      default: () => [],
    },
    tableInfoList: {
      type: Object,
      required: true,
      default: () => {},
    },
    nameGroup: {
      type: String,
      required: true,
      default: () => "All groups",
    },
  },
  emits: ["sortedDictionary", "showInfoItem"],
  computed: {
    ...mapState({
      commLearnLang: (state) => state.lang.commLearnLang,
      dictionaryList: (state) => state.dictionary.dictionaryList,
    }),
    ...mapGetters({
      sortedDictionaryList: "dictionary/sortedDictionaryList",
      searchAndSorted: "dictionary/searchAndSorted",
    }),
    getOriginalLang() {
      return this.commLearnLang.match(/\w+\b/)[0];
    },
    getLearningLang() {
      return this.commLearnLang.match(/-\b\w+/)[0].slice(1);
    },
  },

  components: { DictionaryTableRow },
};
</script>

<style  lang="scss">
%center-absolute {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
%pseudo-block {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  border-width: 3px 3px 0 3px;
  border-color: #9f9f9f transparent transparent transparent;
  border-style: solid;
  top: 70%;
  transform: translateY(-50%);
  right: 0px;
  transform-origin: center;
  pointer-events: none;
  transition: all 0.2s ease 0s;
}
.dictionary__table {
  width: 100%;
  border: 1px solid #000;
  padding: 0;
  margin: 0;
  border-spacing: 0px;
  font-size: 1.5rem;
  margin-top: 15px;
  border-radius: 5px;
  thead {
    .dictionary__table-column {
      cursor: pointer;
    }
  }

  &-column {
    padding: 15px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    position: relative;
    &:first-child {
      border-left: none;
    }
    .sort {
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      width: 10px;
      height: 20px;
      &__item {
        height: 100%;
        position: relative;
        &::after {
          @extend %pseudo-block;
        }

        &::before {
          @extend %pseudo-block;
          top: 30%;

          transform: rotate(-180deg);
        }
      }
      @media (max-width: 835px) {
        right: 5px;
      }
    }
  }
  @media (max-width: 625px) {
    width: fit-content;
    font-size: 1.2rem;
  }
}
.active-top {
  &::before {
    border-color: #000 transparent transparent transparent !important;
  }
}
.active-down {
  &::after {
    border-color: #000 transparent transparent transparent !important;
  }
}
/* .progress {
  width: 65px;
  width: 65px;
  position: relative;
  svg {
    width: 65px;
    height: 65px;
    position: relative;

    circle {
      width: 100%;
      height: 100%;
      stroke: #191919;
      fill: none;
      stroke-width: 5px;
      stroke-linecap: round;
      &:nth-child(2) {
        stroke-dasharray: 150;
        stroke-dashoffset: 150;
      }
    }
  }
  &__number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
} */
.progress {
  width: 60px;
  height: 60px;
  position: relative;
  svg {
    circle {
      transform-origin: center;
      transform: rotate(-90deg);
      transition: stroke-dashoffset 0.4s ease 0s;
    }
  }
  &__number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>