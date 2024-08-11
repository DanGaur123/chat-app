import React, { useState } from 'react'
import * as Yup from 'yup'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Eye, EyeSlash } from "phosphor-react"
import { Stack, Alert, InputAdornment, IconButton, Link, Button } from "@mui/material"
import { RHFTextfield } from '../../components/hook-form'
import { useDispatch } from 'react-redux'
import { NewPassword } from '../../redux/slices/auth'

const NewPasswordForm = () => {
    const {queryParameters} = useSearchParams()
    const dispactch = useDispatch()
    const [showpassword, setShowPassword] = useState(false)
    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string().min("Password must be atleast of 6 characters").required("Password is required"),
        passwordConfirm: Yup.string().required("Password is required").oneOf([Yup.ref('newPassword'), null], "Password must match"),

    })

    const defaultValues = {
        password: "",
        passwordConfirm:""
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
           dispactch(NewPassword({...data,token:queryParameters.get("token")}))
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
            <Stack spacing={4}>
                {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
                <RHFTextfield name="password" label="Password" type={showpassword ? "text" : "password"} InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={() => setShowPassword(!showpassword)}>
                                {showpassword ? <Eye /> : <EyeSlash />}
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
                <RHFTextfield name="passwordConfirm" label="Confirm Password" type={showpassword ? "text" : "password"} InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={() => setShowPassword(!showpassword)}>
                                {showpassword ? <Eye /> : <EyeSlash />}
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
            <Button fullWidth color='inherit' type='submit' size='large' variant='contained' sx={{
                bgcolor: "text.primary", color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800", "&:hover": {
                    bgcolor: "text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                }
            }}>
                Submit
            </Button>
            </Stack>
        </FormProvider>
    )
}

export default NewPasswordForm