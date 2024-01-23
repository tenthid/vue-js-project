import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state () {
        return {
            recipes: [],
            like: [],
            recipeDetail: {}
        }
    },
    getters: {

    },
    mutations: {
        setRecipeData(state, payload) {
            state.recipes = payload
            console.log(state.recipes)
        },
        setRecipeDetail(state, payload) {
            state.recipeDetail = payload
            console.log(state.recipeDetail)
            console.log(state.recipeDetail.isLike)
        },
        setNewRecipe(state, payload) {
            state.recipes.push(payload)
        },
        setLike(state, payload) {
            state.like = payload
            console.log(payload)
            localStorage.setItem('likedContent', JSON.stringify(payload))
        }
    },
    actions: {
        async getRecipeData({commit, state}) {
            try {
                const { data } = await axios.get("https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe.json")
                    const arr = []
                    const recipeData = []
                    for( let key in data ) {
                        arr[key] = {...data[key], isLike: false}
                        recipeData.push({id: key, ...arr[key]})
                        // arr.push({id:key, ...data[key]})
                    }
                    commit("setRecipeData", recipeData)
                    console.log("dapet kok data resepnya", recipeData)
            } catch(err) {
                console.log(err);
            }
        },
        async getRecipeDetail({commit, state}, payload) {
            try {
                const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe/${payload}.json`)
                console.log(payload) 
                for (let key in state.like) {
                    if (state.like[key].id === payload) {
                        data.isLike = true;
                    } 
                } 
                commit("setRecipeDetail", data)
            } catch(err) {
                console.log(err)
            }
        },
        async addNewRecipe({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId
            }
            try {
                const { data } = await axios.post(`https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe.json?auth=${rootState.auth.token}`, newData);
                console.log(rootState.auth.token)
                commit("setNewRecipe", {id: data.name, newData})
            } catch(err) {
                console.log(err)
            }
        },
        async deleteRecipe({ dispatch, rootState }, payload) {
            try {
                const { data } = axios.delete(`https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe/${payload}.json?auth=${rootState.auth.token}`)
                // console.log(rootState.auth.token)
                await dispatch("getRecipeData")
            } catch(err) {
                console.log(err)
            }
        },
        async updateRecipe({dispatch, rootState}, {id, newRecipe}) {
            try {
                const { data } = axios.put(`https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe/${id}.json?auth=${rootState.auth.token}`, newRecipe)
                console.log(rootState.auth.token)
                await dispatch("getRecipeData")
                // console.log("ini edit yang jalan")
            } catch(err) {
                console.log(err)
            }
        },
        async addLike({ state, commit }, payload) {
            const arr = state.like
            arr.push({id: payload})
            // commit("setLike", arr)
            console.log(state.like)
            commit("setLike", arr)
        },
        async removeLike({ state, commit }, payload) {
            const arr = state.like
            for (let key in arr) {
                if (arr[key].id === payload) {
                    console.log("target"+arr[key].id)
                    arr.splice(key, 1)
                }
            }
            commit("setLike", arr)
        },
        async postLike({ state, rootState, commit }) {
            const UID = Cookies.get("UID")
            const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user.json`)
            const user = data
            try {
                for (let key in user ) {   
                    if (user[key].userId === UID) {
                        const { data } = await axios.put(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user/${key}/likedList.json?auth=${rootState.auth.token}`, state.like)
                        console.log(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user/${key}/likedList.json?auth=${rootState.auth.token}, data ${state.like}`)
                        localStorage.removeItem("likedContent")
                        console.log(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user/${key}/likedList.json?auth=${rootState.auth.token}, data ${state.like}`)
                    }               
                }
            } catch(err) {
                console.log(err)
            }
            console.log('post like jalan')
        },
        async getLike({ commit }) {
            try {
                const UID = Cookies.get("UID")
                const localStorageLikedContent = JSON.parse(localStorage.getItem('likedContent'))
                if (localStorageLikedContent !== null) {
                    commit("setLike", localStorageLikedContent)
                    console.log('dapet dari localstorage')
                } else {
                    const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user.json`)
                    const user = data
                    for (let key in user) {
                        if (user[key].userId === UID) {
                            const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/user/${key}/likedList.json`)
                            commit("setLike", data)
                            console.log('dapet dari database')
                        }
                        console.log('for untuk nyari user key jalan')
                    }
                    console.log('kondisi local storage null/undefined jalan, setemu data user '+ user)
                }
                console.log('getlike jalan')
                // try {
                // } catch(err) {
                //     console.log(err)
                // }
            } catch(err) {
                console.log(err)
            }
        }
    }
}