import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import ColorPicker from '../components/colorPicker'
import WhereOptions from '../components/WhereOptions'
const App: React.FC<{}> = () => {
  const [initialWhereOptions, setInitialWhereOptions] = useState()
  const [updated, setUpdated] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get(['link_color', 'where_options'], (result) => {
      setInitialWhereOptions(result.where_options)
      console.log(result.where_options)
      console.log('inicital whereh options:', initialWhereOptions)
      setUpdated(!updated)
    })
  }, [initialWhereOptions])

  function setColor(color: string) {
    chrome.storage.sync.get(['link_color'], (result) => {
      // document.documentElement.style.setProperty(
      //   '--picked-color',
      //   result.link_color
      // )
      console.log(result.link_color)
      chrome.storage.sync.set({ link_color: color })
    })
  }

  function changeColor(color: string) {
    // send message to content-script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { colorChanged: true, color })
    })
  }

  return (
    <div>
      <ColorPicker changeColor={changeColor}></ColorPicker>
      <WhereOptions where_optionsValue={initialWhereOptions}></WhereOptions>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
