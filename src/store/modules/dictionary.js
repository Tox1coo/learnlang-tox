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
			searchDictionary: ''
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

	},

	namespaced: true

}