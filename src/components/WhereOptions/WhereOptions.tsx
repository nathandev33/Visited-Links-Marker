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
import Button from './Button'
import { getStoredOptions, setStoredOptions } from '../../utils/storage'

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
    <FormControl>
      <div>Running condition: {whereOption}</div>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="all"
          control={<Radio />}
          label="Run the extension on all websites."
          onChange={handleChange}
          checked={whereOption === 'all'}
        />
        <FormControlLabel
          value="except"
          control={<Radio />}
          label="Run the extension on all pages except:"
          onChange={handleChange}
          checked={whereOption === 'except'}
        />
        {whereOption === 'except' ? (
          <TextArea
            exceptSites={exceptSites}
            setExceptSites={setExceptSites}
          ></TextArea>
        ) : null}
        {/* <Button textAreaContent={''}></Button> */}
        <FormControlLabel
          value="only"
          control={<Radio />}
          label="Run the extension only on these websites:"
          onChange={handleChange}
          checked={whereOption === 'only'}
        />
        {whereOption === 'only' ? (
          <TextArea
            onlySites={onlySites}
            setOnlySites={setOnlySites}
          ></TextArea>
        ) : null}
        <FormControlLabel
          value="none"
          control={<Radio />}
          label="Pause extension from running."
          onChange={handleChange}
          checked={whereOption === 'none'}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default WhereOptions
