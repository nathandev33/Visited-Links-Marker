import React, { useState, useEffect, useRef } from 'react'
import { TextareaAutosize } from '@mui/material'
import './TextArea.css'
import Button from '../Button'
import { setStoredOptions, getStoredOptions } from '../../../utils/storage'
import './TextArea.css'

interface AppProps {
  exceptSites?: string[]
  setExceptSites?: any
  onlySites?: string[]
  setOnlySites?: any
}

// chci ted udělat, že při kliknutí na save se napsaná nová města uloží do chrome.storage.
// nemůžu change props.

const TextArea: React.FC<AppProps> = ({
  exceptSites,
  setExceptSites,
  onlySites,
  setOnlySites,
}) => {
  const textAreaContent = useRef(null)
  const tlacitko = useRef(null)
  const updateSitesState = () => {
    setExceptSites([textAreaContent.current.value])
  }

  // const [newSites, setNewSites] = useState<boolean>(true)
  const saveSites = () => {
    tlacitko.current.style.backgroundColor = 'red'
    const newExceptSites = textAreaContent.current.value.split('\r\n')
    setStoredOptions({
      except_sites: newExceptSites,
    })

    // setNewSites(!newSites)
  }
  return (
    <div>
      {/* <div>{exceptSites}</div> */}
      {/* <div>{newSites}</div> */}

      <div>{Array.isArray(exceptSites) ? 'je array' : 'is not array'}</div>
      <TextareaAutosize
        className={'TextArea'}
        maxRows={12}
        minRows={8}
        aria-label="maximum height"
        placeholder="https://www.facebook.com/
      https://mail.google.com/
      https://*.google.com/"
        value={!exceptSites ? 'loading...' : exceptSites.join('\r\n')}
        ref={textAreaContent}
        style={{ width: 300 }}
        onChange={updateSitesState}
      />
      {/* <Button ref={tlacitko} onClickEvent={saveSites} /> */}
      <button className="button-18" ref={tlacitko} onClick={saveSites}>
        save
      </button>
    </div>
  )
}

export default TextArea
