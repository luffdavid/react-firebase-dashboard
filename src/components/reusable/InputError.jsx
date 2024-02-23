import { Alert } from '@mui/material'
import React from 'react'

const InputError = ({title }) => {
  return (
    <div>
        <Alert severity="error">
            Error: {title}
        </Alert>
    </div>
  )
}

export default InputError