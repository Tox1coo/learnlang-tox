<template>
  <table class="dictionary__table">
    <thead>
      <tr>
        <td
          class="dictionary__table-column"
          v-for="tableItem in tableList"
          :key="tableItem"
        >
          {{ tableItem }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(tableInfoItem, index) in getTableInfoList"
        :key="tableInfoItem"
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
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      commLearnLang: (state) => state.lang.commLearnLang,
    }),
    getTableInfoList() {
      let item = [];
      if (this.nameGroup === "All groups") {
        for (const key in this.tableInfoList) {
          if (this.tableInfoList[key] !== "") {
            this.tableInfoList[key]?.forEach((element) => {
              if (element) {
                item.push(element);
              }
            });
          }
        }
      }
      if (this.tableInfoList[this.nameGroup] !== undefined) {
        if (this.tableInfoList[this.nameGroup] !== "") {
          this.tableInfoList[this.nameGroup]?.forEach((element) => {
            if (element) {
              item.push(element);
            }
          });
        }
      }
      return item;
    },

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
          strokeColor = "#ff03df"; // от 100% до 70%
        } else if (offset >= 42 && offset < 70) {
          strokeColor = "#ff9"; // от 70% до 50 %
        } else if (offset >= 69 && offset < 104) {
          strokeColor = "#ff1345"; // От 50% дл 25%
        } else if (offset >= 104 && offset < 139) {
          strokeColor = "green"; // от 25% до 0%
        }
        this.$refs.circle[
          index
        ].style.cssText = `stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${offset}; stroke: ${strokeColor}`;
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
.dictionary__table {
  width: 100%;
  border: 1px solid #000;
  padding: 0;
  margin: 0;
  border-spacing: 0px;
  font-size: 1.5rem;
  margin-top: 15px;
  border-radius: 5px;
  &-column {
    padding: 15px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    margin: auto;
    &:first-child {
      border-left: none;
    }
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