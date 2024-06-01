import React from 'react'
import { Dialog, Slide, DialogTitle, Typography, Button, DialogActions, DialogContent, Grid, Stack, Box } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Shortcuts_List = [
    {
        key: 0,
        title: "Mark as unread",
        combinations: ["Cmd", "Shift", "U"],
    },
    {
        key: 1,
        title: "Archive Chat",
        combinations: ["Cmd", "Shift", "E"],
    },
    {
        key: 2,
        title: "Pin Chat",
        combinations: ["Cmd", "Shift", "P"],
    },
    {
        key: 3,
        title: "Search Chat",
        combinations: ["Cmd", "Shift", "F"],
    },
    {
        key: 4,
        title: "New Chat",
        combinations: ["Ctrl", "Tab"],
    },
    {
        key: 5,
        title: "New Group",
        combinations: ["Cmd", "Shift", "N"],
    },
    {
        key: 6,
        title: "Icrease speed of voice message",
        combinations: ["Shift", "."],
    },
    {
        key: 7,
        title: "Settings",
        combinations: ["Shift", ","],
    },
    {
        key: 8,
        title: "Mute",
        combinations: ["Cmd", "Shift", "M"],
    },
    {
        key: 9,
        title: "Delete Chat",
        combinations: ["Cmd", "Shift", "D"],
    },
    {
        key: 10,
        title: "Search",
        combinations: ["Cmd", "F"],
    },
    {
        key: 11,
        title: "Next Chat",
        combinations: ["Cmd", "N"],
    },
    {
        key: 12,
        title: "Previous Chat",
        combinations: ["Cmd", "Shift", "Tab"],
    },
    {
        key: 13,
        title: "Profile & About",
        combinations: ["Cmd", "P"],
    },
    {
        key: 14,
        title: "Decrease speed of voice message",
        combinations: ["Shift", "*"],
    },
    {
        key: 15,
        title: "Emoji Panel",
        combinations: ["Cmd", "E"],
    },
    {
        key: 16,
        title: "Sticker Panel",
        combinations: ["Cmd", "S"],
    },
    {
        key: 17,
        title: "Change Theme",
        combinations: ["Cmd", "Shift", "D"],
    },
]
const Shortcuts = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} sx={{ p: 4 }} keepMounted TransitionComponent={Transition}>
            <DialogTitle>
                KeyBoard Shortcuts
            </DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {Shortcuts_List.map(({ key, title, combinations }) =>
                        <Grid container item xs={6} key={key}>
                            <Stack sx={{ width: "100%" }} justifyContent={"space-between"} spacing={3} alignItems={"center"} direction={"row"} >
                                <Typography variant='caption' sx={{ fontSize: 14 }}>{title}</Typography>
                                <Stack direction={"row"} spacing={2}>
                                    {combinations.map((el) => {
                                        return <Button disabled variant='contained'>
                                            {el}
                                        </Button>
                                    })}
                                </Stack>
                            </Stack>
                        </Grid>)}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose} >Apply</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Shortcuts