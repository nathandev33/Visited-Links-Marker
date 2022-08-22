import * as React from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import './contentScript.css'
import { setStoredOptions, getStoredOptions } from '../utils/storage'

const App: React.FC<{}> = () => {
  getStoredOptions().then((data) => {
    if (data.where_options === 'except') {
      const excludedWebsites: Array<string> = [...data.except_sites]

      const myURLx = document.URL

      var matches = excludedWebsites.filter(function (website) {
        return new RegExp(website).test(myURLx)
      })
      if (matches.length > 0) {
        document.documentElement.style.setProperty('--picked-color', 'revert')
      } else {
        document.documentElement.style.setProperty(
          '--picked-color',
          data.link_color
        )
      }
    }
    if (data.where_options === 'only') {
      const onlyWebsites: Array<string> = [...data.only_sites]

      const myURLx = document.URL

      var matches = onlyWebsites.filter(function (website) {
        return new RegExp(website).test(myURLx)
      })
      if (matches.length < 1) {
        document.documentElement.style.setProperty('--picked-color', 'revert')
      } else {
        document.documentElement.style.setProperty(
          '--picked-color',
          data.link_color
        )
      }
    }
    if (data.where_options === 'all') {
      document.documentElement.style.setProperty(
        '--picked-color',
        data.link_color
      )
    }

    if (data.where_options === 'pause') {
      return false
    }
  })

  const [colorChanged, setColorChanged] = useState('blue')

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.colorChanged === true) {
      setStoredOptions({ link_color: request.color })
      setColorChanged(request.color)
    }
  })

  return <div></div>
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
