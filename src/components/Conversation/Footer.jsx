import React, { useState } from 'react'
import { Stack, Tooltip, TextField, Box, IconButton, InputAdornment, Fab } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import {
    Camera,
    File,
    Image,
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
    Sticker,
    User,
} from "phosphor-react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {socket} from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessage } from '../../redux/slices/conversations';
import moment from 'moment';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px"
    }
}))

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

export const Footer = ({chat_id,chat_type}) => {
    const theme = useTheme()
    const dispactch = useDispatch()
    const [openPicker, setOpenPicker] = useState(false)
    const [message,setMessage] = useState("")
    const {user_id} = useSelector(state => state.auth)
    const {current_chat} = useSelector(state => state.conversation.direct_chat);
    const handleMessage = (text) => {
        setMessage(text);
    }
    const sendMessage = () => {
        const current_message = {
            to:current_chat.user_id,
            from:user_id,
            message,
            chat_id,
            type:"msg",
            created_at:moment.now()
        }
        socket.emit("text_message",current_message)
        handleMessage("")
    }
    return (
        <Box p={2} sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
        }}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                    </Box>
                    <ChatInput setMessage={handleMessage} message={message} setOpenPicker={setOpenPicker} />
                </Stack>
                <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ width: "100%", height: "100%" }} alignItems={"center"} justifyContent={"center"}>
                        <IconButton onClick={sendMessage}>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

const ChatInput = ({ setOpenPicker,setMessage,message }) => {
    const [openActions,setOpenActions] = useState(false)
    const handleChange = (e,t) => {
         setMessage(e.target.value)
    }
    return (
        <StyledInput onChange={handleChange} value={message} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
            disableUnderline: true,
            startAdornment: (
                <Stack sx={{ width: "max-content" }}>
                    <Stack sx={{ position: "relative",display:openActions ? "inline-block" : "none" }}>
                        {Actions.map((el) => (
                            <Tooltip title={el.title} placement='right'>
                                <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.color }}>
                                    {el.icon}
                                </Fab>
                            </Tooltip>
                        ))}
                    </Stack>
                    <InputAdornment position='start'>
                        <IconButton onClick={() => setOpenActions(!openActions)}>
                            <LinkSimple />
                        </IconButton>
                    </InputAdornment>
                </Stack>
            ),
            endAdornment: (<InputAdornment position='end'>
                <IconButton onClick={() => {
                    setOpenPicker((prev) => !prev)
                }}>
                    <Smiley />
                </IconButton>
            </InputAdornment>)
        }} />
    )
}
