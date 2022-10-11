import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rtl : localStorage.getItem("lang") === "pe",
    dataTable: false,
    userOrAdmin: false,
    nameUser : "admin",
    allUsers:[{ username: "admin", admin: true }],
    Files:[],
    allGroup:[],
    changeTheme:"",
  },

  getters: {
    isRtl(state) {
     return  state.rtl 
    },
    // isAllUser(state){
    //   return state.allUsers
    // },
  },
  mutations: {
    GoToTable:state =>{
       state.dataTable = true
    },
    isUser:state=>{
      state.userOrAdmin = true
    },
    isAdmin:state=>{
      state.userOrAdmin = false
    },
    isGetUserInDom:(state,data)=>{
         state.allUsers.push(data)
    },
    isFile:(state,data)=>{
         state.Files.push(data)
    },
    AddFileForUser:(state,data)=>{
         state.allUsers.push(data)
    },
    isGetGroup:(state,data)=>{
      state.allGroup.push(data)
    },
    isGetUsers:(state,data)=>{
      state.allUsers.concat(data)
    }
   
  },
  actions: {
  },
  modules: {
  }
})
