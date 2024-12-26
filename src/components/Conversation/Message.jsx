import React from 'react'
import {Box,Stack} from "@mui/material"
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes'


const Message = ({menu,messages}) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
       {messages.map((el) => {
        switch(el.type) {
            case "divider":
               return <Timeline key={el.id} el={el}/>
            case "msg":
                switch(el.subtype) {
                    case "img" :
                       return <MediaMsg key={el.id} el={el} menu={menu}/>
                    case "doc" :
                        return <DocMsg key={el.id} el={el} menu={menu}/>
                    case "link" :
                        return <LinkMsg key={el.id} el={el} menu={menu} />
                    case "reply" :
                       return <ReplyMsg key={el.id} el={el} menu={menu}/>
                    case "Text" :
                        return <TextMsg key={el.id} el={el} menu={menu}/>
                    default :
                       return <></>
                }
            default:
                return <></>
        }
       })}
      </Stack>
    </Box>
  )
}

export default Message