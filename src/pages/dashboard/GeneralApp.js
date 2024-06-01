import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StaredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme()
  const { sidebar } = useSelector((store) => store.app)
  console.log(sidebar)
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box sx={{ height: "100%", width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper }}>
        <Conversation />
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
