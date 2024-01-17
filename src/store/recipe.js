import axios from "axios";

export default {
    namespaced: true,
    state () {
        return {
            recipes: [],
            recipeDetail: {},
        }
    },
    getters: {

    },
    mutations: {
        setRecipeData(state, payload) {
            state.recipes = payload
        },
        setRecipeDetail(state, payload) {
            state.recipeDetail = payload
            console.log(state.recipeDetail)
        },
        setNewRecipe(state, payload) {
            state.recipes.push(payload)
        }
    },
    actions: {
        async getRecipeData({commit}) {
            try {
                const { data } = await axios.get("https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe.json")
                    const arr = []
                    const recipeData = []
                    for( let key in data ) {
                        arr[key] = {...data[key], like: false}
                        recipeData.push({id: key, ...arr[key]})
                        // arr.push({id:key, ...data[key]})
                    }
                    commit("setRecipeData", recipeData)
                    console.log("dapet kok data resepnya", recipeData)
            } catch(err) {
                console.log(err);
            }
        },
        async getRecipeDetail({commit}, payload) {
            try {
                const { data } = await axios.get(`https://vue-js-project-67129-default-rtdb.firebaseio.com/recipe/${payload}.json`)
                console.log(payload)
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
                console.log(rootState.auth.token)
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
                console.log("ini edit yang jalan")
            } catch(err) {
                console.log(err)
            }
        },
    }
}