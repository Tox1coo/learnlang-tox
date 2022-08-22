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
      <tr
        v-for="(tableInfoItem, index) in sortedDictionaryList"
        :key="`${index}-${tableInfoItem.progress}-${tableInfoItem[getOriginalLang].def[0].text}`"
      >
        <td class="dictionary__table-column">
          {{ tableInfoItem[getOriginalLang].def[0].text }}
        </td>
        <td class="dictionary__table-column">
          {{ tableInfoItem[getLearningLang].def[0].text }}
        </td>
        <td class="dictionary__table-column">
          {{ tableInfoItem.group }}
        </td>
        <td class="dictionary__table-column">
          {{ tableInfoItem.date }}
        </td>
        <td class="dictionary__table-column">
          <div class="progress active-progress">
            <svg width="60" height="60">
              <circle
                fill="transparent"
                stroke-width="4"
                stroke="#ccc"
                cx="30"
                cy="30"
                r="22"
              ></circle>
              <circle
                ref="circle"
                fill="transparent"
                stroke-width="4"
                stroke="#ccc"
                cx="30"
                cy="30"
                r="22"
              ></circle>
            </svg>
            <div class="progress__number">
              {{ tableInfoItem.progress }}%
              {{ updateProgress(index, tableInfoItem.progress) }}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
  emits: ["sortedDictionary"],
  computed: {
    ...mapState({
      commLearnLang: (state) => state.lang.commLearnLang,
      dictionaryList: (state) => state.dictionary.dictionaryList,
    }),
    ...mapGetters({
      sortedDictionaryList: "dictionary/sortedDictionaryList",
    }),
    getOriginalLang() {
      return this.commLearnLang.substr(0, 2);
    },
    getLearningLang() {
      return this.commLearnLang.substr(3, 4);
    },
  },
  methods: {
    updateProgress(index, percent) {
      // написать тест на проверку
      setTimeout(() => {
        const radius = this.$refs.circle[index].r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        this.$refs.circle[
          index
        ].style.cssText = `stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${circumference} `;

        function setProgress() {
          const offset = circumference - (percent / 100) * circumference;
          return offset;
        }
        let strokeColor;
        const offset = setProgress();

        if (offset >= 0 && offset < 42) {
          strokeColor = "green"; // от 100% до 70%
        } else if (offset >= 42 && offset < 70) {
          strokeColor = "lightgreen"; // от 70% до 50%
        } else if (offset >= 69 && offset < 104) {
          strokeColor = "#ff9"; // От 50% д0 25%
        } else if (offset >= 105 && offset < 139) {
          strokeColor = "#ff1345"; // от 25% до 0%
        }
        this.$refs.circle[
          index
        ].style.cssText = `stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${offset}; stroke: ${strokeColor}`;
      }, 300);
      // проверить на правильную работу
    },
  },
};
</script>

<style scoped lang="scss">
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
    }
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