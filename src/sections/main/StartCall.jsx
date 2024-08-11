import React from 'react'
import { Dialog, DialogContent, Slide, DialogTitle,Stack } from "@mui/material"
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass } from "phosphor-react"
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StartCall = ({ open, handleClose }) => {
    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            sx={{ p: 4 }}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Stack width={"100%"}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709CE6' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                            />
                        </Search>
                    </Stack>
                    {MembersList.map((el) => <CallElement {...el} />)}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default StartCall