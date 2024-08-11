import React from 'react'
import { Box, Stack, Grid, Typography, IconButton, Tab, Tabs } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { UpdateSidebarType } from '../redux/slices/app'
import { CaretLeft } from "phosphor-react"
import { faker } from '@faker-js/faker'
import { SHARED_DOCS, SHARED_LINKS } from '../data'
import { DocMsg, LinkMsg } from './Conversation/MsgTypes'
import Message from './Conversation/Message'

const StaredMessages = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{ boxShadow: "0 0 2px rgba(0,0,0,0.25)", width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>
                    <Stack direction={"row"} sx={{ height: "100%", p: 2 }} alignItems={"center"} spacing={3}>
                        <IconButton onClick={() => {
                            dispatch(UpdateSidebarType("CONTACT"))
                        }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>Starred Messages</Typography>
                    </Stack>
                </Box>
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "auto"}} p={3} spacing={3}>
                    <Message menu={false}/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default StaredMessages