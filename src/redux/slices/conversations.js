import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id")

const initialState = {
    direct_chat : {
        chats : [],
        current_chat : null,
        current_messages : []
    },
    group_chat : {}
}

const slice = createSlice({
  name:"conversation",
  initialState,
  reducers:{
    fetchDirectConversations(state,action){
        const list = action.payload.chats.map(el => {
            const this_user = el.participants.find(elm => elm._id.toString() != user_id)
            return {
                id : el._id,
                user_id:this_user._id,
                name:`${this_user.firstName} ${this_user.lastName}`,
                online: this_user.status === "online",
                img : faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread:0,
                pinned:false        
            }
        })
        state.direct_chat.chats = list
    }
  }
})

export default slice.reducer

export const fetchDirectConversations = ({chats}) => {
    return async (dispatch,getState) =>{
       dispatch(slice.actions.fetchDirectConversations({chats}))
    }
}