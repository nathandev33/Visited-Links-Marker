import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import ColorPicker from '../components/colorPicker'
import WhereOptions from '../components/WhereOptions'
import { getStoredOptions } from '../utils/storage'
import TextArea from '../components/WhereOptions/TextArea'
const App: React.FC<{}> = () => {
  const [whereOption, setWhereOption] = useState<string>()
  const [linkColor, setLinkColor] = useState<string>()
  const [exceptSites, setExceptSites] = useState<string[]>()
  const [onlySites, setOnlySites] = useState<string[]>()

  useEffect(() => {
    getStoredOptions().then((data) => {
      setWhereOption(data.where_options)
      setLinkColor(data.link_color)
      setExceptSites(data.except_sites)
      setOnlySites(data.only_sites)
    })
  }, [])

  function changeColor(color: string) {
    // send message to content-script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { colorChanged: true, color })
    })
  }

  return (
    <div>
      <ColorPicker
        // link_color={'rgba(193,22,22,0.5)'}
        linkColor={linkColor}
        changeColor={changeColor}
      ></ColorPicker>
      <WhereOptions
        whereOption={whereOption}
        setWhereOption={setWhereOption}
        exceptSites={exceptSites}
        setExceptSites={setExceptSites}
        onlySites={onlySites}
        setOnlySites={setOnlySites}
      ></WhereOptions>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
