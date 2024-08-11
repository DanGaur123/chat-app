import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Eye, EyeSlash } from "phosphor-react"
import { Stack, Alert, InputAdornment, IconButton, Link, Button } from "@mui/material"
import { RHFTextfield } from '../../components/hook-form'

const ProfileForm = () => {

    const ProfileSchema = Yup.object().shape({

        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is Required"),
        avatarUrl: Yup.string().required("Avatar is Required").nullable(true)
    })

    const defaultValues = {
        name: "",
        about: ""
    }

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    })

    const { reset, watch, control, setValue, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const values = watch()
    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file)
        })
        if (file) {
            setValue("avatarUrl", newFile, { shouldValidate: true })
        }
    }, [setValue])

    const onSubmit = async (data) => {
        try {
            // api call
            console.log(data)
        }
        catch (e) {
            console.log(e)
            reset()
            setError("afterSubmit", {
                ...e,
                message: e.message
            })
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Stack spacing={4}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

                    <RHFTextfield name="name" label="Name" helperText={"This name is visible to your contacts"} />
                    <RHFTextfield name="about" label="About" multiline rows={4} maxRows={5} />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} >
                    <Button color='primary' size='large' type='submit' variant='outlined'>Save</Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default ProfileForm