<template>
  <div class="block">
    <div class="block__inner user">
      <div class="user__info">
        <div class="user__info-photo">
          <Profile
            :width="100"
            :height="100"
            :photoURL="userInfo.photoURL"
          ></Profile>
          <!--  <MyInputImage
            :profilePhoto="profilePhoto"
            :photoUser="userInfo.photoURL"
          ></MyInputImage> -->
        </div>
        <div class="user__info-list">
          <h2 style="margin: 0" class="subtitle subtitle--choice">
            Name: {{ userInfo.displayName }}
          </h2>
          <p class="text">Email: {{ userInfo.email }}</p>
          <p class="text">
            Account created by:
            {{ months[new Date(userInfo.metadata.creationTime).getMonth()] }}
            {{ new Date(userInfo.metadata.creationTime).getFullYear() }}
          </p>
          <div>
            <p class="text">Learning lang:</p>
            <img height="20" :src="learnLang.urlPhoto" />
          </div>
        </div>
      </div>
      <div class="user__statistics">
        <StatisticsBlock
          :count="countGroups - 1"
          :text="'Number of groups'"
        ></StatisticsBlock>
        <StatisticsBlock
          :count="countWord"
          :text="'Learned Words'"
        ></StatisticsBlock>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsBlock from "@/components/Profile/StatisticsBlock.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      profilePhoto: {},
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "Jule",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      countWords: 0,
    };
  },
  components: { StatisticsBlock },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      commLearnLang: (state) => state.lang.commLearnLang,
      languages: (state) => state.lang.languages,
      groupList: (state) => state.lang.groupList,
    }),
    learnLang() {
      return this.languages.find(
        (lang) => lang.code === this.commLearnLang.substring(0, 2)
      );
    },

    countGroups() {
      return Object.keys(this.groupList).length;
    },
    countWord() {
      const keys = Object.keys(this.groupList);
      let count = 0;
      for (let index = 0; index < this.countGroups; index++) {
        if (this.groupList[keys[index]]?.forEach !== undefined) {
          count += this.groupList[keys[index]].length - 1;
        }
      }
      return count;
    },
  },
  created() {
    this.getCountWordsUser();
  },
  methods: {
    getCountWordsUser() {},
  },
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__info {
    width: 100%;
    display: flex;
    height: fit-content;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    &-list {
      margin-left: 15px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 4px;
      div {
        display: flex;
        align-items: center;
        img {
          margin-left: 5px;
        }
      }
      @media (max-width: 459px) {
        margin-left: 0;
      }
    }
    &-photo {
      width: 100px;
      height: 100px;
    }
    @media (max-width: 459px) {
      flex-direction: column;
      align-items: center;
      padding-left: 0;

      &-photo {
        margin-bottom: 15px;
      }
    }
  }
  &__statistics {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
}
</style>