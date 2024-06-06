import React from "react";
import Chats from "./Chats";
import { Stack, Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StaredMessages from "../../components/StarredMessages";
import NoChatSVG from "../../assets/Illustration/NoChat";
const GeneralApp = () => {
  const theme = useTheme()
  const { sidebar,roomId,chatType } = useSelector((store) => store.app)
  console.log(sidebar)
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box sx={{ height: "100%", width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper }}>
        {roomId != null && chatType === "individual" ?
         <Conversation />
         : 
         <Stack spacing={2} sx={{height : "100%",width:"100%"}} alignItems={"center"} justifyContent={"center"}>
           <NoChatSVG />
           <Typography variant="subtitle2">
            Select a Conversation or start new one
           </Typography>
         </Stack>
        }
      </Box>
      {
        sidebar.open && 
        // <Contact/>
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />
            case "STARRED":
              return <StaredMessages/>
            case "SHARED":
              return <SharedMessages />
            default:
              break;
          }
        })()
        }
    </Stack>
  );
};

export default GeneralApp;
