import React from 'react'
import { Box, Stack, Avatar, Typography,IconButton } from "@mui/material"
import { faker } from '@faker-js/faker'
import StyledBadge from './StyledBadge'
import {ArrowDownLeft,ArrowUpRight,Phone,VideoCamera} from "phosphor-react"


const CallLogElement = ({ online, img,name,incoming,missed }) => {
  return (
    <Box p={2} sx={{
      width: "100%",
      borderRadius: 1,
      backgroundColor: (theme) => theme.palette.mode === "light" ? "#fff" : theme.palette.background.default
    }} >
      <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} spacing={2} >

        {online ?
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={img} />
          </StyledBadge>
          : <Avatar src={img} />}
        <Stack spacing={0.3}>
          <Typography variant='subtitle2'>
            {name}
          </Typography>
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
           {incoming ? <ArrowDownLeft color={missed ? "red" : "green"}/> : <ArrowUpRight color={missed ? "red" : "green"}/>}
          <Typography variant='caption'>
            Yesterday 21:24
          </Typography>
          </Stack>
        </Stack>
        </Stack>
        <IconButton>
        <Phone size={20} color='green'/>
        </IconButton>
      </Stack>

    </Box>
  )
}

const CallElement = ({online,img,name}) => {
  return (
    <Box p={2} sx={{
      width: "100%",
      borderRadius: 1,
      boxShadow:"0 0 2px rgba(0,0,0,0.25)",
      backgroundColor: (theme) => theme.palette.mode === "light" ? "#fff" : theme.palette.background.default
    }} >
      <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} spacing={2} >

        {online ?
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={img} />
          </StyledBadge>
          : <Avatar src={img} />}
        <Stack spacing={0.3}>
          <Typography variant='subtitle2'>
            {name}
          </Typography>
        </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
        <IconButton>
        <Phone size={20} color='green'/>
        </IconButton>
        <IconButton>
        <VideoCamera size={20} color='green'/>
        </IconButton>
        </Stack>
      </Stack>

    </Box>
  )
}

export { CallLogElement, CallElement }