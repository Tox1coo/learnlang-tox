/* eslint-disable no-unused-vars */
export const testing = {
	state: () => {
		return {
			wordsInTesting: [],
			arrayOfQuestions: [],
			elementOfQuestions: {
				id: null,
				question: '',
				word: '',
				answers: [
					{
						wordInNatureLang: '',
						wordInLerningLang: '',
						correct: null
					},
				],
			},
			maxWords: 29,
			indexWord: 0,
			maxChance: 64,
			minProgress: 50,
			id: 1,
			isLoadingTests: false
		}
	},
	mutations: {
		updateWordsInTesting(state, wordsInTesting) {
			state.wordsInTesting = state.wordsInTesting.concat(wordsInTesting).filter(item => item !== '')
		},
		updateQuestions(state, { question, chance }) {
			if (question.progress <= state.minProgress) {
				state.arrayOfQuestions.push(question)
				const questionClone = Object.assign({}, question)
				questionClone.id = Math.floor(1 + Math.random() * 10000 - 1)
				state.arrayOfQuestions.push(questionClone)

			} else {
				state.arrayOfQuestions.push(question)
			}
		},
		incrementIndexWord(state) {
			state.indexWord++
		},
		updateIndexWord(state) {
			state.indexWord = state.maxWords
		},
		createId(state) {
			state.id = Math.floor(1 + Math.random() * 10000 - 1)
		},
		updateIsLoadingTest(state) {
			setTimeout(() => {
				state.isLoadingTests = true
			}, 5000);
		}
	},

	actions: {

		getAllWordInTesting({ commit, dispatch }, groupList) {
			const length = Object.keys(groupList).length;
			const keys = Object.keys(groupList);
			for (let index = 0; index < length; index++) {
				if (groupList[keys[index]] === '') continue;
				commit('updateWordsInTesting', groupList[keys[index]])
			}
		},
		async initQuestions({ commit, state, dispatch }) {
			const interval = setInterval(async () => {
				if (state.indexWord < state.maxWords) {
					const wait = await dispatch('checkQuestions')
					console.log(wait);
					if (wait === 'end') { clearInterval(interval), commit('updateIsLoadingTest') }
					if (wait === undefined)
						commit('incrementIndexWord')
				} else {
					clearInterval(interval)
					commit('updateIsLoadingTest')
				}
			}, 200);
		},
		checkQuestions({ commit, state, dispatch, rootState }) {
			const chance = Math.floor(0 + Math.random() * 100 - 1)

			if (state.wordsInTesting.length >= state.maxWords) {

				const word = chance <= 64 ? state.wordsInTesting.sort(() => Math.random() - 0.5).find(word => state.arrayOfQuestions.findIndex(wordInQuesion => wordInQuesion.word === word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text) === -1 && word.progress <= state.minProgress) : state.wordsInTesting.sort(() => Math.random() - 0.5).find(word => state.arrayOfQuestions.findIndex(wordInQuesion => wordInQuesion.word === word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text) === -1 && word.progress >= state.minProgress + 1)
				if (word !== undefined) {
					dispatch('createQuestion', { wordObj: word, word: word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text }).then((question) => {
						commit('updateQuestions', { question: question, chance: chance })
						return
					})
				}

			} else {
				let wait;
				for (let index = 0; index < state.wordsInTesting.length; index++) {
					const word = state.wordsInTesting[index]
					dispatch('createQuestion', { wordObj: word, word: word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text }).then((question) => {
						commit('updateQuestions', { question: question, chance: chance })
					})
					console.log(index);
					if (index === state.wordsInTesting.length - 1) wait = 'end'
				}
				return wait
			}
		},
		createQuestion({ commit, state, dispatch }, { wordObj, word }) {
			return new Promise((resolve, reject) => {
				const question = {
					id: state.id,
					question: `How is the word translated "${word}"?`,
					word: word,
					answers: [],
					progress: wordObj.progress
				}
				commit('createId')

				dispatch('createAnswer', { wordObj: wordObj, wordQuestion: word }).then((result) => {
					const answers = result
					question.answers = answers
				})
				resolve(question)
			})


		},
		createAnswer({ commit, state, rootState }, { wordObj, wordQuestion }) {
			let index = 1;
			const answers = []
			let answersItem = {}
			answersItem = {
				wordInNatureLang: wordQuestion,
				wordInLerningLang: wordObj[rootState.lang.commLearnLang.match(/-\b\w+/)[0].slice(1)],
				correct: true
			}
			answers.push(answersItem)
			state.wordsInTesting.forEach(word => {
				if (index === 4) return
				if (answers.findIndex(wordInAnswer => wordInAnswer.wordInNatureLang === word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text) === -1) {
					answersItem = {
						wordInNatureLang: word[rootState.lang.commLearnLang.match(/\w+\b/)[0]].def[0].text,
						wordInLerningLang: word[rootState.lang.commLearnLang.match(/-\b\w+/)[0].slice(1)].def[0].text,
						correct: false
					}
					index++;
					answers.push(answersItem)
				}
			});

			return answers
		}
	},

	getters: {
		getQuestionForTesting(state) {
			return state.arrayOfQuestions.sort(() => Math.random() - 0.5)
		}
	},

	namespaced: true
}