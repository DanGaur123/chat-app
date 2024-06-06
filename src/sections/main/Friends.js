import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/slices/app'
import { FriendComponent, FriendRequestComponent, UserComponent } from '../../components/Friends'

const UserList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  const {users} = useSelector((state) => state.app)
  return (
    <>
    {users.map((el,idx) => {
      return <UserComponent key={el._id} {...el} />
    })}
    </>
  )
}

const FriendList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  const {users} = useSelector((state) => state.app)
  return (
    <>
    {users.map((el,idx) => {
      return <FriendComponent key={el._id} {...el} />
    })}
    </>
  )
}

const FreindRequestList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  const {users} = useSelector((state) => state.app)
  return (
    <>
    {users.map((el,idx) => {
      return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
    })}
    </>
  )
}

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
                    return <UserList/>
                 case 1 :
                    return <FriendList/>
                 case 2 :
                    return <FreindRequestList/>
                 default: 
                    console.log(value)
                    break   
            }
        })()}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default Friends