// TODO: background script
import { setStoredOptions } from '../utils/storage'
chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    where_options: 'all',
    link_color: 'rgba(199,139,0,0)',
    link_background: 'revert',
    except_sites: [
      'https://stackoverflow.com',
      'https://natanael-adamec.cz/',
      'https://www.neelnanda.io',
      'https://www.hovnooo.com',
    ],
    only_sites: ['https://www.reddit.com/', 'https://www.youtube.com'],
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log(message)
  // console.log(sender)
  // console.log(sendResponse)
  sendResponse('response z background')
})

// if (true) console.log('bla')
// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   if (tabs[0].url === 'https://www.neelnanda.io/blog/49-mentoring') {
//     console.log('neel nanda')
//   } else console.log('error')
// })

// if (window.location.toString() === 'https://www.neelnanda.io/blog/49-mentoring')
//   console.log('neeeel')

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log(changeInfo.url)
//   console.log(changeInfo.url === 'https://www.neelnanda.io/blog/49-mentoring')
//   if (true) {
//     // if (excludedWebsites.includes(changeInfo.url)) {
//     console.log('neel nanda')
//     // chrome.storage.sync.set({ link_color: 'initial' })

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { pokus: 'hokus' },
//         function (response) {
//           console.log(response.pokusRes)
//         }
//       )
//     })
//   } else console.log('neni neel')
// })

// dummy
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   // if (changeInfo.status === 'complete') {
//   console.log(changeInfo.url)
//   // do stuff here
//   if (changeInfo.url === 'https://www.google.com/') {
//     console.log("I'm on a Google page")
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { googlePage: true },
//         function (response) {
//           console.log(response)
//         }
//       )
//     })
//   } else console.log("I'm NOT on a Google page")
//   // }
// })
