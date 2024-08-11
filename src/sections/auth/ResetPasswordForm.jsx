import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Stack, Alert,  Button } from "@mui/material"
import { RHFTextfield } from '../../components/hook-form'
import { useDispatch } from 'react-redux'
import { ForgotPassword } from '../../redux/slices/auth'

const ResetPasswordForm = () => {
const dispactch = useDispatch()
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    })

    const defaultValues = {
        email: "demo@chatify.com",
    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    }) 

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
           dispactch(ForgotPassword(data))
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
            <Button fullWidth color='inherit' type='submit' size='large' variant='contained' sx={{
                bgcolor: "text.primary", color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800", "&:hover": {
                    bgcolor: "text.primary",
                    color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                }
            }}>
                Send Request
            </Button>
            </Stack>
        </FormProvider>
    )
}

export default ResetPasswordForm