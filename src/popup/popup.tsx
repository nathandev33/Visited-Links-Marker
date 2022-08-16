import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import ColorPicker from '../components/colorPicker'
import WhereOptions from '../components/WhereOptions'
import { getStoredOptions } from '../utils/storage'
const App: React.FC<{}> = () => {
  const [whereOption, setWhereOption] = useState<string>()
  const [linkColor, setLinkColor] = useState<string>()
  useEffect(() => {
    getStoredOptions().then((data) => {
      setWhereOption(data.where_options)
      setLinkColor(data.link_color)
    })
  }, [])

  // const [whereOption, setWhereOption] = useState(async () => {
  //   var promise = new Promise((resolve) => {
  //     getStoredOptions().then((data) => {
  //       resolve(data.where_options)
  //     })
  //   })

  //   return await promise
  // })
  // const [linkColor, setLinkColor] = useState<string>()

  // const [linkColor, setLinkColor] = useState<string>(async () => {
  //   var promise = new Promise<any>((resolve) => {
  //     chrome.storage.sync.get('link_color', (result) => {
  //       resolve(result.link_color)
  //     })
  //   })

  //   const awaitedPromise =  await promise
  //   return awaitedPromise
  // })
  // const [linkColor, setLinkColor] = useState('only')
  // useEffect(() => {
  //   getStoredOptions().then((data) => {
  //     console.log(data.link_color)
  //     console.log(data.where_options)
  //     // setWhereOption(data.where_options)
  //     setLinkColor(data.link_color)
  //   })
  // }, [])
  // Effect 1: Attech/remove storage onChanged listener
  // useEffect(() => {
  //   const listener = () => {
  //     chrome.storage.sync.get(["storageData"], (result) => {
  //       setStorageData(result.storageData);
  //     })
  //   };
  //   chrome.storage.onChanged.addListener(listener);
  //   return () => {
  //     chrome.storage.onChanged.removeListener(listener);
  //   };
  // }, []);

  // Effect 2: Sync local state with storage data on mount
  // useEffect(() => {
  //   // 'sync' can be 'local', depends on your usecase
  //   chrome.storage.sync.get(['where_options'], (result) => {
  //     console.log('whereoptoins z storage', result.where_options)
  //     const where_options = result.where_optios
  //     setStorageData(where_options)
  //     console.log('storageData: ', storageData)
  //   })
  // }, [storageData])

  // const [initialWhereOptions, setInitialWhereOptions] = useState()
  // const [updated, setUpdated] = useState(true)

  // useEffect(() => {
  //   chrome.storage.sync.get(['link_color', 'where_options'], (result) => {
  //     setInitialWhereOptions(result.where_options)
  //     console.log(result.where_options)
  //     console.log('inicital whereh options:', initialWhereOptions)
  //     setUpdated(!updated)
  //   })
  // }, [initialWhereOptions])

  function setColor(color: string) {
    chrome.storage.sync.get(['link_color'], (result) => {
      // document.documentElement.style.setProperty(
      //   '--picked-color',
      //   result.link_color
      // )
      // console.log(result.link_color)
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
      <ColorPicker
        // link_color={'rgba(193,22,22,0.5)'}
        linkColor={linkColor}
        setLinkColor={setLinkColor}
        changeColor={changeColor}
      ></ColorPicker>
      <WhereOptions
        whereOption={whereOption}
        setWhereOption={setWhereOption}
      ></WhereOptions>
      {/* <WhereOptions></WhereOptions> */}
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
