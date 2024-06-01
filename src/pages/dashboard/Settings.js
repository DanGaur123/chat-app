import React, { useState } from 'react'
import { Stack, Box, IconButton, Typography, Avatar, Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
    CaretLeft,
    Bell,
    Keyboard,
    PencilCircle,
    Info,
    Note,
    Image,
    Key,
    Lock
} from "phosphor-react"
import { faker } from '@faker-js/faker'
import Shortcuts from '../../sections/settings/Shortcuts'

const Settings = () => {
    const theme = useTheme()
    const [openShortcuts, setOpenShortcuts] = useState(false)
    const handleOpenShortcuts = () => {
        setOpenShortcuts(true)
    }
    const handleCloseShortcuts = () => {
        setOpenShortcuts(false)
    }
    const Settings_List = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { }
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { }
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { }
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            onclick: () => { }
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { }
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { }
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "KeyBoard Shortcuts",
            onclick: handleOpenShortcuts
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { }
        }
    ]
    return (
        <>
            <Stack direction={"row"} width={"100%"}>
                {/* Left panel */}
                <Box sx={{ overflowY: "scroll", height: "100vh", width: 320, backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background, boxShadow: "0 0 2px rgba(0,0,0,0.25)" }}>
                    <Stack p={4} spacing={5}>
                        <Stack direction={"row"} alignItems={"center"} spacing={3}>
                            <IconButton>
                                <CaretLeft size={24} color='#4b4b4b' />
                            </IconButton>
                            <Typography variant='h6'>Settings</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={3}>
                            <Avatar sx={{ width: 56, height: 56 }} src={faker.image.avatar()} alt={faker.name.fullName()} />
                            <Stack spacing={0.5}>
                                <Typography variant='article'>{faker.name.fullName()}</Typography>
                                <Typography variant='body2'>{faker.random.words()}</Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={4}>
                            {Settings_List.map(({ key, icon, title, onclick }) => (
                                <Stack onClick={onclick} sx={{ cursor: "pointer" }} spacing={2}>
                                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                        {icon}
                                        <Typography variant='body2'>{title}</Typography>
                                    </Stack>
                                    {key !== 7 && <Divider />}
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                {/* Right Panel */}
            </Stack>
            {openShortcuts && <Shortcuts open={true} handleClose={handleCloseShortcuts} /> }
        </>
    )
}

export default Settings