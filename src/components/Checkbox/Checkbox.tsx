import React, { useState, useEffect } from 'react'

import { FormControlLabel, FormGroup, Checkbox } from '@mui/material'
interface AppProps {
  neco?: string
}

const Checkboxx: React.FC<AppProps> = ({}) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
  )
}

export default Checkboxx
