import React,{useState} from 'react'
import {useTheme} from "@mui/material/styles"
import {Stack,Box,Typography,IconButton,Divider,Link} from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import {MagnifyingGlass,Plus} from "phosphor-react"
import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../sections/main/StartCall'
const Call = () => {
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
                    <Typography variant='h5'>Call Logs</Typography>
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
                        <Typography variant='subtitle2' component={Link}>Start new Conversation</Typography>
                        <IconButton onClick={() => setOpenDialog(true)}>
                            <Plus style={{ color: theme.palette.primary.main }} size={20} />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
                      {
                        CallLogs.map((el) => (
                            <CallLogElement {...el} />
                        ))
                      }
                    </Stack>
                </Stack>
            </Box>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
        </Stack>
  )
}

export default Call