/* eslint-disable no-unused-vars */
import { app, storage } from '@/store/config'
import * as db from "firebase/database";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
const auth = getAuth(app);
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export const user = {
	state() {
		return {
			isUser: false,
			userInfo: {},
			error: false,
			errorMessage: '',
			authStage: 1,
			isRegistered: false
		}
	},
	mutations: {
		updateIsUser(state, isUser) {
			state.isUser = isUser
		},
		updateError(state, error) {
			state.error = error
		},
		updateErrorMessage(state, errorMessage) {
			state.errorMessage = errorMessage
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		updateAuthStage(state, authStage) {
			state.authStage = authStage
		},
		updateIsRegistered(state, isRegistered) {
			state.isRegistered = isRegistered
		}
	},

	actions: {
		signInUser({ commit, state, dispatch }, user) {
			const userInfo = new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, user.email, user.password).then((userCredintial) => {
					resolve(userCredintial.user)
				}).catch(error => {
					reject(error)
				})
			})
			userInfo.then(async response => {
				commit('updateUserInfo', response)
				dispatch('lang/checkLearnLangs', response.uid, { root: true })
			}).catch(error => {
				commit('updateError', true)
				commit('updateErrorMessage', error.code)
			})
		},
		signUpUser({ commit, dispatch }, user) {
			const userInfo = new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredintial) => {
					resolve(userCredintial.user)
				}).catch(error => {
					commit('updateError', true)
					commit('updateErrorMessage', error.code)
				})
			})
			userInfo.then(response => {
				const userState = response
				dispatch('getUpload', { user, userState })
				dispatch('setParamsUser', userState.uid)
			})
		},

		setParamsUser({ commit }, userID) {
			const database = db.getDatabase(app);
			const newRef = db.ref(database, `user/${userID}/groups`);
			db.set(newRef, ['']);
		},

		async getUpload({ commit }, user) {
			const refStorage = ref(storage, user.userState.uid + '.jpg');

			const snapshot = await uploadBytes(refStorage, user.user.profilePhoto)
			let photoURL;
			try {
				photoURL = await getDownloadURL(refStorage);
			} catch (error) {
				console.log(error);
			} finally {
				updateProfile(user.userState, { displayName: user.user.name, photoURL }).then(response => {
					const currentUser = getAuth().currentUser;
					commit('updateAuthStage', 2)
					commit('updateUserInfo', currentUser);
				});

			}

		},
		async onAuthUser({ commit, state }) {
			const user = new Promise((resolve, reject) => {
				onAuthStateChanged(auth, (user) => {
					if (user) {
						const uid = user.uid;
						resolve(uid)
					} else {
						resolve(2)
					}
				});
			})
			user.then((response) => {
				const currentUser = getAuth().currentUser
				if (currentUser) {
					commit('updateUserInfo', currentUser)

				}
			})
		},
		signOutUser({ commit }) {
			const auth = getAuth(app);

			signOut(auth).then(() => {
				commit('updateIsUser', false)
				commit('updateIsRegistered', false)
				commit('updateAuthStage', 1)
				commit('updateUserInfo', {})
			}).catch((error) => {
				// An error happened.
			})
		}
	},

	namespaced: true
}