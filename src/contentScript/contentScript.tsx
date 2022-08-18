import * as React from 'react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import './contentScript.css'
import { setStoredOptions, getStoredOptions } from '../utils/storage'

// import getLinks from './getLinks'

const App: React.FC<{}> = () => {
  console.log('HELLO FROM CONTENTSCRIPT')
  getStoredOptions().then((data) => {
    if (data.where_options === 'except') {
      const excludedWebsites: Array<string> = [...data.except_sites]

      const myURLx = document.URL

      var matches = excludedWebsites.filter(function (website) {
        return new RegExp(website).test(myURLx)
      })
      if (matches.length > 0) {
        document.documentElement.style.setProperty(
          '--picked-color',
          // 'rgba(255,0,0,0.5)'
          'revert'
        )
      } else {
        document.documentElement.style.setProperty(
          '--picked-color',
          data.link_color
        )
      }

      // for (const website of excludedWebsites) {
      // excludedWebsites.every((website) => {
      //   const myURL = document.URL
      //   const regex = new RegExp(`${website}*`, 'gi')
      //   // const regex2 = new RegExp(
      //   //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      //   //   'gi'
      //   // )

      //   if (regex.test(myURL)) {
      //     // if (website === myURL) {
      //     // if (true) {
      //     console.log(document.URL)
      //     console.log('JSEM NA EXCLUDED WEBSITES')
      //     document.documentElement.style.setProperty(
      //       '--picked-color',
      //       'rgba(255,0,0,0.5)'
      //     )
      //     return false

      //     // chrome.storage.sync.set({ link_color: 'red' })
      //     // if (colorChanged !== 'red') {
      //     //   setColorChanged('red')
      //     // }
      //   }
      //    else {
      //     console.log('JSEM NA POVOLENÉ WEBSITES')

      //     console.log('povolená website', document.URL)
      //     chrome.storage.sync.get(['link_color'], (result) => {
      //       console.log(result.link_color)
      //       document.documentElement.style.setProperty(
      //         '--picked-color',
      //         result.link_color
      //       )
      //     })
      //     return true
      //   }
      // })
    }
    if (data.where_options === 'only') {
      const onlyWebsites: Array<string> = [...data.only_sites]

      const myURLx = document.URL

      var matches = onlyWebsites.filter(function (website) {
        return new RegExp(website).test(myURLx)
      })
      if (matches.length < 1) {
        document.documentElement.style.setProperty(
          '--picked-color',
          'revert'
          // 'rgba(161,0,175,1)' // růžo
        )
      } else {
        document.documentElement.style.setProperty(
          '--picked-color',
          data.link_color
          // 'rgba(41,140,0,1)' //zele
        )
      }
    }
    if (data.where_options === 'all') {
      document.documentElement.style.setProperty(
        '--picked-color',
        data.link_color
      )
    }

    // if (data.where_options === 'pause') {
    //   return false
    // }
  })

  // chrome.runtime.sendMessage(null, 'ahoj', null, (response) => {
  //   console.log(response)
  // })
  // if (true) {
  //   document.documentElement.style.setProperty(
  //     '--picked-color',
  //     'rgba(233,0,253,0.5)'
  //   )
  // }
  const [colorChanged, setColorChanged] = useState('blue')

  // chrome.storage.sync.get(['link_color'], (result) => {
  //   document.documentElement.style.setProperty(
  //     '--picked-color',
  //     result.link_color
  //   )
  // })

  // console.log('CONTENTT SCRIPT!!')

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request)
    if (request.colorChanged === true) {
      setStoredOptions({ link_color: request.color })
      setColorChanged(request.color)
    }
  })

  return <div className="overlayCard"></div>
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
