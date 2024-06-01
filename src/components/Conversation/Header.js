import React from 'react'
import { Stack, TextField, Box, Avatar, Badge, Typography, IconButton, Divider, InputAdornment } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { faker } from '@faker-js/faker'
import { VideoCamera, PaperPlaneTilt, Smiley, Phone, MagnifyingGlass, CaretDown, LinkSimple } from 'phosphor-react'
import StyledBadge from '../StyledBadge'
import { ToggleSidebar } from '../../redux/slices/app'
import { useDispatch } from "react-redux"

const Header = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
  return (
    <Box p={2} sx={{
        width: "100%",
        backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
        boxShadow: "0 0 2px rgba(0,0,0,0.25)",
    }}>
        <Stack alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }} direction={"row"}>
            <Stack onClick={() => {
                dispatch(ToggleSidebar())
            }} direction={"row"} spacing={2}>
                <Box>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
                    </StyledBadge>
                </Box>
                <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>
                        {faker.name.fullName()}
                    </Typography>
                    <Typography variant='caption'>online</Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <IconButton>
                    <VideoCamera />
                </IconButton>
                <IconButton>
                    <Phone />
                </IconButton>
                <IconButton>
                    <MagnifyingGlass />
                </IconButton>
                <Divider orientation='vertical' flexItem />
                <IconButton>
                    <CaretDown />
                </IconButton>
            </Stack>
        </Stack>
    </Box>
  )
}

export default Header