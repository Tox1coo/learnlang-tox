<template>
  <tr class="dictionary__table-row">
    <td class="dictionary__table-column">
      {{ tableItem[originalLang].def[0].text }}
    </td>
    <td class="dictionary__table-column">
      {{ tableItem[learningLang].def[0].text }}
    </td>
    <td class="dictionary__table-column">
      {{ tableItem.group }}
    </td>
    <td class="dictionary__table-column">
      {{ tableItem.date }}
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
          {{ tableItem.progress }}%
          <!-- {{ updateProgress(index, tableInfoItem.progress) }} -->
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    tableItem: {
      type: Object,
    },

    originalLang: {
      type: String,
      required: true,
    },
    learningLang: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.updateProgress(this.tableItem.progress);
  },
  methods: {
    updateProgress(percent) {
      // написать тест на проверку
      setTimeout(() => {
        const radius = this.$refs.circle?.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        this.$refs.circle.style.cssText = `stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${circumference} `;
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
        this.$refs.circle.style.cssText = `stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${offset}; stroke: ${strokeColor}`;
      }, 50);
    },
  },
};
</script>

<style lang="scss" scoped>
.dictionary__table {
  &-row {
    cursor: pointer;
    transition: background-color 0.1s ease 0s;
    &:hover {
      background-color: rgba(#ccc, 0.3);
    }
  }
}
</style>