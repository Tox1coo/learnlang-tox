<template>
  <div class="selectgroup">
    <h1 v-if="allGroupList.length === 0" class="subtitle">
      Please add new group :)
    </h1>
    <div v-for="(group, key) in groupList" :key="key" :class="{ hide: groupList[key] === '' }">
      <div @click="$emit('selectGroup', key), $emit('update:show', false)" v-if="groupList[key] !== ''" class="item"
        title="Select group">
        {{ key }}
        <div @click.stop="$emit('removeGroup', key)" class="remove">
          <div class="remove__item" title="Delete group"></div>
        </div>
        <div @click.stop="$emit('addWord', key)" class="add">
          <div class="add__item" title="Add word"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      groupList: (state) => state.lang.groupList,
    }),

    ...mapGetters({
      allGroupList: "lang/allGroupList",
    }),
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.selectgroup {
  min-width: 300px;
  max-width: 700px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px;
  font-size: 1.5rem;

  .subtitle {
    font-size: 2.5rem;
  }
}

.item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.4s ease 0s;

  &:hover {
    background-color: rgba(#000, 0.1);
  }
}

.hide {
  display: none;
}

.remove {
  position: absolute;
  width: 16px;
  height: 16px;
  top: -5px;
  right: -10px;
  z-index: 1000;
  cursor: pointer;

  &__item {
    position: relative;
    width: 16px;
    height: 16px;
    background-color: transparent;
    backdrop-filter: blur(5px);
    border: 1px solid #ccc;
    border-radius: 50%;
    transition: all 0.4s ease 0s;

    &:hover {
      background-color: rgba(#000, 0.1);
    }

    &:after {
      content: "";
      display: block;
      width: 2px;
      height: 9px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: $error;
      position: absolute;
    }

    &:before {
      content: "";
      display: block;
      width: 2px;
      height: 9px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background-color: $error;
      position: absolute;
    }
  }
}

.add {
  @extend .remove;
  left: -10px;

  &__item {
    @extend .remove__item;

    &::before {
      transform: translate(-50%, -50%);
      background-color: $primary-correct;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
      background-color: $primary-correct;
    }
  }
}
</style>