import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate : null,
            userLogin: {},
            isLogin: false,
        }
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
            console.log(userData)
            console.log(loginStatus)
        },
        setUserLogout(state) {
            state.token = null
            state.userLogin = {}
            state.isLogin = false
            state.tokenExpirationDate = null
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        }
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyAtGzsOA_3SpBii43hp81-niux0gAIs3Pk";
            const authUrl ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIkey;
            const userData = {
                email: payload.email, 
                password: payload.password, 
                returnSecureToken: true
            }
            console.log(payload.email)
            console.log(payload.password)
            try {
                const { data } = await axios.post(authUrl, userData);
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000})
                const newUserData = {
                    userId: data.localId, firstname: payload.firstname,
                    lastname: payload.lastname, username: payload.username,
                    email: payload.email, imageLink: payload.imageLink,
                };
                Cookies.set("UID", newUserData.userId);
                    await dispatch("addNewUser", newUserData);
            } catch(err) {
                console.log(err)
            }   
        },

        async addNewUser({ commit, state }, payload) {
            try {
                const { data } = await axios.post(
                `https://vue-js-project-67129-default-rtdb.firebaseio.com/user.json?auth=${
                state.token}`, payload);
                commit("setUserLogin", {userData: payload, loginStatus: true})
            } catch (err) {
                console.log(err);
                console.log(state.userLogin)
                console.log(state.isLogin)
            }
        },

        async getLoginData({commit, dispatch}, payload) {
            const APIKey = "AIzaSyAtGzsOA_3SpBii43hp81-niux0gAIs3Pk"
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + APIKey
            const userData = {
                email: payload.email, 
                password: payload.password, 
                returnSecureToken: true
            }
            try {
                const { data } = await axios.post(authUrl, userData)
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000})
                await dispatch("getUser", data.localId)
            } catch(err) {
                console.log(err)
            }
        },
        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get("https://vue-js-project-67129-default-rtdb.firebaseio.com/user.json")
                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId)
                        commit("setUserLogin", {
                            userData: data[key], loginStatus: true
                        })
                    }
                }
            } catch(err) {
                console.log(err)
            }
        }
    }
}