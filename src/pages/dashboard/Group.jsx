import React, { useState } from 'react'
import { Stack, Box, Typography, Link, IconButton, Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from "phosphor-react"
import { SimpleBarStyle } from '../../components/Scrollbar'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import CreateGroup from '../../sections/main/CreateGroup'

const Group = () => {
    const theme = useTheme()
    const [openDialog,setOpenDialog] = useState()
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    return (
        <Stack direction={"row"} sx={{ width: "100%" }}>
            {/* Left Panel */}
            <Box sx={{ height: "100vh", width: 320, backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0 0 2px rgba(0,0,0,0.25)" }}>
                <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                    <Typography variant='h5'>Groups</Typography>
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
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
                        <IconButton onClick={() => setOpenDialog(true)}>
                            <Plus style={{ color: theme.palette.primary.main }} size={20} />
                        </IconButton>
                    </Stack>
                    <Divider />
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
                                    All Groups
                                </Typography>
                                {ChatList.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement {...el} />
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {/* Right Panel */}
            
            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} /> }
        </Stack>
    )
}

export default Group