/* eslint-disable no-unused-vars */
import { app, storage } from '@/store/config'
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
			authStage: 1
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
		}
	},

	actions: {
		signInUser({ commit, state }, user) {
			const userInfo = new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, user.email, user.password).then((userCredintial) => {
					resolve(userCredintial.user)
				}).catch(error => {
					reject(error)
				})
			})
			userInfo.then(response => {
				commit('updateIsUser', true)
				commit('updateUserInfo', response)
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
			})
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
		onAuthUser({ commit, state }) {
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
					commit('updateIsUser', true)
					commit('updateUserInfo', currentUser)

				}
			})
		},
		signOutUser({ commit }) {
			const auth = getAuth(app);

			signOut(auth).then(() => {
				commit('updateIsUser', false)
				commit('updateUserInfo', {})
			}).catch((error) => {
				// An error happened.
			})
		}
	},

	namespaced: true
}