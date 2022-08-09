/* eslint-disable no-unused-vars */
import { app, storage } from '@/store/config'
import { getAuth } from "firebase/auth"
const auth = getAuth(app);
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
			API_KEY: 'dict.1.1.20220808T152559Z.7e0553931357e27c.d50da1092554e35c7112ba76f3b82f5378a387e4&'
		}
	},

	mutations: {
		updateNativeLang(state, nativeLang) {
			state.commLang.forEach(element => {

			});
			console.log();
			state.nativeLang = nativeLang;
		},

		updateLearnLang(state, learnLang) {
			state.learnLang = learnLang;
		},
		setCommLang(state, commLang) {
			state.commLang = commLang;
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
		}
	},
	namespaced: true
}