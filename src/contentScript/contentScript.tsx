import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import './contentScript.css'
// import getLinks from './getLinks'

const App: React.FC<{}> = () => {
  const excludedWebsites: Array<string> = [
    'https://www.neelnanda.io/blog/49-mentoring',
    'https://www.google.com/',
    'https://natanael-adamec.cz/',
  ]
  if (excludedWebsites.includes(document.URL)) {
    console.log(document.URL)
    console.log('jsem na GOOGLU či 49 či nat.cz')
    document.documentElement.style.setProperty('--picked-color', 'revert')
    // chrome.storage.sync.set({ link_color: 'red' })
    // if (colorChanged !== 'red') {
    //   setColorChanged('red')
    // }
  } else {
    console.log('povolená website', document.URL)
    chrome.storage.sync.get(['link_color'], (result) => {
      console.log(result.link_color)
      document.documentElement.style.setProperty(
        '--picked-color',
        result.link_color
      )
    })
    // document.documentElement.style.setProperty('--picked-color', 'yellow')
  }

  // chrome.runtime.sendMessage(null, 'ahoj', null, (response) => {
  //   console.log(response)
  // })

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
      chrome.storage.sync.set({ link_color: request.color })
      setColorChanged('changedColor')
    }
  })

  return <div className="overlayCard"></div>
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
