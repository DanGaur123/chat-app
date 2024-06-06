import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT",
    },
    snackbar:{
        open: null,
        message:null,
        severity:null
    },
    users: [],
    friends:[],
    freindRequests:[],
    chatType:null,
    roomId:null
}


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type
        },
        openSnackbar(state,action) {
            state.snackbar.open = true
            state.snackbar.severity = action.payload.severity
            state.snackbar.message = action.payload.message
        },
        closeSnackbar(state,action) {
            state.snackbar.open = false
            state.snackbar.severity = null
            state.snackbar.message = null
        },
        fetchUsers(state,action){
            state.users = action.payload.users
        },
        fetchFriends(state,action){
            state.users = action.payload.friends
        },
        fetchFriendRequests(state,action){
            state.users = action.payload.requests
        },
        selectConversation(state,action){
            state.chatType = "individual"
            state.roomId = action.payload.roomId
        }
    }
})

export default slice.reducer

export function ToggleSidebar() {
    return async (dispatch,getState) => {
        dispatch(slice.actions.toggleSidebar())
    }
}

export function UpdateSidebarType(type) {
    return async (dispatch,getState) => {
        dispatch(
            slice.actions.updateSidebarType({
                type
            })
        )
    }
}

export function showSnackbar({severtiy,message}) {
    return async (dispatch,getState) => {
        dispatch(slice.actions.openSnackbar({
            message,severtiy
        }))

        setTimeout(() =>{
            dispatch(slice.actions.closeSnackbar())
        },4000)
    }
}

export const closeSnackbar = () => async (dispatch,getState) => {
    dispatch(slice.actions.closeSnackbar())
}

export const fetchUsers = () => {
    return async (dispatch,getState) => {
      await axios.get("/user/get-users",{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${getState().auth.token}`
        }
      }).then(response => {
        console.log(response)
        dispatch(slice.actions.fetchUsers({users: response.data.data}))
      }).catch(error => {
        console.log(error)
      })
    }
}

export const fetchFriends = () => {
    return async (dispatch,getState) => {
      await axios.get("/user/get-friends",{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${getState().auth.token}`
        }
      }).then(response => {
        console.log(response)
        dispatch(slice.actions.fetchFriends({friends: response.data.data}))
      }).catch(error => {
        console.log(error)
      })
    }
}

export const fetchFriendRequests = () => {
    return async (dispatch,getState) => {
      await axios.get("/user/get-friend-requests",{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${getState().auth.token}`
        }
      }).then(response => {
        console.log(response)
        dispatch(slice.actions.fetchFriendRequests({requests: response.data.data}))
      }).catch(error => {
        console.log(error)
      })
    }
}

export const SelectConversation = ({roomId}) => {
    return (dispatch,getState) => {
       dispatch(slice.actions.selectConversation({ roomId }))
    }
}

