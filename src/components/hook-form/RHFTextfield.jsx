import PropTypes from "prop-types"
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from "@mui/material"

RHFTextfield.prototypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    helperText: PropTypes.node,
}

export default function RHFTextfield({ name, helperText, ...other }) {
    const { control } = useFormContext()
    return (
        <Controller 
        name={name} 
        control={control} 
        render={({ field, fieldState: { error } }) => (
            <TextField {...field} fullWidth error={!!error} helperText={error ? error.message : helperText} {...other} />
    )} />
    )
}
