import React from 'react'
import * as Yup from 'yup'
import { Dialog, DialogContent, Slide, DialogTitle, Button, Stack } from "@mui/material"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextfield } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MEMBERS = ["Lion", "Elephant", "Tiger", "Deer"]

const CreateGroupForm = ({ handleClose }) => {
    const CreateGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, "Must have atleast two members"),
    })

    const defaultValues = {
        title: "",
        members: []
    }
    const methods = useForm({
        resolver: yupResolver(CreateGroupSchema),
        defaultValues
    })

    const { reset, watch, setValue, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
            console.log(data)
        }
        catch (e) {
            console.log("error:", e)
        }
    }
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextfield name={"title"} label="Group Name" />
                <RHFAutocomplete
                    name="members"
                    label={"Members"}
                    multiple
                    freeSolo
                    option={MEMBERS.map((option) => option)}
                    ChipProps={{ size: "medium" }} />
                <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                    <Button type='submit' onClick={handleClose}>Cancle</Button>
                    <Button type='submit' variant='contained'>Create</Button>

                </Stack>
            </Stack>
        </FormProvider>
    )

}

const CreateGroup = ({ open, handleClose }) => {
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
            <DialogTitle sx={{mb:3}}>Create New Group</DialogTitle>
            <DialogContent>
                <CreateGroupForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroup