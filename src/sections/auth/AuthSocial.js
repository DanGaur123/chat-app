import React from 'react'
import {Box,Divider,Stack,IconButton} from "@mui/material"
import {GoogleLogo,GithubLogo,TwitterLogo} from 'phosphor-react'
const AuthSocial = () => {
  return (
    <Box>
    <Divider sx={{my:2.5,typography:"overline",color:"text.disabled","&::before,::after":{
        borderTopStyle:"dashed",
    }}}>
        OR
    </Divider>
    <Stack direction={'row'} alignItems={"center"} justifyContent={"center"} spacing={2}>
       <IconButton>
          <GoogleLogo color='#df3e30'/>
       </IconButton>
       <IconButton color='inherit'>
          <GithubLogo/>
       </IconButton>
       <IconButton>
          <TwitterLogo color='#1c9cea'/>
       </IconButton>
    </Stack>
    </Box>
  )
}

export default AuthSocial