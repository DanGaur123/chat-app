import React, { useEffect, useState } from 'react'
import { Box, Stack,  Typography, IconButton, Divider,  Button, } from "@mui/material"
import { CircleDashed, MagnifyingGlass, ArchiveBox, User } from "phosphor-react"
import { useTheme } from "@mui/material/styles"
import { ChatList } from '../../data'
import { SimpleBarStyle } from "../../components/Scrollbar"
import {Search,SearchIconWrapper,StyledInputBase} from "../../components/Search"
import ChatElement from '../../components/ChatElement'
import Friends from '../../sections/main/Friends'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../../socket'
import { fetchDirectConversations } from '../../redux/slices/conversations'

const user_id = window.localStorage.getItem("user_id")
const Chats = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [openDialog,setOpenDialog] = useState(false)
    const {chats} = useSelector((state) => state.conversations.direct_chats)
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    useEffect(() => {
        socket.emit("get_direct_conversations",{user_id}, (data) => {
              dispatch(fetchDirectConversations(data))
        })
    })
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
                <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
                    <SimpleBarStyle timeout={500} clickOnTrack={false}>
                        <Stack spacing={2.4}>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                Pinned
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                All Chats
                            </Typography>
                            {chats.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
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