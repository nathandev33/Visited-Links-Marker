import React, { useState, useEffect, useRef } from 'react'
import { TextareaAutosize, Button, Grid } from '@mui/material'
import './TextArea.css'
import { setStoredOptions, getStoredOptions } from '../../../utils/storage'
import './TextArea.css'

interface AppProps {
  sitesState?: string[]
  setSitesState?: any
  storageKey: string
  placeholder: string[]
}

const TextArea: React.FC<AppProps> = ({
  sitesState,
  setSitesState,
  storageKey,
  placeholder,
}) => {
  const textAreaContent = useRef(null)
  const tlacitko = useRef(null)
  const [test, setTest] = useState('nic')
  const updateSitesState = () => {
    setSitesState(textAreaContent.current.value.split('\n'))
  }

  let newExceptSites
  const saveSites = () => {
    tlacitko.current.style.backgroundColor = 'red'
    newExceptSites = textAreaContent.current.value.split('\n')
    setTest(newExceptSites)
    setStoredOptions({
      [storageKey]: newExceptSites,
    })
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TextareaAutosize
            maxRows={12}
            minRows={8}
            aria-label="maximum height"
            placeholder={!placeholder ? 'loading...' : placeholder.join('\n')}
            value={!sitesState ? 'loading...' : sitesState.join('\n')}
            ref={textAreaContent}
            style={{
              width: 300,
              backgroundColor: '#fcfcfb',
              borderRadius: '3px',
              padding: '8px',
              fontFamily: "'Trebuchet MS', sans-serif",
              marginLeft: '29px',
            }}
            onChange={updateSitesState}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" ref={tlacitko} onClick={saveSites}>
            save
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default TextArea
