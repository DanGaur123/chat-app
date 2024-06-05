import { Avatar, Box, Button, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import StyledBagde from "./StyledBadge"
import { socket } from '../socket'

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer"
    }
}))

const UserComponent = ({ firstName, lastName, _id, online, img }) => {
    const theme = useTheme()
    const user_id = window.localStorage.getItem("user_id")
    const name = `${firstName} ${lastName}`
    return (
        <StyledChatBox sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.background.paper }} p={2}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {" "}
                {online ? (
                    <StyledBagde
                    overlap='circular'
                    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                    variant='dot'>
                    <Avatar src={img} alt={name} />
                    </StyledBagde>
                ) : (
                    <Avatar src={img} alt={name} />
                )}
                <Stack spacing={0.3}>
                    <Typography variant='subtitle2'>{name}</Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
               <Button onClick={() => {
                socket.emit("friend_request",{to:_id,from:user_id},() => {
                    alert("Request Sent")
                })
               }}>
                Send Request
               </Button>
            </Stack>
        </Stack>
        </StyledChatBox>
    )
}

export { UserComponent }