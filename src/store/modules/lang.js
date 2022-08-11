/* eslint-disable no-unused-vars */
import { app } from '@/store/config'
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth"
const auth = getAuth(app);
const database = getDatabase(app)

import axios from 'axios'
export const lang = {
	state() {
		return {
			languages: [
				{
					title: "English",
					code: 'en',
					urlPhoto: 'https://www.worldometers.info/img/flags/uk-flag.gif'
				},
				{
					title: "Russian",
					code: 'ru',
					urlPhoto: 'https://www.worldometers.info/img/flags/rs-flag.gif'
				},
				{
					title: "Belgian",
					code: 'be',
					urlPhoto: 'https://www.worldometers.info/img/flags/be-flag.gif'
				},
				{
					title: "Serbian",
					code: 'cs',
					urlPhoto: 'https://www.worldometers.info/img/flags/ri-flag.gif'
				},
				{
					title: "Bulgarian",
					code: 'bg',
					urlPhoto: 'https://www.worldometers.info/img/flags/bu-flag.gif'
				},
				{
					title: "Danish",
					code: 'da',
					urlPhoto: 'https://www.worldometers.info/img/flags/da-flag.gif'
				},
				{
					title: "German",
					code: 'de',
					urlPhoto: 'https://www.worldometers.info/img/flags/gm-flag.gif'
				},
				{
					title: "Turkish",
					code: 'tr',
					urlPhoto: 'https://www.worldometers.info/img/flags/tu-flag.gif'
				},
				{
					title: "Greek",
					code: 'el',
					urlPhoto: 'https://www.worldometers.info/img/flags/gr-flag.gif'
				},
				{
					title: "Spanish",
					code: 'es',
					urlPhoto: 'https://www.worldometers.info/img/flags/sp-flag.gif'
				},
				{
					title: "Ethiopian",
					code: 'et',
					urlPhoto: 'https://www.worldometers.info/img/flags/et-flag.gif'
				},
				{
					title: "Finnish",
					code: 'fi',
					urlPhoto: 'https://www.worldometers.info/img/flags/fi-flag.gif'
				},
				{
					title: "French",
					code: 'fr',
					urlPhoto: 'https://www.worldometers.info/img/flags/fr-flag.gif'
				},
				{
					title: "Italian",
					code: 'it',
					urlPhoto: 'https://www.worldometers.info/img/flags/it-flag.gif'
				},
				{
					title: "Lithuanian",
					code: 'lt',
					urlPhoto: 'https://www.worldometers.info/img/flags/lh-flag.gif'
				},
				{
					title: "Latvian",
					code: 'lv',
					urlPhoto: 'https://www.worldometers.info/img/flags/lg-flag.gif'
				},
				{
					title: "Netherlandish",
					code: 'nl',
					urlPhoto: 'https://www.worldometers.info/img/flags/nl-flag.gif'
				},
				{
					title: "Norwegian",
					code: 'no',
					urlPhoto: 'https://www.worldometers.info/img/flags/no-flag.gif'
				},
				{
					title: "Portuguese",
					code: 'pt',
					urlPhoto: 'https://www.worldometers.info/img/flags/po-flag.gif'
				},
				{
					title: "Slovak",
					code: 'sk',
					urlPhoto: 'https://www.worldometers.info/img/flags/lo-flag.gif'
				},
				{
					title: "Salvadoran",
					code: 'sv',
					urlPhoto: 'https://www.worldometers.info/img/flags/es-flag.gif'
				},
				{
					title: "Ukranian",
					code: 'uk',
					urlPhoto: 'https://www.worldometers.info/img/flags/up-flag.gif'
				},
				{
					title: "Hungarian",
					code: 'hu',
					urlPhoto: 'https://www.worldometers.info/img/flags/hu-flag.gif'
				},
				{
					title: "Polish",
					code: 'pl',
					urlPhoto: 'https://www.worldometers.info/img/flags/pl-flag.gif'
				},
				{
					title: "Chinese",
					code: 'zh',
					urlPhoto: 'https://www.worldometers.info/img/flags/ch-flag.gif'
				},
			],
			nativeLang: null,
			learnLang: null,
			commLang: [],
			commLearnLang: '',
			API_KEY: 'dict.1.1.20220808T152559Z.7e0553931357e27c.d50da1092554e35c7112ba76f3b82f5378a387e4&',
			errorLang: false,
			errorGroup: false,
			groupList: [],
			currentGroup: '',
			wordInGroup: ''
		}
	},

	mutations: {
		updateNativeLang(state, nativeLang) {
			state.nativeLang = nativeLang;
		},

		updateLearnLang(state, learnLang) {
			state.learnLang = learnLang;
		},
		setCommLang(state, commLang) {
			state.commLang = commLang;
		},
		updateCommLearnLang(state, commLearnLang) {
			state.commLearnLang = commLearnLang
		},
		updateErrorLang(state, errorLang) {
			state.errorLang = errorLang
		},
		updateErrorGroup(state, errorGroup) {
			state.errorGroup = errorGroup
		},
		updateGroupList(state, groupList) {
			state.groupList = groupList
		},
		addGroup(state, group) {
			state.groupList[group] = ['']
		},
		removeGroup(state, group) {
			delete state.groupList[group]
		},
		updateCurrentGroup(state, currentGroup) {
			state.currentGroup = currentGroup;
		},
		updateWord(state, word) {
			state.wordInGroup = word;
			state.wordInGroup.important = false
		}
	},


	getters: {
		allLang: (state) => state.languages,
		allLearnLang: (state) => state.languages.filter((lang, index) => state.commLang.filter(lang => lang.startsWith(state.nativeLang?.code + '-')).find(langFind => langFind.endsWith(lang.code)) && lang.title !== state.nativeLang.title)
	},

	actions: {
		getCommLang({ commit, state }) {
			axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=' + state.API_KEY).then(response => {
				commit('setCommLang', response.data)
			}).catch(error => {
				console.log(error);
			})
		},
		setUserLearnLangs({ commit, state }, userID) {
			if (state.nativeLang != null && state.learnLang != null) {
				set(ref(database, `user/${userID}/learnLangs`), `${state.learnLang.code}-${state.nativeLang.code}`);
				commit('user/updateIsUser', true, { root: true })
			} else {
				commit('updateErrorLang', true)
			}
		},

		checkLearnLangs({ commit, state }, userID) {
			const langRef = ref(database, `user/${userID}/learnLangs`);
			if (userID != undefined) {
				return onValue(langRef, (snapshot) => {
					commit('updateCommLearnLang', snapshot.val())

					if (state.commLearnLang) {
						commit('user/updateIsUser', true, { root: true })
						return
					}
					commit('user/updateIsRegistered', true, { root: true })
					commit('user/updateAuthStage', 2, { root: true })

					return false
				});
			} else if (userID === undefined) {
				commit('user/updateIsUser', false, { root: true })
			} else {
				commit('user/updateIsRegistered', true, { root: true })
				commit('user/updateAuthStage', 2, { root: true })
			}
		},

		checkWordInDictionary({ commit, state, dispatch }, word) {
			axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220808T152559Z.7e0553931357e27c.d50da1092554e35c7112ba76f3b82f5378a387e4&', {
				params: {
					lang: state.commLearnLang,
					text: word
				}
			}).then((response) => {
				if (response.data.def.length > 0) {
					commit('updateWord', response.data)
					dispatch("parallelCrossing", response.data)
					commit('updateErrorLang', false)
					return response.def
				} else {
					commit('updateErrorLang', true)
				}
			})
		},
		parallelCrossing({ commit, state }, word) {
			const first = state.commLearnLang.substr(0, 2);
			const second = state.commLearnLang.substr(3, 5);
			axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220808T152559Z.7e0553931357e27c.d50da1092554e35c7112ba76f3b82f5378a387e4&', {
				params: {
					lang: `${second}-${first}`,
					text: state.wordInGroup.def[0].tr[0].text
				}
			}).then((response) => {
				if (response.data.def.length > 0) {
					commit('updateWord', { [first]: state.wordInGroup, [second]: response.data })
					commit('updateErrorLang', false)
					return response.def
				} else {
					commit('updateErrorLang', true)
				}
			})
		},
		checkGroupList({ commit }, userID) {
			const listRef = ref(database, `user/${userID}/groups`);

			onValue(listRef, (snapshot) => {
				commit('updateGroupList', snapshot.val())
			})
		},

		deleteGroupInList({ commit, state }, info) {
			const listRef = ref(database, `user/${info.userID}/groups`);
			commit('removeGroup', info.groupName)
			set(listRef, state.groupList);
		},

		updateGroupWord({ commit, state }, info) {
			const listRef = ref(database, `user/${info.userID}/groups`);
			console.log(state.groupList);
			set(listRef, state.groupList);
		},

		addGroupLang({ commit, state }, info) {
			const langRef = ref(database, `user/${info.userID}/groups/${info.groupName}`)
			onValue(langRef, (snapshot) => {
				if (snapshot.val()?.length > 0) {
					commit('updateErrorGroup', true)
				} else {
					const listRef = ref(database, `user/${info.userID}/groups`);
					commit('addGroup', info.groupName)

					set(listRef, state.groupList);

					commit('updateErrorGroup', false)

				}
			})
		}
	},


	namespaced: true
}