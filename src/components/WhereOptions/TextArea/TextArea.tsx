import React, { useState, useEffect, useRef } from 'react'
import { TextareaAutosize, Button } from '@mui/material'
import './TextArea.css'
// import Button from '../Button'
import { setStoredOptions, getStoredOptions } from '../../../utils/storage'
import './TextArea.css'

interface AppProps {
  sitesState?: string[]
  setSitesState?: any
  storageKey: string
  placeholder: string[]
}

// chci ted udělat, že při kliknutí na save se napsaná nová města uloží do chrome.storage.
// nemůžu change props.

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
    // setSitesState([textAreaContent.current.value])
    setSitesState(textAreaContent.current.value.split('\n'))
  }

  // const [newSites, setNewSites] = useState<boolean>(true)
  let newExceptSites
  const saveSites = () => {
    tlacitko.current.style.backgroundColor = 'red'
    newExceptSites = textAreaContent.current.value.split('\n')
    setTest(newExceptSites)
    setStoredOptions({
      // [storageKey]: newExceptSites,
      [storageKey]: newExceptSites,
    })

    // setNewSites(!newSites)
  }
  return (
    <div>
      {/* <div>{!newExceptSites ? "loading" : newExceptSites}</div> */}
      <div>{test}</div>

      <TextareaAutosize
        className={'TextArea'}
        maxRows={12}
        minRows={8}
        aria-label="maximum height"
        placeholder={!placeholder ? 'loading...' : placeholder.join('\n')}
        value={!sitesState ? 'loading...' : sitesState.join('\n')}
        ref={textAreaContent}
        style={{ width: 300 }}
        onChange={updateSitesState}
      />
      {/* <Button ref={tlacitko} onClickEvent={saveSites} /> */}
      <button className="button-18" ref={tlacitko} onClick={saveSites}>
        save
      </button>
      {/* <div ref={tlacitko} onClick={saveSites}>
        <Button>Save </Button>
      </div> */}
    </div>
  )
}

export default TextArea
