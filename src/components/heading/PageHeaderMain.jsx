import { Typography } from '@mui/material'
import React from 'react'

const PageHeaderMain = ({pageName}) => {
  return (
    <div>
        <Typography variant="h4">
            <b>{pageName}</b>
        </Typography>
    </div>
  )
}

export default PageHeaderMain