import { Avatar, Box, Button, IconButton, Stack, styled, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import StyledBagde from "./StyledBadge"
import {socket} from '../socket'
import { Chat } from 'phosphor-react'
import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar } from '../redux/slices/app'


const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer"
    }
}))

const UserComponent = ({ firstName, lastName, _id, status, avatar }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const {user_id} = useSelector(state => state.auth)
    const [send,setSend] = useState(false)
    const name = `${firstName} ${lastName}`
    return (
        <StyledChatBox sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.background.paper }} p={2}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {" "}
                {status ? (
                    <StyledBagde
                    overlap='circular'
                    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                    variant='dot'>
                    <Avatar src={avatar} alt={name} />
                    </StyledBagde>
                ) : (
                    <Avatar src={avatar} alt={name} />
                )}
                <Stack spacing={0.3}>
                    <Typography variant='subtitle2'>{name}</Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {
                !send ?
               <Button onClick={() => {
                socket.emit("friend_request",{to:_id,from:user_id})
                setSend(true)
               }}>
                Send Request
               </Button>
                :
               <Button variant="outlined" onClick={() => {
                setSend(false)
               }}>
                Cancel
               </Button>
                }
            </Stack>
        </Stack>
        </StyledChatBox>
    )
}

const FriendComponent = ({ firstName, lastName, _id, online, img, handleClose }) => {
    const theme = useTheme()
    const {user_id} = useSelector(state => state.auth)
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
               <IconButton onClick={() => {
                socket.emit("start_conversation",{to:_id,from:user_id})
                handleClose()
               }}>
                <Chat />
               </IconButton>
            </Stack>
        </Stack>
        </StyledChatBox>
    )
}

const FriendRequestComponent = ({ firstName, lastName, online, img, id }) => {
    const theme = useTheme()
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
                socket.emit("accept_request",{request_id:id},() => {
                    alert("Request Accepted")
                })
               }}>
                Accept
               </Button>
               <Button onClick={() => {
                socket.emit("reject_request",{request_id:id},() => {
                    alert("Request Rejected")
                })
               }}>
                Reject
               </Button>
            </Stack>
        </Stack>
        </StyledChatBox>
    )
}



export { UserComponent,FriendComponent,FriendRequestComponent }