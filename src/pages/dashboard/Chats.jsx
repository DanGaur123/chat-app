import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, IconButton, Divider, Button, } from "@mui/material"
import { CircleDashed, MagnifyingGlass, ArchiveBox, User } from "phosphor-react"
import { alpha, useTheme } from "@mui/material/styles"
import { ChatList } from '../../data'
import { SimpleBarStyle } from "../../components/Scrollbar"
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search"
import ChatElement from '../../components/ChatElement'
import Friends from '../../sections/main/Friends'
import { useDispatch, useSelector } from 'react-redux'
import {socket} from '../../socket'
import { FetchDirectConversations } from '../../redux/slices/conversations'

const Chats = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedChat,setSelectedChat] = useState(null)
    const {user_id} = useSelector(state => state.auth)
    const { chats } = useSelector((state) => state.conversation.direct_chat)
    const handleSelectedChat = (id) => {
         setSelectedChat(id)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            dispatch(FetchDirectConversations({ chats: data }))
        })
    }, [])
    return (
        <>
            <Box sx={{ position: "relative", width: 320, backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper, boxShadow: "0 0 2px rgba(0,0,0,0.25)" }}>
                <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                    <Stack direction="row" alignItems='center' justifyContent="space-between">
                        <Typography variant='h5'>
                            Chats
                        </Typography>
                        <Stack direction={"row"} spacing={0.5}>
                            <IconButton onClick={handleOpenDialog} >
                                <User />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709CE6' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                            />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1.5} >
                            <ArchiveBox size={24} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack spacing={2} direction={"column"} sx={{
                        flexGrow: 1, overflowY: "auto", height: "100%", '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: (theme) => theme.palette.background.default,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: (theme) => theme.palette.primary.main,
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: (theme) => alpha(theme.palette.primary.main, 0.8),
                        }
                    }}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                    Pinned
                                </Typography>
                                {ChatList.filter((el) => el.pinned).map((el) => {
                                    return <ChatElement selected={selectedChat} handleSelected={handleSelectedChat} {...el} />
                                })}
                                <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                    All Chats
                                </Typography>
                                {chats.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement selected={selectedChat} handleSelected={handleSelectedChat} {...el} />
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {
                openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />
            }
        </>
    )
}



export default Chats