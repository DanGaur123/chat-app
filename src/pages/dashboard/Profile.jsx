import React from 'react'
import { Stack, Box, IconButton, Typography } from "@mui/material"
import { CaretLeft } from "phosphor-react"
import ProfileForm from '../../sections/settings/ProfileForm'
const Profile = () => {
    return (
        <Stack direction={"row"} sx={{ width: "100%" }}>
            <Box sx={{ height: "100vh", width: 320, backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0 0 2px rgba(0,0,0,0.25)" }}>
                <Stack p={4} spacing={5}>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton>
                            <CaretLeft color='#4b4b4b' size={24} />
                        </IconButton>
                        <Typography variant='h5'>Profile</Typography>
                    </Stack>
                    {/* Profile form */}
                    <ProfileForm/>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Profile