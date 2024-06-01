import React from 'react'
import { Stack, Typography } from '@mui/material'
import VerifyForm from '../../sections/auth/VerifyForm'
const Verify = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Please Verify Your OTP</Typography>
        <Stack direction={"row"} spacing={0.5}>
            <Typography variant='body2'>
                Send to email (danishgaur@gmail.com)
            </Typography>
        </Stack>
            <VerifyForm/>
   </Stack>
  )
}

export default Verify