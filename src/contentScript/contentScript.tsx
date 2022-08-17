import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

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
          'rgba(255,0,0,0.5)'
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

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
