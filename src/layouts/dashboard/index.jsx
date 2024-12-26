import React, { useEffect, useRef, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import {Stack} from '@mui/material'
import SideBar from "./SideBar";
import {useDispatch, useSelector} from "react-redux"
import {connectSocket, socket} from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { AddDirectChat, AddMessage, updateDirectChat } from "../../redux/slices/conversations";
const DashboardLayout = () => {
  const dispatch = useDispatch()
  const {isLoggedIn,user_id} = useSelector((state) => state.auth )
  const {chats} = useSelector((state) => state.conversation.direct_chat)
  const socketRef = useRef(null);
  useEffect(() => {
   if(isLoggedIn){
    if(!socketRef.current || socketRef.current.io.opts.query.user_id !== user_id){
       connectSocket(user_id)
       socketRef.current = socket
    }
    socketRef.current.on("new_friend_request",(data) => {
      dispatch(showSnackbar({severity:"success",message:data.message}))
    })
    socketRef.current.on("request_accepted",(data) => {
      dispatch(showSnackbar({severity:"success",message:data.message}))
    })
    socketRef.current.on("request_sent",(data) => {
      dispatch(showSnackbar({severity:"success",message:data.message}))
    })
    socketRef.current.on("new_message",(data) => {
     console.log(data)
     dispatch(AddMessage({message:data.message}))
    })
     socketRef.current.on("start_chat",(data) => {
      console.log(el)
      const existing_chat = chats.find(el => el.id === data.id)
      if(existing_chat){
        dispatch(updateDirectChat({chat:data}))
      }
      else{
        dispatch(AddDirectChat({chat:data}))
      }
        dispatch(SelectConversation({roomId:data._id}))
     })

   }
   return () => {
    if (socketRef.current) {
      socketRef.current.off("new_friend_request");
      socketRef.current.off("request_accepted");
      socketRef.current.off("request_sent");
      socketRef.current.off("new_message");
      socketRef.current.off("start_chat");
    }
   }
  },[isLoggedIn,user_id])

  if(!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }
  return (
    <Stack direction="row">
      <SideBar/>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
