import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import TextArea from './TextArea'
import { getStoredOptions, setStoredOptions } from '../../utils/storage'
import { Typography } from '@mui/material/'
import SettingsIcon from '@mui/icons-material/Settings'
import MouseHoverSpan from './MouseHoverSpan'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

interface AppProps {
  whereOption: string
  setWhereOption: any
  setExceptSites: any
  exceptSites: string[]
  onlySites: string[]
  setOnlySites: any
}

const WhereOptions: React.FC<AppProps> = ({
  whereOption,
  setWhereOption,
  exceptSites,
  setExceptSites,
  onlySites,
  setOnlySites,
}) => {
  const handleChange = (event) => {
    setWhereOption(event.target.value)
    setStoredOptions({ where_options: event.target.value })
  }

  return (
    <FormControl sx={{ mt: '8px', ml: '15px' }}>
      {/* <Typography variant="h5" component="h2">
        Running conditions <SettingsIcon sx={{ verticalAlign: 'middle' }} />
      </Typography> */}
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="all"
          control={<Radio />}
          label="✅ Run on ALL websites."
          onChange={handleChange}
          checked={whereOption === 'all'}
        />
        <FormControlLabel
          value="except"
          control={<Radio />}
          label="❌ Run on all websites EXCEPT:"
          onChange={handleChange}
          checked={whereOption === 'except'}
        />
        {whereOption === 'except' ? (
          <TextArea
            sitesState={exceptSites}
            setSitesState={setExceptSites}
            storageKey={'except_sites'}
            placeholder={[
              'https://www.facebook.com/',
              'https://mail.google.com/',
              'https://*.google.com/',
            ]}
          ></TextArea>
        ) : null}
        {/* <Button textAreaContent={''}></Button> */}
        <FormControlLabel
          value="only"
          control={<Radio />}
          // label="📝 Run ONLY on these websites:"
          label={
            <span>
              📝 Run ONLY on these websites:{' '}
              <MouseHoverSpan text={' (?)'}></MouseHoverSpan>
            </span>
          }
          onChange={handleChange}
          checked={whereOption === 'only'}
        />
        {whereOption === 'only' ? (
          <TextArea
            sitesState={onlySites}
            setSitesState={setOnlySites}
            storageKey={'only_sites'}
            placeholder={['https://www.reddit.com/', 'https://www.youtube.com']}
          ></TextArea>
        ) : null}
        <FormControlLabel
          value="none"
          control={<Radio />}
          label="✋ PAUSE from running."
          onChange={handleChange}
          checked={whereOption === 'none'}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default WhereOptions
