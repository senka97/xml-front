import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = "https://localhost:8083/user"; //za user service


export const store =  new Vuex.Store({
    state: {
        token: localStorage.getItem("access_token") || null,
        userRole: localStorage.getItem("userRole") || null
            
    },
    getters:{
        loggedIn(state){
            return state.token !== null;
        },
        userRole(state){
            return state.userRole;
        }

    },
    mutations:{
        retrievedToken(state, token){
            state.token = token;
        },
        destroyedToken(state){
            state.token = null;
        },
        retrievedUserRole(state, userRole){
            state.userRole = userRole;
        },
        destroyedUserRole(state){
            state.userRole = null;
        }
    },
    actions:{
        retrieveToken(context, credentials){
            return new Promise((resolve, reject) => {
                axios.post(baseUrl + '/auth/login',{
                    email: credentials.email,
                    password: credentials.password
                })
                .then(response => {
                    const token = response.data.accessToken;
                    localStorage.setItem("access_token", token);
                    context.commit('retrievedToken', token);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        destroyToken(context){
            //ovde bi trebao poziv na backend koji tamo unistava token
            //kad to uspe 
            localStorage.removeItem("access_token");
            context.commit('destroyedToken');
            console.log("push to login");
        },
        retrieveCurrentUser(context){
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + '/user/currentUser')
                .then(response => {
                    const currentUser = response.data;
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    localStorage.setItem('userRole', currentUser.role);
                    context.commit('retrievedUserRole', currentUser.role);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        destroyCurrentUser(context){
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userRole");
            context.commit('destroyedUserRole');
        }
    }
})