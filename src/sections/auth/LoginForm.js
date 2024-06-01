import React, { useState } from 'react'
import * as Yup from 'yup'
import {Link as RouterLink} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Eye, EyeSlash } from "phosphor-react"
import { Stack, Alert, InputAdornment, IconButton, Link, Button } from "@mui/material"
import { RHFTextfield } from '../../components/hook-form'
import {useDispatch} from "react-redux"
import { LoginUser } from '../../redux/slices/auth'

const LoginForm = () => {
    const dispactch = useDispatch()
    const [showpassword, setShowPassword] = useState(false)
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required")
    })

    const defaultValues = {
        email: "danish@gmail.com",
        password: "123456"
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
           dispactch(LoginUser(data))
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

                <RHFTextfield name="email" label="Email Address" />
                <RHFTextfield name="password" label="Password" type={showpassword ? "text" : "password"} InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={() => setShowPassword(!showpassword)}>
                                {showpassword ? <Eye /> : <EyeSlash />}
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
            </Stack>
            <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
                <Link sx={{ cursor: "pointer" }} variant="body2" underline='always' color={"inherit"} to="/auth/reset-password" component={RouterLink}>Forgot Password?</Link>
            </Stack>
            <Button fullWidth color='inherit' type='submit' size='large' variant='contained' sx={{
                bgcolor: "text.primary", color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800", "&:hover": {
                    bgcolor:"text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                }
            }}>
                Login
            </Button>
        </FormProvider>
    )
}

export default LoginForm