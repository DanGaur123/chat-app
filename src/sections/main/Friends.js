import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

const Friends = ({open, handleClose}) => {
  const [value,setValue]  = useState(0);
  const handleChange = (event,newValue) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} sx={{ p: 4 }} keepMounted>
      <Stack sx={{width:"100%"}} p={2}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Explore"/>
            <Tab label="Friends"/>
            <Tab label="Friend Request"/>
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{height:"100%"}} spacing={2.5}>
        {(() => {
            switch(value) {
                 case 0 :
                    break
                 case 1 :
                    break
                 case 2 :
                    break
            }
        })()}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default Friends