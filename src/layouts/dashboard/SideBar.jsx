import React, { useState } from 'react'
import { Box, Stack, IconButton, Divider, Avatar, Menu, MenuItem } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { faker } from "@faker-js/faker";
import Logo from "../../assets/Images/logo.ico"
import { Nav_Buttons, Profile_Menu } from "../../data"
import { Gear, SignOut, User, } from 'phosphor-react'
import useSettings from "../../hooks/useSettings"
import AntSwitch from '../../components/AntSwitch';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from '../../redux/slices/auth';
import { PURGE } from 'redux-persist';
import {socket} from '../../socket';
import { persistor } from '../../redux/store';

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app"
    case 1:
      return "/group"
    case 2:
      return "/call"
    case 3:
      return "/settings"
    default:
      break;
  }
}

const SideBar = () => {
  const theme = useTheme()
  const {user_id} = useSelector(state => state.auth)
  const [selected, setSelected] = useState(0)
  const { onToggleMode } = useSettings()
  const dispactch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate()
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    socket.emit("end",user_id)
    dispactch(Logout())
    persistor.purge()
    dispactch({type: "RESET"})
  }
  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0 0 2px rgba(0,0,0,0.25)", height: "100vh", width: 100 }}>
      <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ width: "100%", height: "100%" }} spacing={3} >
        <Stack alignItems="center" spacing={4}>
          <Box p={1} sx={{
            backgroundColor: theme.palette.primary.main,
            height: 64,
            width: 64,
            borderRadius: 1.5
          }}>
            <img src={Logo} alt="Chat App logo" />
          </Box>
          <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={2}>
            {Nav_Buttons.map((el) =>
              el.index === selected ?
                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>
                :
                <IconButton onClick={() => {
                  setSelected(el.index)
                  navigate(getPath(el.index))
                }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} key={el.index}>
                  {el.icon}
                </IconButton>
            )}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ?
              <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                <IconButton sx={{ color: "#fff", width: "max-content" }}>
                  <Gear />
                </IconButton>
              </Box>
              :
              <IconButton onClick={() => {
                setSelected(3)
                navigate(getPath(3))
              }} sx={{ color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary, width: "max-content" }}>
                <Gear />
              </IconButton>}
          </Stack>
        </Stack>
        <Stack spacing={4} alignItems="center">
          <AntSwitch onChange={() => {
            onToggleMode()
          }} defaultChecked />
          <Avatar id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} src={faker.image.avatar()} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el) => (
                <MenuItem onClick={(event) => {
                  handleClose(event)
                  el.title === "Logout" && handleLogout()
                }}>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={100} >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SideBar