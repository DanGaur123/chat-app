import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormProvider from '../../components/hook-form/FormProvider'
import {Stack,Alert,InputAdornment,IconButton,Button} from "@mui/material"
import { RHFTextfield } from '../../components/hook-form'
import {Eye,EyeSlash} from "phosphor-react"
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../../redux/slices/auth'

const RegisterForm = () => {
    const [showpassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("Frist Name is required"),        
        lastName: Yup.string().required("last Name is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required")
    })

    const defaultValues = {
        firstName:"",
        lastName:"",
        email: "demo@chatify.com",
        password: "demo1234"
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
           dispatch(RegisterUser(data))
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
     {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
    <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
     <RHFTextfield name={"firstName"} label="First Name"/>     
     <RHFTextfield name={"lastName"} label="Last Name"/>
    </Stack>
    <RHFTextfield name={"email"} label="Enter Email"/>
    <RHFTextfield name={"password"} label="Enter Password" type={showpassword ? "text" : "password"} InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton onClick={() => setShowPassword(!showpassword)}>
                                {showpassword ? <Eye /> : <EyeSlash />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}/>
    <Button fullWidth color='inherit' type='submit' size='large' variant='contained' sx={{
                bgcolor: "text.primary", color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800", "&:hover": {
                    bgcolor:"text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                }
            }}>
               Create Account
            </Button>
     </Stack>
    </FormProvider>
  )
}

export default RegisterForm