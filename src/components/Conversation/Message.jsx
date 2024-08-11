import React from 'react'
import {Box,Stack} from "@mui/material"
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes'


const Message = ({menu,messages}) => {
  console.log(messages)
  return (
    <Box p={3}>
      <Stack spacing={3}>
       {messages.map((el) => {
        switch(el.type) {
            case "divider":
               return <Timeline el={el}/>
            case "msg":
                switch(el.subtype) {
                    case "img" :
                       return <MediaMsg el={el} menu={menu}/>
                    case "doc" :
                        return <DocMsg el={el} menu={menu}/>
                    case "link" :
                        return <LinkMsg el={el} menu={menu} />
                    case "reply" :
                       return <ReplyMsg el={el} menu={menu}/>
                    case "Text" :
                        return <TextMsg el={el} menu={menu}/>
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