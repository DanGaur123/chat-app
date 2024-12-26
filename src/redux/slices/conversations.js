import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState = {
    direct_chat: {
        chats: [],
        current_chat: null,
        current_messages: []
    },
    group_chat: {}
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversations(state, action) {
            const user_id = action.payload.user_id
            const list = action.payload.chats.map(el => {
                const lastMessage = el.messages.at(-1);
                const this_user = el.participants.find(elm => elm._id.toString() !== user_id)
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "Online",
                    img: faker.image.avatar(),
                    msg: lastMessage.text,
                    time: moment(lastMessage.created_at).format("hh:mm A"),
                    unread: 0,
                    pinned: false
                }
            })
            state.direct_chat.chats = list
        },
        updateDirectChat(state, action) {
            const user_id = action.payload.user_id
            const this_chat = action.payload.chat;
            state.direct_chat.chats = state.direct_chat.chats.map(el => {
                if (el.id !== this_chat._id) {
                    return el
                }
                else {
                    const user = this_chat.participants.find(elm => elm._id.toString() !== user_id)
                    return {
                        id: this_chat._id,
                        user_id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        online: user.status === "online",
                        img: faker.image.avatar(),
                        msg: faker.music.songName(),
                        time: "9:36",
                        unread: 0,
                        pinned: false
                    }
                }
            })
        },
        addDirectChat(state, action) {
            const user_id = action.payload.user_id
            const this_chat = action.payload.chat
            const user = this_chat.participants.find(elm => elm._id.toString() !== user_id)
            state.direct_chat.chats.push({
                id: this_chat._id,
                user_id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                online: user.status === "online",
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false
            })
        },
        fetchMessages(state,action) {
           state.direct_chat.current_messages = action.payload.current_messages
        },
        addMessage(state,action) {
          state.direct_chat.current_messages.push(action.payload.current_message)
        },
        updateCurrentChat(state,action){
          state.direct_chat.current_chat = action.payload.this_user
        }
    }
})

export default slice.reducer

export const FetchDirectConversations = ({ chats }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({ chats,user_id:getState().auth.user_id }))
    }
}

export const AddDirectChat = ({ chat }) => {
    return async (dispatch, getState) => {
      dispatch(slice.actions.addDirectChat({chat,user_id:getState().auth.user_id}))
    }
}

export const updateDirectChat = ({ chat }) => {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateDirectChat({chat,user_id:getState().auth.user_id}))
    }
}

export const FetchMessages = ({messages}) => {
    return (dispatch,getState) => {
        const current_messages = messages.map(message => {
            const incoming = message.to === getState().auth.user_id
            return {
               id: message._id,
               type : message.type,
               subtype: message.subType,
               message : message.text,
               incoming : incoming,
               time: message.created_at
            }
          })
     dispatch(slice.actions.fetchMessages({current_messages}))   
    }
}

export const UpdateCurrentChat = ({this_user}) => {
    return (dispatch,getState) => {
        dispatch(slice.actions.updateCurrentChat({this_user}))
    }
}

export const AddMessage = ({message}) => {
    return (dispatch,getState) => {
        const incoming = message.to.toString() === getState().auth.user_id
        const current_message =  {
               id: message._id,
               type : message.type,
               subtype: "Text",
               message : message.text,
               incoming : incoming,
               time: message.created_at
            }
        dispatch(slice.actions.addMessage({current_message}))
    }
}