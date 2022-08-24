/* eslint-disable no-unused-vars */

import { app } from '@/store/config';
import { getDatabase, set, ref, onValue, get, child } from "firebase/database";
import { getAuth } from "firebase/auth"

const auth = getAuth(app);
const database = getDatabase();
const dbRef = ref(database)

export const dictionary = {
	state() {
		return {
			dictionaryList: [],
			sortedType: {
				value: 'progress',
				direction: 'top'
			},
			nativeLangForDictionary: '',
			learningLangForDictionary: '',
			searchDictionary: '',
			importantGroup: null,
			importantItem: {
				item: {},
				nativeLang: "",
				learningLang: "",
			}
		}
	},
	mutations: {
		updateDictionaryList(state, dictionaryList) {
			state.dictionaryList = dictionaryList
		},
		updateNativeLangForDictionary(state, nativeLangForDictionary) {
			state.nativeLangForDictionary = nativeLangForDictionary
		},
		updateLearningLangForDictionary(state, learningLangForDictionary) {
			state.learningLangForDictionary = learningLangForDictionary
		},
		updateSortedType(state, sortedType) {
			state.sortedType = sortedType
		},
		updateSearchDictionary(state, searchDictionary) {
			state.searchDictionary = searchDictionary
		},
		updateImportantGroup(state, importantGroup) {
			state.importantGroup = importantGroup
		},
		updateElementImportantGroup(state, { element, index
		}) {
			state.importantGroup[index] = element
		},
		updateImportantItem(state, importantItem) {
			state.importantItem.item = importantItem
			state.importantItem.nativeLang = state.nativeLangForDictionary;
			state.learningLang = state.learningLangForDictionary
		}
	},

	getters: {
		sortedDictionaryList(state) {
			return [...state.dictionaryList].sort((item1, item2) => {
				if (state.sortedType.value === 'progress') {
					if (state.sortedType.direction === 'top') {
						return item2.progress - item1.progress
					}
					else {
						return item1.progress - item2.progress
					}
				}
				if (state.sortedType.value === 'date') {
					if (state.sortedType.direction === 'top') {
						return new Date(item2.date) - new Date(item1.date)
					}
					if (state.sortedType.direction === 'down') {
						return new Date(item1.date) - new Date(item2.date)
					}
				}
				if (state.sortedType.value === 'group') {
					const group1 = item1.group.toLocaleLowerCase();
					const group2 = item2.group.toLocaleLowerCase();
					if (state.sortedType.direction === 'top') {
						if (group2 < group1) {
							return 1
						}
						if (
							group2 > group1
						) {
							return -1
						}

						return 0
					}
					if (state.sortedType.direction === 'down') {
						if (group1 < group2) {
							return 1
						}
						if (
							group1 > group2
						) {
							return -1
						}
						return 0
					}
				}
				if (state.sortedType.value === 'translate') {
					const text1 = item1[state.learningLangForDictionary].def[0].text.toLocaleLowerCase();
					const text2 = item2[state.learningLangForDictionary].def[0].text.toLocaleLowerCase();
					if (state.sortedType.direction === 'top') {
						if (text2 < text1) {
							return 1
						}
						if (
							text2 > text1
						) {
							return -1
						}
						return 0
					}
					if (state.sortedType.direction === 'down') {
						if (text1 < text2) {
							return 1
						}
						if (
							text1 > text2
						) {
							return -1
						}
						return 0
					}
				}
				if (state.sortedType.value === 'original') {
					const text1 = item1[state.nativeLangForDictionary].def[0].text.toLocaleLowerCase();
					const text2 = item2[state.nativeLangForDictionary].def[0].text.toLocaleLowerCase();
					if (state.sortedType.direction === 'top') {
						if (text2 < text1) {
							return 1
						}
						if (
							text2 > text1
						) {
							return -1
						}
						return 0
					}
					if (state.sortedType.direction === 'down') {
						if (text1 < text2) {
							return 1
						}
						if (
							text1 > text2
						) {
							return -1
						}
						return 0
					}
				}
			})
		},
		searchAndSorted(state, getters) {
			return getters.sortedDictionaryList.filter(dictionaryItem => {
				return dictionaryItem[state.learningLangForDictionary].def[0].text.startsWith(state.searchDictionary.toLocaleLowerCase()) || dictionaryItem[state.nativeLangForDictionary].def[0].text.startsWith(state.searchDictionary.toLocaleLowerCase())
			})
		}
	},

	actions: {
		getDictionaryItem({ commit, state }, dictionaryItem) {
			const userId = auth.currentUser.uid;
			return new Promise((resolve, reject) => {
				get(child(dbRef, `user/${userId}/groups/${dictionaryItem.group}`)).then((snapshot) => {
					if (snapshot.exists()) {
						commit('updateImportantGroup', snapshot.val())

						snapshot.val().forEach(element => {
							if (element[state.nativeLangForDictionary]?.def[0].text == dictionaryItem[state.nativeLangForDictionary].def[0].text) {
								commit('updateImportantItem', element)
								resolve(element)


								// commit('updateImportantWord', element)
							}
						});
					} else {
						console.log("No data available");
					}
				}).catch((error) => {
					console.error(error);
				});
			})
		},
		makeImportant({ commit, state, dispatch }, dictionaryItem) {
			const userId = auth.currentUser.uid;

			const word = dispatch('getDictionaryItem', dictionaryItem);
			word.then((result) => {
				console.log(result);
				result.important = true;
				state.importantGroup.forEach((element, index) => {
					if (element[state.nativeLangForDictionary]?.def[0].text == result[state.nativeLangForDictionary].def[0].text) {
						element = result;
						commit('updateElementImportantGroup', { element: element, index })
						set(ref(database, `user/${userId}/groups/${dictionaryItem.group}`), state.importantGroup)
					}

				})
			})
		}
	},

	namespaced: true

}