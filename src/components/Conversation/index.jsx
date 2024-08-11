import React, { useEffect, useRef, useState } from 'react'
import { Stack, Box } from '@mui/material'
import Header from './Header'
import { Footer } from './Footer'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { FetchMessages } from '../../redux/slices/conversations'
import {socket} from '../../socket'
const Conversation = ({chat_id,chat_type}) => {
    const scrollRef = useRef(null)
    const dispatch = useDispatch()
    const {current_messages} = useSelector(state => state.conversation.direct_chat)
    useEffect(() => {
      socket.emit("get_messages",{chat_id,chat_type} ,(data) => {
        dispatch(FetchMessages({messages:data}))
      })
    },[])
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }
    },[current_messages])
    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            <Header />
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "auto"}}>
                <Message messages={current_messages} menu={true} />
                <div ref={scrollRef} />
            </Box>
            <Footer chat_id={chat_id} chat_type={chat_type} />
        </Stack>
    )
}

export default Conversation