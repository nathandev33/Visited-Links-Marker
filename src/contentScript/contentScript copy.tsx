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
    document.documentElement.style.setProperty('--picked-color', 'yellow')
  }

  // chrome.runtime.sendMessage(null, 'ahoj', null, (response) => {
  //   console.log(response)
  // })

  // const [colorChanged, setColorChanged] = useState('blue')

  // chrome.storage.sync.get(['link_color'], (result) => {
  //   document.documentElement.style.setProperty(
  //     '--picked-color',
  //     result.link_color
  //   )
  // })

  // console.log('CONTENTT SCRIPT!!')

  // chrome.runtime.onMessage.addListener(function (
  //   request,
  //   sender,
  //   sendResponse
  // ) {
  //   console.log(request)
  //   if (request.colorChanged === true) {
  //     chrome.storage.sync.set({ link_color: request.color })
  //     setColorChanged('changedColor')
  //   }

  //   // if (request.googlePage === true) {
  //   //   console.log('dostal jsem google page mess')
  //   //   sendResponse('hokusák')
  //   // }
  // })

  // chrome.runtime.onMessage.addListener(function (
  //   request,
  //   sender,
  //   sendResponse
  // ) {
  //   console.log(
  //     sender.tab
  //       ? 'from a content script:' + sender.tab.url
  //       : 'from the extension'
  //   )
  //   if (request.pokus === 'hokus') sendResponse({ pokusRes: 'hokusak' })
  // })

  // EXCLUDE WEBSITES:
  // let rules: {
  //   [url: string]: () => void
  // } = {
  //   'https://www.neelnanda.io/blog/49-mentoring': filterNYTTechnology2,
  // }

  // // BLOCING USING STYLING
  // function filterNYTTechnology2() {
  //   console.log('jsem na neelnanda')
  //   document.documentElement.style.setProperty('--picked-color', 'initial')
  // }

  //   rules[document.URL]()
  // }

  return <div className="overlayCard"></div>
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
